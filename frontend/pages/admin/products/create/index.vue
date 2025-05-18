<script setup lang="ts">
import { useForm } from "@formwerk/core";
import z from "zod";

const { handleSubmit, isSubmitting } = useForm();

const stringSchema = z.string({
  required_error: "This field is required.",
});
const priceSchema: z.ZodType<number, z.ZodTypeDef, number> = z
  .number({
    required_error: "This field is required.",
    invalid_type_error: "Must be a number.",
  })
  .positive("Must be a positive number.")
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
    message: "Maximum 2 decimal places.",
  });
const stockSchema: z.ZodType<number, z.ZodTypeDef, number> = z
  .number({
    required_error: "This field is required.",
    invalid_type_error: "Must be a number.",
  })
  .int("Must be an integer.")
  .min(0, "Must be at least 0.");

const onSubmit = handleSubmit(async (data) => {
  console.log(JSON.stringify(data.toObject(), null, 2));
});

onMounted(() => {
  useColorModeStore();
});
</script>

<template>
  <main class="flex flex-col w-full gap-10 pt-8 pb-10 px-5">
    <section class="flex flex-col gap-2">
      <h1 class="text-3xl leading-[1]">Create Product</h1>
      <Separator />
      <p class="text-sm">
        Fields marked with <span class="text-red-400">*</span> are required.
      </p>
    </section>

    <section class="">
      <form @submit="onSubmit" novalidate class="flex flex-col w-full">
        <div class="flex flex-col gap-6 max-w-[600px]">
          <FormInputText
            label="Product Name"
            name="name"
            required
            :schema="stringSchema"
          />
          <FormInputNumber
            label="Price"
            name="price"
            required
            :schema="priceSchema"
          />
          <FormInputNumber
            label="Stock"
            name="stock"
            required
            :schema="stockSchema"
          />
          <FormInputTextarea
            label="Images"
            name="images"
            required
            :schema="stringSchema"
            description="Enter the URLs, one per line."
          />
          <FormInputText
            label="Tags"
            name="tags"
            required
            :schema="stringSchema"
            description="Separate tags with commas."
          />
          <FormInputText
            label="Category"
            name="category"
            required
            :schema="stringSchema"
          />
          <FormInputTextarea label="Details" name="details">
            <template #help>
              <p>
                Enter the product details in the following format, one key per
                line:
              </p>
              <pre>
key: value
key2: value2
              </pre>
            </template>
          </FormInputTextarea>

          <Button text="Create Product" :loading="isSubmitting" type="submit" />
        </div>
      </form>
    </section>
  </main>
</template>
