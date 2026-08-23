import { db } from '../db'
import { optimizeImage } from '../utils/optimizeImage'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const optimizedImageUrl = await optimizeImage(body.image_url)

  await db.query(
    `INSERT INTO paintings 
      (title, year, image_url, description, author)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      body.title,
      body.year,
      optimizedImageUrl,
      body.description,
      body.author
    ]
  )

  return { success: true }
})