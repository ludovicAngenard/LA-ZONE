<template>
  <div class="mb-3">
    <div class="d-flex mb-3">
      <v-img
        :lazy-src="img"
        max-height="250"
        max-width="250"
        class="mr-5 productimg"
        :src="img[0]"
      ></v-img>
      <div>
        <div class="title font-weight-bold">
          {{ brand }}
        </div>
        <div class="d-flex">
          <p class="subtitle-1 font-weight-medium mr-5">{{ title }}</p>
          <div class="d-flex">
            <div class="plus" @click="add">+</div>
            <div class="mr-3 ml-3">{{ quantity }}</div>
            <div class="minus" @click="minus">-</div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="mr-5 w-50">
        {{ desc }}
      </div>
      <div class="price display-1">{{ price }}€</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brand", "title", "img", "price", "desc", "quantity", "id"],

  methods: {
    add: async function () {
      const newCommand = {
        brand: this.brand,
        name: this.title,
        images: this.img,
        price: this.price,
        description: this.desc,
        quantity: this.quantity + 1,
      };

      const refCommand = await this.$fire.firestore
        .collection("cart")
        .doc(this.id);

      try {
        await refCommand.update(newCommand);
        this.$forceUpdate();
      } catch (e) {
        console.error(e);
      }
    },
    minus: async function () {
      const newCommand = {
        brand: this.brand,
        name: this.title,
        images: this.img,
        price: this.price,
        description: this.desc,
        quantity: this.quantity - 1,
      };

      const refCommand = await this.$fire.firestore
        .collection("cart")
        .doc(this.id);

      try {
        if (this.$fire.firestore.collection("cart").doc(this.id).quantity > 1) {
          await refCommand.update(newCommand);
        } else {
          await this.$store.dispatch(newCommand);
        }
      } catch (e) {
        console.error(e);
      }
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

.plus {
  text-align: center;
  width: 30px;
  border: 1px solid green;
  padding: 2px;
  border-radius: 50%;
  background: green;
  height: 30px;
  cursor: pointer;
}
.minus {
  text-align: center;
  border: 1px solid red;
  padding: 2px;
  border-radius: 50%;
  background: red;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
