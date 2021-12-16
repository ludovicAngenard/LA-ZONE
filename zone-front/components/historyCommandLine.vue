<template>
  <div class="d-flex mb-3">
    <v-img
  :lazy-src="img"
  max-height="250"
  max-width="250"
  class="mr-5 productimg"
  :src="img"
   
></v-img>
    <div>
      <div class="title font-weight-bold">
        {{ brand }}
      </div>
      <p class="subtitle-1 font-weight-medium">{{ title }}</p>
      <p class="subtitle-2 font-weight-light">{{ price }}€</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brand", "title", "img", "price"]
};
</script>

<style>

.productimg{
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;
}
</style>
