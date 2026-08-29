<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-6 py-10">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Картины
        </h1>

        <p class="mt-2 text-gray-500">
          Добавляйте новые картины и управляйте коллекцией.
        </p>
      </div>

      <!-- Content -->
      <div class="grid gap-8 lg:grid-cols-[380px_1fr]">
        <!-- Form -->
        <PaintingForm />

        <!-- Collection -->
        <div>
          <div class="mb-5">
            <h2 class="text-xl font-semibold tracking-tight text-gray-900">
              Коллекция
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              {{ paintingsStore.paintings.length }}
              {{ paintingsStore.paintings.length === 1 ? 'картина' : 'картин' }}
            </p>
          </div>

          <!-- Paintings -->
          <div
            v-if="paintingsStore.paintings.length"
            class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <PaintingCard
              v-for="painting in paintingsStore.paintings"
              :key="painting.id"
              :painting="painting"
              @delete="deletePainting"
            />
          </div>

          <!-- Empty state -->
          <div
            v-else
            class="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center"
          >
            <div class="mx-auto max-w-sm">
              <h3 class="font-semibold text-gray-900">
                Пока нет картин
              </h3>

              <p class="mt-2 text-sm leading-6 text-gray-500">
                Добавьте первую картину с помощью формы слева.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const paintingsStore = usePaintingsStore()

await paintingsStore.getPaintings()

async function deletePainting(id: number) {
  await paintingsStore.deletePainting(id)
}
</script>