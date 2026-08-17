<template>
  <div>
    <div>
     
      <!-- Форма -->
      <div>
        <h2>
          Добавить фильм
        </h2>

        <div>
          <input
            v-model="title"
            type="text"
            placeholder="Название"
          >

          <input
            v-model="year"
            type="number"
            placeholder="Год"
          >

          <button @click="addMovie">
            Добавить
          </button>
        </div>
      </div>

      <!-- Список -->
      <div>
        <div>
          <h2>
            Фильмы
          </h2>
        </div>

        <div v-if="movies.length">
          <div
            v-for="movie in movies"
            :key="movie.id"
          >
            <div>
              <p>
                {{ movie.title }}
              </p>

              <p>
                {{ movie.year }}
              </p>
            </div>

            <button @click="deleteMovie(movie.id)">
              Удалить
            </button>
          </div>
        </div>

        <div v-else>
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