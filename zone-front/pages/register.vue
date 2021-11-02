<template>
    <div>
        <navbar></navbar>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-text-field
            v-model="firstName"
            :counter="10"
            :rules="firstNameRules"
            label="firstName"
            required
        ></v-text-field>
        <v-text-field
            v-model="lastName"
            :counter="10"
            :rules="lastNameRules"
            label="lastName"
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
            :counter="10"
            :rules="passwordRules"
            label="password"
            required
        ></v-text-field>

        <v-text-field
            v-model="confirmPassword"
            :counter="10"
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

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
            Validate
        </v-btn>
        </v-form>
        <p>{{this.$store.state.users.users}}</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        firstName: '',
        firstNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        lastName: '',
        lastNameRules: [
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
            console.log(this.$refs.form.validate())
            let user = {}
            console.log('data : ', this.$store.state.users.users,  this.$store.state.users.users.includes(user))
            if (this.$refs.form.validate()) {
                user = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                console.log(user)

                if (!this.$store.state.users.users.includes(user)) {
                    this.$store.dispatch("users/add_user", user);
                    localStorage.setItem('users', JSON.stringify(this.$store.state.users.users));
                    this.$store.dispatch("users/connect_user", user);
                } else {
                    user = {}
                }
                console.log('ça passe ?')
            }
        }
    }
}
</script>