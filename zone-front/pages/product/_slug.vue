<template>
  <div>
    <v-progress-circular
      v-if="!command"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <product-details
      v-if="command"
      :brand="command.brand"
      :name="command.name"
      :price="command.price"
      :images="command.images"
      :description="command.description"
      :productid="productId"
    ></product-details>
  </div>
</template>

<script>
import productDetails from "../../components/productDetails.vue";
export default {
  components: { productDetails },
  async asyncData({ params }) {
    const productId = params.slug;
    return { productId };
  },
  data: function () {
    return {
      command: null,
    };
  },
  async created() {
    const productRef = this.$fire.firestore
      .collection("products")
      .doc(this.productId);
    try {
      const productDoc = await productRef.get();
      this.command = productDoc.data();
    } catch (e) {
      console.log(e);
      return;
    }
  },
};
</script>
