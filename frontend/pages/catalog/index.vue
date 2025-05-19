<script setup lang="ts">
import axios from "axios";
import { BACKEND_URL } from "~/config";
import type { ProductI } from "~/types/product.type";

const products: Ref<ProductI[] | undefined> = ref();

onMounted(async () => {
  const response = await axios.get<ProductI[]>(`${BACKEND_URL}/products`);
  products.value = response.data;

  useColorModeStore();
});
</script>

<template>
  <main class="flex flex-col w-full gap-10 pt-8 pb-10">
    <section>
      <h1 class="text-center text-3xl">Product Catalog</h1>
    </section>

    <section
      class="flex flex-wrap justify-center w-full gap-6"
      v-if="products?.length"
    >
      <Product
        v-for="product in products"
        v-bind="product"
        :key="product._id"
      />
    </section>
    <section v-else-if="products">
      <p class="text-center">We don't have any products yet.</p>
    </section>
    <section v-else class="flex items-center justify-center flex-1">
      <LoaderClock />
    </section>
  </main>
</template>
