<script setup lang="ts">
import axios from "axios";
import { BACKEND_URL } from "~/config";
import type { ProductI } from "~/types/product.type";

const products: Ref<ProductI[] | undefined> = ref();

onMounted(async () => {
  const response = await axios.get<ProductI[]>(`${BACKEND_URL}/product`);
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
      <div class="loader"></div>
    </section>
  </main>
</template>

<style scoped>
.loader {
  width: 40px;
  aspect-ratio: 1;
  border: 2px solid;
  box-sizing: border-box;
  color: var(--c-primary);
  background: radial-gradient(circle 3px, currentColor 95%, #0000),
    linear-gradient(currentColor 50%, #0000 0) 50%/3px 80% no-repeat,
    linear-gradient(90deg, currentColor 50%, #0000 0) 50%/60% 3px no-repeat;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    height: 50px;
    inset: 100% 10% auto;
    background: radial-gradient(
        circle closest-side at 50% calc(100% - 10px),
        currentColor 94%,
        #0000
      ),
      linear-gradient(currentColor 0 0) top/3px 80% no-repeat;
    transform-origin: top;
    animation: l2 2s infinite cubic-bezier(0.5, 200, 0.5, -200);
  }
}
@keyframes l2 {
  100% {
    transform: rotate(0.4deg);
  }
}
</style>
