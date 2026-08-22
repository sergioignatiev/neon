import type { Movie } from "~/interfaces/movies"
export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])

  async function getMovies() {
    movies.value = await $fetch<Movie[]>('/api/movies')
  }

  async function addMovie(title: string, year: number) {
    await $fetch('/api/movies', {
      method: 'POST',
      body: {
        title,
        year,
      },
    })

    await getMovies()
  }

  async function deleteMovie(id: number) {
    await $fetch(`/api/movies/${id}`, {
      method: 'DELETE',
    })

    await getMovies()
  }

  return {
    movies,
    getMovies,
    addMovie,
    deleteMovie,
  }
})

