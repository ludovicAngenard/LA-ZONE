<template>
  <div class="ml-5">
    <div>
      <p v-if="email">
        Email : {{ email }}
        <v-btn text> Modifier </v-btn>
      </p>
      <p>
        Nom : {{ name }}
        <v-btn text> Modifier </v-btn>
      </p>
    </div>
    <p class="mr-5">Vos dernières commandes :</p>
    <div v-for="command in commands" :key="command">
      <history-command-line
        :brand="command.data.brand"
        :title="command.data.name"
        :price="command.data.price"
        :img="command.data.images[0]"
        :desc="command.data.description"
        :quantity="command.data.quantity"
        :id="command.id"
      ></history-command-line>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      email: "",
      name: "",
      commands: [],
    };
  },
  async created() {
    //get prduct by id

    this.email = this.$fire.auth.currentUser?.email;

    const profileNameRef = this.$fire.firestore
      .collection("users")
      .doc(this.$fire.auth.currentUser.uid);
    try {
      const profileNameDoc = await profileNameRef.get();
      this.name = profileNameDoc.data().name;
    } catch (e) {
      console.log(e);
      return;
    }
    const productRef = await this.$fire.firestore
      .collection("oldorder")
      .where("userId", "==", this.$fire.auth.currentUser.uid);
    try {
      const productDoc = await productRef.get();
      productDoc.forEach((element) => {
        this.commands.push({ data: element.data(), id: element.id });
      });
      // this.commands = productDoc.data();
    } catch (e) {
      console.log(e);
      return;
    }
  },
};
</script>
