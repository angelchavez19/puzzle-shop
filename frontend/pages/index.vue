<template>
  <div class="flex flex-col">
    <NuxtLink to="/catalog">Catalog</NuxtLink>
    <NuxtLink to="/admin/products">Products</NuxtLink>
  </div>

  <ClientOnly>
    <SelectorTheme />
  </ClientOnly>
</template>
