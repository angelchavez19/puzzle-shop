<script setup lang="ts">
import axios from "axios";
import { BACKEND_URL } from "~/config";
import type { ProductI } from "~/types/product.type";

const products: Ref<ProductI[] | undefined> = ref();

const loadProducts = async () => {
  const response = await axios.get<ProductI[]>(`${BACKEND_URL}/products`);
  products.value = response.data;
};

const deleteProduct = async (slug: string) => {
  await axios.delete(`${BACKEND_URL}/products/${slug}`);
  await loadProducts();
};

onMounted(async () => {
  await loadProducts();
  useColorModeStore();
});
</script>

<template>
  <main class="flex flex-col w-full gap-10 pt-8 pb-10">
    <section>
      <h1 class="text-center text-3xl">Product Catalog</h1>
    </section>

    <section class="flex items-center justify-center w-full gap-6">
      <div
        class="flex flex-col items-end justify-center w-full max-w-[800px] px-6"
      >
        <div>
          <Button to="/admin/products/create" text="Create">
            <template #icon>
              <Icon name="mdi:plus" />
            </template>
          </Button>
        </div>
      </div>
    </section>

    <section
      class="flex items-center justify-center w-full gap-6"
      v-if="products?.length"
    >
      <div
        class="flex flex-col items-center justify-center w-full max-w-[800px] px-6"
      >
        <AdminProduct
          v-for="product in products"
          v-bind="product"
          :key="product._id"
          @delete-product="deleteProduct"
        />
      </div>
    </section>
    <section v-else-if="products">
      <p class="text-center">We don't have any products yet.</p>
    </section>
    <section v-else class="flex items-center justify-center flex-1">
      <LoaderClock />
    </section>
  </main>
</template>
