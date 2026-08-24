import sharp from 'sharp'
import { randomUUID } from 'node:crypto'
import { put } from '@vercel/blob'

export async function optimizeImage(buffer: Buffer) {
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