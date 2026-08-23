import sharp from 'sharp'
import { randomUUID } from 'node:crypto'
import { put } from '@vercel/blob'

export async function optimizeImage(imageUrl: string) {
  const response = await fetch(imageUrl)

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())

  const filename = `${randomUUID()}.webp`

  const optimizedImage = await sharp(buffer)
    .resize({
      width: 1200,
      withoutEnlargement: true
    })
    .webp({
      quality: 80
    })
    .toBuffer()

  const blob = await put(`paintings/${filename}`, optimizedImage, {
    access: 'public',
    contentType: 'image/webp'
  })

  return blob.url
}