<template>
    <div>
        <navbar></navbar>
          <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
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

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
            Validate
        </v-btn>

        </v-form>
    </div>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
        v => !!v || 'password is required',
        ],
    }),
    methods: {
        validate(){
            this.$store.state.users.users.forEach(user => {
                if(user.email == this.email && user.password == password){
                    this.$router.$store.dispatch('users/connect_user')
                }
            });

        }
    }
}
</script>
