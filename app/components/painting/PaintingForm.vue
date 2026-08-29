<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div class="mb-6">
      <h2 class="text-xl font-semibold tracking-tight text-gray-900">
        Новая картина
      </h2>

      <p class="mt-1 text-sm text-gray-500">
        Заполните информацию и загрузите изображение.
      </p>
    </div>

    <form
      class="space-y-5"
      @submit.prevent="addPainting"
    >
      <!-- Title -->
      <div>
        <label
          for="title"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Название
        </label>

        <input
          id="title"
          v-model="title"
          type="text"
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          placeholder="Например, The Starry Night"
        >
      </div>

      <!-- Year -->
      <div>
        <label
          for="year"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Год
        </label>

        <input
          id="year"
          v-model="year"
          type="number"
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          placeholder="1889"
        >
      </div>

      <!-- Author -->
      <div>
        <label
          for="author"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Автор
        </label>

        <input
          id="author"
          v-model="author"
          type="text"
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          placeholder="Винсент ван Гог"
        >
      </div>

      <!-- Image -->
      <div>
        <label
          for="image"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Изображение
        </label>

        <input
          id="image"
          ref="fileInput"
          type="file"
          accept="image/*"
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
          @change="handleImageChange"
        >
      </div>

      <!-- Description -->
      <div>
        <label
          for="description"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Описание
        </label>

        <textarea
          id="description"
          v-model="description"
          class="min-h-32 w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          placeholder="Описание картины..."
        />
      </div>

      <!-- Button -->
      <button
        type="submit"
        class="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="isAdding"
      >
        {{ isAdding ? 'Загрузка...' : 'Добавить картину' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const paintingsStore = usePaintingsStore()

const title = ref('')
const year = ref<number | null>(null)
const description = ref('')
const author = ref('')

const imageFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const isAdding = ref(false)

function handleImageChange(event: Event) {
  const input = event.target as HTMLInputElement

  imageFile.value = input.files?.[0] || null
}

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

  try {
    isAdding.value = true

    await paintingsStore.addPainting(formData)

    title.value = ''
    year.value = null
    description.value = ''
    author.value = ''
    imageFile.value = null

    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } finally {
    isAdding.value = false
  }
}
</script>