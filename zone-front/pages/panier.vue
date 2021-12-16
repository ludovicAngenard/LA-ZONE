<template>
  <div class="mb-5 mt-5 ml-5">
    <div v-for="command in commands" :key="command">
      <command
        :brand="command.data.brand"
        :title="command.data.name"
        :price="command.data.price"
        :img="command.data.images"
        :desc="command.data.description"
        :quantity="command.data.quantity"
        :id="command.id"
      ></command>
    </div>
    <v-row align="center">
      <v-btn text color="primary" @click="finish">
        Finaliser ma commande
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      commands: [],
    };
  },
  async created() {
    //get prduct by id
    const productRef = await this.$fire.firestore
      .collection("cart")
      .where("userId", "==", this.$fire.auth.currentUser.uid);
    try {
      const productDoc = await productRef.get();
      productDoc.forEach((element) => {
        this.commands.push({ data: element.data(), id: element.id });
      });
    } catch (e) {
      console.log(e);
      return;
    }
  },
  methods: {
    finish: async function () {
      const current = this.$fire.auth.currentUser.uid;
      const promises = this.commands.map(async (command) => {
        // add in oldorder
        const ref = await this.$fire.firestore
          .collection("oldorder")
          .doc(command.id);
        const document = {
          brand: command.data.brand,
          name: command.data.name,
          images: command.data.images,
          price: command.data.price,
          description: command.data.description,
          quantity: command.data.quantity,
          userId: current,
        };
        try {
          await ref.set(document);
        } catch (e) {
          console.error(e);
        }

        // delete in cart
        const refCart = await this.$fire.firestore
          .collection("cart")
          .doc(command.id);

        try {
          await refCart.delete();
        } catch (e) {
          console.error(e);
        }
      });
      this.$forceUpdate();
      return Promise.all(promises);
    },
  },
};
</script>
