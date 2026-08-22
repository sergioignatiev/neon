<template>
  <div v-for="movie in moviesStore.movies" :key="movie.id">
    <p>{{ movie.title }}{{ movie.id }}</p>
    <button @click="moviesStore.deleteMovie(movie.id)">DELETE</button>
  </div>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore()
await moviesStore.getMovies()
</script>