import { db } from '../db'

export default defineEventHandler(async () => {
  const result = await db.query('SELECT * FROM movies')

  return result.rows
})