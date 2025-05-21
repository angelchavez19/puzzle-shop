<template>
  <!-- Outer -->
  <div class="flex flex-col w-full gap-0.5">
    <!-- Wrapper -->
    <div>
      <!-- Label -->
      <div v-if="$slots.label">
        <slot name="label" />
      </div>

      <!-- Inner -->
      <div>
        <!-- Prefix Icon -->
        <div v-if="$slots.prefixIcon">
          <slot name="prefixIcon" />
        </div>

        <!-- Prefix -->
        <div v-if="$slots.prefix">
          <slot name="prefix" />
        </div>

        <!-- Input -->
        <div v-if="$slots.default">
          <slot />
        </div>

        <!-- Sufix -->
        <div v-if="$slots.sufix">
          <slot name="sufix" />
        </div>

        <!-- Sufix Icon -->
        <div v-if="$slots.sufixIcon">
          <slot name="sufixIcon" />
        </div>
      </div>
    </div>

    <!-- Help -->
    <div v-if="$slots.help">
      <slot name="help" />
    </div>

    <!-- Message -->
    <div v-if="$slots.errorMessage" class="mb-2">
      <slot name="errorMessage" />
    </div>
  </div>
</template>
