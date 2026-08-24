import { db } from '../db'
import { optimizeImage } from '../utils/optimizeImage'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  const title = formData?.find(item => item.name === 'title')?.data.toString()
  const year = formData?.find(item => item.name === 'year')?.data.toString()
  const image = formData?.find(item => item.name === 'image')
  const description = formData?.find(item => item.name === 'description')?.data.toString()
  const author = formData?.find(item => item.name === 'author')?.data.toString()

  if (!image) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image is required'
    })
  }

  const optimizedImageUrl = await optimizeImage(image.data)

  await db.query(
    `INSERT INTO paintings
      (title, year, image_url, description, author)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      title,
      year ? Number(year) : null,
      optimizedImageUrl,
      description,
      author
    ]
  )

  return {
    success: true
  }
})