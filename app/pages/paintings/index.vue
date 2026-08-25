<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-6 py-10">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Картины
        </h1>

        <p class="mt-2 text-gray-500">
          Коллекция картин
        </p>
      </div>

      <!-- Paintings -->
      <div
        v-if="paintings.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <NuxtLink
          v-for="painting in paintings"
          :key="painting.id"
          :to="`/paintings/${painting.id}`"
          class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <!-- Image -->
          <div class="overflow-hidden bg-gray-100">
            <img
              :src="painting.image_url"
              :alt="painting.title"
              class="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            >
          </div>

          <!-- Info -->
          <div class="p-5">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ painting.title }}
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              {{ painting.author }}
              <span v-if="painting.year">
                · {{ painting.year }}
              </span>
            </p>

            <p class="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
              {{ painting.description }}
            </p>

            <div class="mt-4 text-sm font-medium text-gray-900">
              Подробнее →
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty -->
      <div
        v-else
        class="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center"
      >
        <p class="font-medium text-gray-700">
          Пока нет картин
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const paintingsStore = usePaintingsStore()

await paintingsStore.getPaintings()

const paintings = paintingsStore.paintings
</script>