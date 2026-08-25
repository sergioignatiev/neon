<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-6 py-10">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Добавить картину
        </h1>

        <p class="mt-2 text-gray-500">
          Загрузите изображение и заполните информацию о картине.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[380px_1fr]">
        <!-- Form -->
        <div class="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-gray-900">
            Новая картина
          </h2>

          <div class="space-y-4">
            <!-- Title -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                Название
              </label>

              <input
                v-model="title"
                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-black"
                placeholder="Например, The Starry Night"
              >
            </div>

            <!-- Year -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                Год
              </label>

              <input
                v-model="year"
                type="number"
                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-black"
                placeholder="1889"
              >
            </div>

            <!-- Image -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                Изображение
              </label>

              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium"
                @change="handleImageChange"
              >
            </div>

            <!-- Author -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                Автор
              </label>

              <input
                v-model="author"
                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-black"
                placeholder="Автор"
              >
            </div>

            <!-- Description -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                Описание
              </label>

              <textarea
                v-model="description"
                class="min-h-32 w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-black"
                placeholder="Описание картины..."
              />
            </div>

            <!-- Button -->
            <button
              class="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="isAdding"
              @click="addPainting"
            >
              {{ isAdding ? 'Загрузка...' : 'Добавить картину' }}
            </button>
          </div>
        </div>

        <!-- Paintings -->
        <div>
          <div class="mb-5 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                Картины
              </h2>

              <p class="mt-1 text-sm text-gray-500">
                {{ paintingsStore.paintings.length }} картин
              </p>
            </div>
          </div>

          <div
            v-if="paintingsStore.paintings.length"
            class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <div
              v-for="painting in paintingsStore.paintings"
              :key="painting.id"
              class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                :src="painting.image_url"
                :alt="painting.title"
                class="h-64 w-full object-cover"
                loading="lazy"
                decoding="async"
              >

              <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ painting.title }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  {{ painting.author }} · {{ painting.year }}
                </p>

                <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {{ painting.description }}
                </p>

                <button
                  class="mt-5 w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  @click="deletePainting(painting.id)"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-else
            class="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center"
          >
            <p class="font-medium text-gray-700">
              Пока нет картин
            </p>

            <p class="mt-1 text-sm text-gray-500">
              Добавьте первую картину через форму.
            </p>
          </div>
        </div>
      </div>
    </div>
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

await paintingsStore.getPaintings()

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

async function deletePainting(id: number) {
  await paintingsStore.deletePainting(id)
}
</script>