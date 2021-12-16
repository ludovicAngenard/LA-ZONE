<template>
  <div>
    <img
      width="300px"
      class="mx-auto d-block pt-16"
      src="../assets/images/Z_logo.png"
      alt="the logo"
    />
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      style="width: 30%"
      class="mx-auto py-16"
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :counter="20"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>

      <div class="mx-auto text-center">
        <v-chip
          pill
          x-large
          :disabled="!valid"
          color="#DB2727"
          class="text-center px-12"
          @click="validate"
        >
          Se connecter
        </v-chip>
      </div>
      <div class="text-center pt-6">
        <a href="/register" class="white--text">
          Je n'ai pas encore de compte, je souhaite m'inscrire.
        </a>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [(v) => !!v || "password is required"],
  }),

  asyncData() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    user: function () {
      return this.$store.state.users.user;
    },
  },
  methods: {
    validate: async function () {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        this.$router.push("/product-list");
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
