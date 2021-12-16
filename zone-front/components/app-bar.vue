<template>
  <v-card class="d-flex justify-space-around align-center grey darken-3 py-6">
    <a
      href="/product-list"
      class="d-flex justify-space-around align-center text-decoration-none"
    >
      <span
        class="align-self-end px-3 white--text"
        style="
          text-shadow: 3px 1px 3px rgba(255, 0, 0, 0.77);
          line-height: 13px;
        "
        >LA</span
      >
      <span class="d-flex align-end">
        <img
          style="width: 40px"
          src="../assets/images/Z_logo.png"
          alt="the logo"
        />
        <span
          class="white--text"
          style="
            text-shadow: 3px 1px 3px rgba(255, 0, 0, 0.77);
            line-height: 13px;
          "
          >ONE</span
        >
      </span>
    </a>
    <div>
      <v-tabs color="red">
        <v-tab @click="goToWishList" class="white--text grey darken-3"
          >Mes souhaits</v-tab
        >
        <v-tab @click="goToBasket" class="white--text grey darken-3"
          >Mon panier</v-tab
        >
        <v-tab @click="goToAccount" class="white--text grey darken-3"
          >Mon compte</v-tab
        >
        <v-icon class="grey darken-3" @click="disconnect"
          >mdi-door-open
        </v-icon>
      </v-tabs>
    </div>
  </v-card>
</template>
<script>
export default {
  methods: {
    goToAccount() {
      this.$router.push("/profile");
    },
    goToBasket() {
      this.$router.push("/panier");
    },
    goToWishList() {
      this.$router.push("/wish-list");
    },
    disconnect: async function () {
      this.$fire.auth.signOut();
      this.$router.push("/connect");
    },
  },
};
</script>
