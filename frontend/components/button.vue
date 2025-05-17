<script setup lang="ts">
import { NuxtLink } from "#components";

interface Props {
  text?: string;
  loading?: boolean;
  to?: string;
}
defineProps<Props>();
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    v-bind="$attrs"
    class="flex w-full gap-3 items-center justify-center bg-(--c-primary) cursor-pointer py-2 px-4 rounded-xl text-(--c-border)"
  >
    <Icon v-if="loading" name="fa6-solid:spinner" class="animate-spin" />

    <slot name="icon" />

    <span v-if="text" class="flex-1">{{ text }}</span>
  </component>
</template>
