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
        style="width:30%"
        class="mx-auto py-16"
        >
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
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Acceptez-vous que ces données soient sauvegardées en bdd ?"
        required

        ></v-checkbox>
        <div class="mx-auto text-center">
            <v-chip
            pill
            x-large
            :disabled="!valid"
            color="#DB2727"
            class="text-center px-12"
            @click="validate"
            >
                S'inscrire
            </v-chip>
        </div>
        <div class="text-center pt-6">
            <a href="/connect" class="white--text">
                J'ai déjà une compte, je souhaite me connecter.
            </a>
        </div>
        </v-form>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
        v => !!v || 'password is required',
        v => (v.length >= 5 && v.length <= 20) || 'password must be valid',
        ],

        confirmPassword: '',
        confirmPasswordRules: [
        v => !!v || 'password is required',
        v => (v.length >= 5 && v.length <= 20) || 'password must be valid',
        ],
        checkbox: false,
    }),
    methods: {
        validate () {
            if (this.password === this.confirmPassword) {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            } else {
            }
        }
    }
}
</script>