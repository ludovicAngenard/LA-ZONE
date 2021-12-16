<template>
  <div class="mt-5 mb-3">
    <div class="d-flex mb-3">
      <v-carousel class="w-50">
        <v-carousel-item
          eager
          v-for="(image, i) in images"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
          class="d-flex justify-center"
        >
          <img
            style="
              width: auto;
              height: 100% !important;
              display: flex;
              justify-content: center;
              margin: 0 auto;
            "
            :src="image"
            alt=""
          />
        </v-carousel-item>
      </v-carousel>

      <div>
        <div class="title font-weight-bold">
          {{ brand }}
        </div>
        <div>
          <p class="subtitle-1 font-weight-medium mr-5">{{ name }}</p>
          <div class="mr-5 w-50 mb-5">
            {{ description }}
          </div>
          <div class="d-flex">
            <div class="price display-1 mr-5">{{ price }}€</div>

            <v-btn elevation="2" icon class="mr-5">
              <v-icon large color="white">
                mdi-cards-heart-outline</v-icon
              ></v-btn
            >
            <v-row align="center">
              <v-btn text @click="add"> Ajouter au panier </v-btn>
            </v-row>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex"></div>
    <categories-slider></categories-slider>
  </div>
</template>

<script>
import categoriesSlider from "./categories-slider.vue";
import addToCart from "../utils/addToCard";
export default {
  components: { categoriesSlider },
  props: ["brand", "name", "images", "price", "description", "productid"],
  methods: {
    add: async function () {
      addToCart(this.$fire, this.productid, {
        brand: this.brand,
        name: this.name,
        images: this.images,
        price: this.price,
        description: this.description,
        quantity: 1,
        userId: this.$fire.auth.currentUser.uid,
      });
      this.$router.push("/panier");
    },
  },
};
</script>

<style>
.productimg {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
}

.w-50 {
  max-width: 50%;
}

.price {
  color: red;
}

.btn {
  border-radius: 15px;
}
</style>
