<template>
  <!-- Outer -->
  <div class="flex flex-col w-full gap-0.5">
    <!-- Wrapper -->
    <div class="">
      <!-- Label -->
      <div v-if="$slots.label" class="">
        <slot name="label" />
      </div>

      <!-- Inner -->
      <div class="">
        <!-- Prefix Icon -->
        <div v-if="$slots.prefixIcon" class="">
          <slot name="prefixIcon" />
        </div>

        <!-- Prefix -->
        <div v-if="$slots.prefix" class="">
          <slot name="prefix" />
        </div>

        <!-- Input -->
        <div v-if="$slots.default" class="">
          <slot />
        </div>

        <!-- Sufix -->
        <div v-if="$slots.sufix" class="">
          <slot name="sufix" />
        </div>

        <!-- Sufix Icon -->
        <div v-if="$slots.sufixIcon" class="">
          <slot name="sufixIcon" />
        </div>
      </div>
    </div>

    <!-- Help -->
    <div v-if="$slots.help" class="">
      <slot name="help" />
    </div>

    <!-- Message -->
    <div v-if="$slots.errorMessage" class="mb-2">
      <slot name="errorMessage" />
    </div>
  </div>
</template>
