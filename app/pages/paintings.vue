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
        v-model="image_url"
        class="border rounded-lg px-4 py-2"
        placeholder="URL изображения"
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
        @click="addPainting()"
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
        <NuxtImg
          :src="painting.image_url"
          :alt="painting.title"
          class="w-full h-64 object-cover"
          loading='lazy'
        />

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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = ref('')
const year = ref<number | null>(null)
const image_url = ref('')
const description = ref('')
const author = ref('')

const { data, refresh } = await useFetch('/api/paintings')

async function addPainting() {
  await $fetch('/api/paintings', {
    method: 'POST',
    body: {
      title: title.value,
      year: year.value,
      image_url: image_url.value,
      description: description.value,
      author: author.value
    }
  })

  title.value = ''
  year.value = null
  image_url.value = ''
  description.value = ''
  author.value = ''

  await refresh()
}
</script>