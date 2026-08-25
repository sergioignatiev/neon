import type { Painting } from "~/interfaces/paintings"

export const usePaintingsStore = defineStore('paintings', () => {
  const paintings = ref<Painting[]>([])

  async function getPaintings() {
    paintings.value = await $fetch<Painting[]>('/api/paintings')
  }

  async function addPainting(formData: FormData) {
    await $fetch('/api/paintings', {
      method: 'POST',
      body: formData
    })

    await getPaintings()
  }

  async function deletePainting(id: number) {
    await $fetch(`/api/paintings/${id}`, {
      method: 'DELETE'
    })

    await getPaintings()
  }

  return {
    paintings,
    getPaintings,
    addPainting,
    deletePainting
  }
})