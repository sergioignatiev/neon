<template>
  <div class="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-8 text-3xl font-bold tracking-tight">
        Movies
      </h1>

      <!-- Форма -->
      <div class="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 class="mb-5 text-lg font-semibold">
          Добавить фильм
        </h2>

        <div class="grid gap-4 sm:grid-cols-[1fr_140px_auto]">
          <input
            v-model="title"
            type="text"
            placeholder="Название"
            class="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-400"
          />

          <input
            v-model="year"
            type="number"
            placeholder="Год"
            class="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-400"
          />

          <button
            class="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 active:scale-95"
            @click="addMovie"
          >
            Добавить
          </button>
        </div>
      </div>

      <!-- Список -->
      <div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div class="border-b border-zinc-800 px-6 py-4">
          <h2 class="font-semibold">
            Фильмы
          </h2>
        </div>

        <div
          v-if="movies.length"
          class="divide-y divide-zinc-800"
        >
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-zinc-800/50"
          >
            <div>
              <p class="font-medium">
                {{ movie.title }}
              </p>

              <p class="mt-1 text-sm text-zinc-500">
                {{ movie.year }}
              </p>
            </div>

            <button
              class="rounded-lg border border-red-900/50 px-3 py-2 text-sm text-red-400 transition hover:bg-red-950 hover:text-red-300"
              @click="deleteMovie(movie.id)"
            >
              Удалить
            </button>
          </div>
        </div>

        <div
          v-else
          class="px-6 py-12 text-center text-sm text-zinc-500"
        >
          Фильмов пока нет
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Movie {
  id: number
  title: string
  year: number
}

const title = ref('')
const year = ref<number>()

const movies = ref<Movie[]>([])

async function getMovies() {
  movies.value = await $fetch('/api/movies')
}

async function deleteMovie(id: number) {
  await $fetch(`/api/movies/${id}`, {
    method: 'DELETE',
  })

  await getMovies()
}

async function addMovie() {
  await $fetch('/api/movies', {
    method: 'POST',
    body: {
      title: title.value,
      year: year.value,
    },
  })

  title.value = ''
  year.value = undefined

  await getMovies()
}

await getMovies()
</script>