<script setup lang="ts">
import { type TextFieldProps, useTextField } from "@formwerk/core";

const props = defineProps<TextFieldProps>();

const {
  inputProps,
  labelProps,
  errorMessage,
  errorMessageProps,
  descriptionProps,
  isTouched,
} = useTextField({
  ...props,
  disableHtmlValidation: true,
});
</script>

<template>
  <FormInputBase>
    <template #label>
      <label v-bind="labelProps">
        {{ label }} <span v-if="required" class="text-red-400">*</span>
      </label>
    </template>

    <textarea
      v-bind="inputProps"
      class="outline-2 outline-(--c-primary) rounded-md py-0.5 px-2 w-full"
    />

    <template #help v-if="description">
      <p v-bind="descriptionProps">{{ description }}</p>
    </template>

    <slot v-if="$slots.help" name="help"> </slot>

    <template #errorMessage v-if="isTouched">
      <p v-bind="errorMessageProps" class="text-red-400">
        {{ errorMessage }}
      </p>
    </template>
  </FormInputBase>
</template>
