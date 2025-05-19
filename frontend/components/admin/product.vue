<script setup lang="ts">
import type { ProductI } from "~/types/product.type";

defineProps<ProductI>();
defineEmits(["deleteProduct"]);
</script>

<template>
  <div
    class="flex items-center justify-between w-full bg-(--c-surface) py-4 px-2 outline-1 outline-(--c-primary)"
  >
    <h2>{{ name }}</h2>

    <div class="flex items-center justify-between gap-2">
      <Button text="Edit" :to="`/admin/products/edit/${slug}`">
        <template #icon><Icon name="mdi:pencil" /></template>
      </Button>

      <Button
        @click="$emit('deleteProduct', _id)"
        text="Delete"
        class="bg-(--c-secondary) text-(--c-text)"
      >
        <template #icon><Icon name="mdi:trash" /></template>
      </Button>
    </div>
  </div>
</template>
