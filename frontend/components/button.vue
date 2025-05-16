<script setup lang="ts">
interface Props {
  text: string;
  loading?: boolean;
}
defineProps<Props>();
</script>

<template>
  <button
    class="flex w-full gap-3 items-center justify-center bg-(--c-primary) cursor-pointer py-2 px-6 rounded-xl text-(--c-border)"
    v-bind="$attrs"
  >
    <Icon v-if="loading" name="fa6-solid:spinner" class="animate-spin" />

    <span class="flex-1">{{ text }}</span>
  </button>
</template>
