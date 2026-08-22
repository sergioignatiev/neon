<template>
  <div class="min-h-screen bg-slate-900 px-6 text-white py-10">
    <div class="mx-auto max-w-5xl">

      <!-- Header -->
      <div class="mb-8 flex items-center justify-end">
        <div class="rounded-xl border border-gray-700 bg-gray-800 px-5 py-3 shadow-lg">
          <span class="text-sm text-gray-400">
            Total movies
          </span>

          <span class="ml-2 text-2xl font-extrabold text-yellow-400">
            {{ moviesStore.movies.length }}
          </span>
        </div>
      </div>

      <!-- Add movie -->
      <section class="mb-8 rounded-2xl border border-gray-700 bg-gray-800 shadow-xl">
        <div class="border-b border-gray-700 px-7 py-5">
          <h2 class="text-2xl font-bold text-yellow-300">
            Add movie
          </h2>

          <p class="mt-1 text-sm text-gray-400">
            Add a new movie to your database.
          </p>
        </div>

        <div class="grid gap-5 p-7 sm:grid-cols-[1fr_180px_auto]">
          <div>
            <label class="mb-2 block text-sm font-semibold text-yellow-300">
              Movie title
            </label>

            <input
              v-model="title"
              type="text"
              placeholder="Enter movie title"
              class="h-16 w-full rounded-xl border-2 border-yellow-400 bg-gray-900 px-5 text-lg text-yellow-200 placeholder:text-yellow-600 outline-none transition focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500/40"
            >
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-yellow-300">
              Release year
            </label>

            <input
              v-model="year"
              type="number"
              min="1900"
              max="2026"
              placeholder="2026"
              class="h-16 w-full rounded-xl border-2 border-yellow-400 bg-gray-900 px-5 text-lg text-yellow-200 placeholder:text-yellow-600 outline-none transition focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500/40"
            >
          </div>

          <div class="flex items-end">
            <button
              class="h-16 w-full rounded-xl bg-yellow-400 px-7 text-xl font-extrabold text-gray-900 shadow-lg transition hover:bg-yellow-300 active:scale-95 sm:w-auto"
              @click="addMovieAdmin"
            >
              + ADD MOVIE
            </button>
          </div>
        </div>
      </section>

      <!-- Movies -->
      <section class="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-xl">
        <div class="border-b border-gray-700 px-7 py-5">
          <h2 class="text-2xl font-bold text-yellow-300">
            Movie library
          </h2>

          <p class="mt-1 text-sm text-gray-400">
            Manage movies in your database.
          </p>
        </div>

        <div
          v-if="moviesStore.movies.length"
          class="divide-y divide-gray-700"
        >
          <div
            v-for="movie in moviesStore.movies"
            :key="movie.id"
            class="flex items-center justify-between gap-6 px-7 py-5 transition hover:bg-gray-700"
          >
            <div class="flex min-w-0 items-center gap-5">
              <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-lg font-extrabold text-gray-900 shadow-md">
                {{ movie.year }}
              </div>

              <div class="min-w-0">
                <p class="truncate text-xl font-bold text-white">
                  {{ movie.title }}
                </p>

                <p class="mt-1 text-sm text-gray-400">
                  Release year: {{ movie.year }}
                </p>
              </div>
            </div>

            <button
              class="shrink-0 rounded-xl bg-red-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-red-600 active:scale-95"
              @click="moviesStore.deleteMovie(movie.id)"
            >
              DELETE
            </button>
          </div>
        </div>

        <div
          v-else
          class="px-7 py-16 text-center"
        >
          <p class="text-base font-medium text-gray-400">
            No movies in the database.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore()

await moviesStore.getMovies()

const title = ref('')
const year = ref(2026)

async function addMovieAdmin() {
  if (title.value) {
    await moviesStore.addMovie(title.value, year.value)

    title.value = ''
    year.value = 2026
  } else {
    alert('Enter The title of the movie')
  }
}
</script>