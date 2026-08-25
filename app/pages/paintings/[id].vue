<template>
  <div v-if="painting" class="max-w-6xl mx-auto p-6">
    <img
      :src="painting.image_url"
      :alt="painting.title"
      class="w-full max-w-4xl rounded-xl"
    >

    <h1 class="mt-6 text-3xl font-bold">
      {{ painting.title }}
    </h1>

    <p class="mt-2 text-gray-500">
      {{ painting.author }} · {{ painting.year }}
    </p>

    <p class="mt-6 text-gray-700 leading-7">
      {{ painting.description }}
    </p>
  </div>

  <div v-else>
    Картина не найдена
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const paintingsStore = usePaintingsStore()

await paintingsStore.getPaintings()

const painting = computed(() =>
  paintingsStore.paintings.find(
    painting => painting.id === Number(route.params.id)
  )
)
</script>