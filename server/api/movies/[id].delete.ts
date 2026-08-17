import { db } from '../../db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  await db.query(
    'DELETE FROM movies WHERE id = $1',
    [id],
  )

  return {
    success: true,
  }
})