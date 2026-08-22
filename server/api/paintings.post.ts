import { db } from '../db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await db.query(
    `INSERT INTO paintings 
      (title, year, image_url, description, author)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      body.title,
      body.year,
      body.image_url,
      body.description,
      body.author
    ]
  )

  return { success: true }
})