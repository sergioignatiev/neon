<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">
      Добавить картину
    </h1>

    <!-- Форма -->
    <div class="grid gap-4 max-w-xl mb-10">
      <input
        v-model="title"
        class="border rounded-lg px-4 py-2"
        placeholder="Название"
      >

      <input
        v-model="year"
        type="number"
        class="border rounded-lg px-4 py-2"
        placeholder="Год"
      >

      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="border rounded-lg px-4 py-2"
        @change="handleImageChange"
      >

      <input
        v-model="author"
        class="border rounded-lg px-4 py-2"
        placeholder="Автор"
      >

      <textarea
        v-model="description"
        class="border rounded-lg px-4 py-2 min-h-32"
        placeholder="Описание"
      />

      <button
        class="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800"
        @click="addPainting"
      >
        Добавить
      </button>
    </div>

    <!-- Картины -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="painting in data"
        :key="painting.id"
        class="border rounded-xl overflow-hidden shadow-sm"
      >
        <img
          :src="painting.image_url"
          :alt="painting.title"
          class="w-full h-64 object-cover"
          loading="lazy"
          decoding="async"
        >

        <div class="p-4">
          <h2 class="text-xl font-bold">
            {{ painting.title }}
          </h2>

          <p class="text-gray-500">
            {{ painting.author }} · {{ painting.year }}
          </p>

          <p class="mt-3 text-gray-700">
            {{ painting.description }}
          </p>

          <button
            class="mt-4 bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700"
            @click="deletePainting(painting.id)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = ref('')
const year = ref<number | null>(null)
const description = ref('')
const author = ref('')

const imageFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function handleImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  imageFile.value = input.files?.[0] || null
}

const { data, refresh } = await useFetch('/api/paintings')

async function addPainting() {
  if (!imageFile.value) {
    alert('Выберите изображение')
    return
  }

  const formData = new FormData()

  formData.append('title', title.value)
  formData.append('year', String(year.value ?? ''))
  formData.append('image', imageFile.value)
  formData.append('description', description.value)
  formData.append('author', author.value)

  await $fetch('/api/paintings', {
    method: 'POST',
    body: formData
  })

  title.value = ''
  year.value = null
  description.value = ''
  author.value = ''
  imageFile.value = null

  if (fileInput.value) {
    fileInput.value.value = ''
  }

  await refresh()
}

async function deletePainting(id: number) {
  await $fetch(`/api/paintings/${id}`, {
    method: 'DELETE'
  })

  await refresh()
}
</script>