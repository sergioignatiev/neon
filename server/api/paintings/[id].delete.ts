import { db } from '../../db'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    })
  }

  const result = await db.query(
    'SELECT image_url FROM paintings WHERE id = $1',
    [id]
  )

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Painting not found'
    })
  }

  const imageUrl = result.rows[0].image_url

  await db.query(
    'DELETE FROM paintings WHERE id = $1',
    [id]
  )

  if (imageUrl.startsWith('/paintings/')) {
    const filename = path.basename(imageUrl)

    const filePath = path.join(
      process.cwd(),
      'public',
      'paintings',
      filename
    )

    try {
      await unlink(filePath)
    } catch {
      console.log('Image file not found:', filePath)
    }
  }

  return {
    success: true
  }
})