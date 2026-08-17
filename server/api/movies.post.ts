import { db } from '../db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await db.query(
    'INSERT INTO movies (title, year) VALUES ($1, $2) RETURNING *',
    [body.title, body.year],
  )

  return result.rows[0]
})