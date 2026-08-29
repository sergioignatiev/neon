<template>
  <article
    class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <!-- Image -->
    <div class="overflow-hidden bg-gray-100">
      <img
        :src="painting.image_url"
        :alt="painting.title"
        class="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      >
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="truncate text-lg font-semibold text-gray-900">
        {{ painting.title }}
      </h3>

      <p class="mt-1 text-sm text-gray-500">
        {{ painting.author }}
        <span class="mx-1 text-gray-300">·</span>
        {{ painting.year }}
      </p>

      <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
        {{ painting.description }}
      </p>

      <button
        class="mt-5 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        @click="emit('delete', painting.id)"
      >
        Удалить
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Painting } from '~/interfaces/paintings';
defineProps<{
  painting: Painting
}>()

const emit = defineEmits<{
  delete: [id: number]
}>()
</script>