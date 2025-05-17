<script setup lang="ts">
import { useForm } from "@formwerk/core";
import axios from "axios";
import z from "zod";
import { BACKEND_URL } from "~/config";
import type { ProductI } from "~/types/product.type";

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

const route = useRoute();
const paramId = route.params.id;
const productData: Ref<ProductI | null | undefined> = ref();

const images = ref("");
const tags = ref("");
const details = ref("");

onMounted(async () => {
  useColorModeStore();

  if (!paramId) {
    productData.value = null;
    return;
  }

  try {
    const response = await axios.get<ProductI>(
      `${BACKEND_URL}/product/by-id/${paramId}`
    );

    productData.value = response.data;
    images.value = response.data.images.join("\n");
    tags.value = response.data.tags.join(",");

    const { longDescription, ...deatilsWithoutLongDescription } =
      response.data.description;
    details.value = Object.entries(deatilsWithoutLongDescription)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  } catch {
    productData.value = null;
  }
});
</script>

<template>
  <main
    class="flex flex-col w-full gap-10 pt-8 pb-10 px-5"
    v-if="productData !== null"
  >
    <section class="flex flex-col gap-2">
      <h1 class="text-3xl leading-[1]">Edit Product</h1>
      <Separator />
      <p class="text-sm">
        Fields marked with <span class="text-red-400">*</span> are required.
      </p>
    </section>

    <section class="" v-if="productData">
      <form @submit="onSubmit" novalidate class="flex flex-col w-full">
        <div class="flex flex-col gap-6 max-w-[600px]">
          <FormInputText
            v-model="productData.name"
            label="Product Name"
            name="name"
            required
            :schema="stringSchema"
          />
          <FormInputNumber
            v-model="productData.price"
            label="Price"
            name="price"
            required
            :schema="priceSchema"
          />
          <FormInputNumber
            v-model="productData.stock"
            label="Stock"
            name="stock"
            required
            :schema="stockSchema"
          />
          <FormInputTextarea
            v-model="images"
            label="Images"
            name="images"
            required
            :schema="stringSchema"
            description="Enter the URLs, one per line."
          />
          <FormInputText
            v-model="tags"
            label="Tags"
            name="tags"
            required
            :schema="stringSchema"
            description="Separate tags with commas."
          />
          <FormInputText
            v-model="productData.category.name"
            label="Category"
            name="category"
            required
            :schema="stringSchema"
          />
          <FormInputTextarea v-model="details" label="Details" name="details">
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

          <Button text="Update Product" :loading="isSubmitting" type="submit" />
        </div>
      </form>
    </section>
  </main>

  <main v-else>Page not found</main>
</template>
