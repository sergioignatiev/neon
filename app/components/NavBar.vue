<template>
  <nav class="border-b border-zinc-800 bg-zinc-950">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink
        to="/"
        class="text-lg font-bold text-white"
      >
        Movies
      </NuxtLink>

      <ul class="flex items-center gap-6">
        <li
          v-for="item in navigation"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="text-sm text-zinc-400 transition hover:text-white"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navigation = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Admin',
    path: '/admin',
  },
  {title:"Paintings",
    path:"/paintings"
  }
]
</script>