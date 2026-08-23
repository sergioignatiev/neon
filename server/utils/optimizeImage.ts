import sharp from 'sharp'
import { randomUUID } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

export async function optimizeImage(imageUrl: string) {
  const response = await fetch(imageUrl)

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())

  const filename = `${randomUUID()}.webp`

  const folder = path.join(
    process.cwd(),
    'public',
    'paintings'
  )

  await mkdir(folder, { recursive: true })

  await sharp(buffer)
    .resize({
      width: 1200,
      withoutEnlargement: true
    })
    .webp({
      quality: 80
    })
    .toFile(path.join(folder, filename))

  return `/paintings/${filename}`
}