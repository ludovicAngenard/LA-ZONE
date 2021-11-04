<template>
  <div>
    <v-img
      max-height="25"
      class="mx-auto d-block pt-16"
      src="../assets/images/Z_logo.png"
      alt="the logo"
    ></v-img>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="name"
        required
      ></v-text-field>

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

      <v-text-field
        v-model="confirmPassword"
        :counter="20"
        :rules="confirmPasswordRules"
        label="confirm password"
        required
      ></v-text-field>
      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Acceptez-vous que ces données soient sauvegardées en bdd ?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data: () => ({
    valid: true,
    name: "test",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "password",
    passwordRules: [
      (v) => !!v || "password is required",
      (v) => (v.length >= 5 && v.length <= 20) || "password must be valid",
    ],

    confirmPassword: "password",
    confirmPasswordRules: [
      (v) => !!v || "password is required",
      (v) => (v.length >= 5 && v.length <= 20) || "password must be valid",
    ],
    checkbox: true,
  }),
  computed: {
    user: function () {
      return this.$store.state.users.user;
    },
  },
  methods: {
    validate: async function () {
      if (this.password === this.confirmPassword) {
        const currentUSer =
          await this.$fire.auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
        const ref = await this.$fire.firestore.collection("users").doc(this.user.uid);
        const document = {
          name: this.name,
        };
        try {
          await ref.set(document);
        } catch (e) {
          console.log("ca a pas marché");
          console.error(e);
        }
      }
    },
  },
};
</script>