<template>
  <div class="ml-5">
    <div>
      <p v-if="email">
        Email : {{ email }}
        <v-btn text>
          Modifier
        </v-btn>
      </p>
      <p>
        Nom : {{ name }}
        <v-btn text>
          Modifier
        </v-btn>
      </p>
    </div>
    <p class="mr-5">Vos dernières commandes :</p>
    <div v-for="command in commands" :key="command">
      <history-command-line
        :brand="command.brand"
        :title="command.title"
        :price="command.price"
        :img="command.img"
      ></history-command-line>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      email: "",
      name: "",
      commands: [
        {
          brand: "brand1",
          title: "Title1",
          price: "100",
          img: "https://picsum.photos/200/300"
        },
        {
          brand: "brandon",
          title: "Title1",
          price: "100",
          img: "https://picsum.photos/200/300"
        }
      ]
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
  }
};
</script>
