<script setup lang="ts">
import type { ProductI } from "~/types/product.type";

defineProps<ProductI>();
</script>

<template>
  <NuxtLink
    :to="`/catalog/product/${slug}`"
    class="w-60 rounded-2xl overflow-hidden bg-(--c-surface)"
  >
    <div class="w-60 h-60 overflow-hidden">
      <img
        :src="images[0].url"
        :alt="images[0].alt"
        class="object-contain"
        width="240"
        height="240"
      />
    </div>

    <div class="py-4 px-2 gap-3">
      <div class="p-0.5 bg-(--c-primary) inline rounded-md">
        <span class="text-(--c-border) text-sm"># {{ category.name }}</span>
      </div>

      <h2 class="text-xl mt-3">{{ name }}</h2>

      <p class="pb-4">
        <span class="text-green-600">$ {{ formatAmount(price) }}</span> •
        <span class="text-blue-500">({{ stock }} availables)</span>
      </p>

      <p class="text-sm">{{ description.longDescription }}</p>
    </div>
  </NuxtLink>
</template>
