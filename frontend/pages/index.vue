<template>
  <div class="flex flex-col">
    <NuxtLink to="/catalog">Catalog</NuxtLink>
    <NuxtLink to="/admin/products/create">Create product</NuxtLink>
  </div>

  <ClientOnly>
    <SelectorTheme />
  </ClientOnly>
</template>
