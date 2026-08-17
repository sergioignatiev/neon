export default defineEventHandler(async () => {
  return await $fetch('/api/movies', {
    method: 'POST',
    body: {
      title: 'Alien',
      year: 1979,
    },
  })
})