<template>
    <div>
        <v-card
        min-height="500px"
        width="350px"
        class="text-center pb-4 mb-6"
        >
        <v-container>
            <v-icon dark class="mb-2">
                mdi-cart-variant
            </v-icon>
            <v-row>
            <v-col>
                Produit
            </v-col>
            <v-col>
                Quantité
            </v-col>
            <v-col>
                Prix
            </v-col>

            </v-row>
            <v-row
                v-for="product in this.$store.state.products.cartProducts"
                :key="product.name"
            >
            <v-col>
                {{product.name}}
            </v-col>
            <v-col class="d-flex">
                <v-btn
                    fab
                    dark
                    small
                    color="red"
                    width= "30px"
                    height= "30px"
                    class="mr-2"
                >
                    <v-icon dark  v-on:click="sub(product)">
                    mdi-minus
                    </v-icon>
                </v-btn>
                {{product.quantity}}
                <v-btn

                    fab
                    dark
                    small
                    color="success"
                    width= "30px"
                    height= "30px"
                    class="ml-2"
                >
                    <v-icon dark  v-on:click="plus(product)">
                    mdi-plus
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col class="red--text">
                {{product.quantity * product.price}} €
            </v-col>

            </v-row>
        </v-container>
        <v-card
            min-height="400px"
            width='80%'
            outlined
            class="mx-auto drop-zone text-center my-auto d-flex text--disabled"
            @drop="onDrop($event)"
            @dragover.prevent
            @dragenter.prevent
            >

            <span class="my-auto mx-auto">
                Glissez vos produits au panier !
            </span>
        </v-card>
        <v-row class="mt-4">
            <v-col>
                TOTAL :
            </v-col>
            <v-col class="red--text">
                {{totalPrice}} €
            </v-col>

            </v-row>
            <v-btn
                class="ma-2 mt-6"
                color="success"
                @click="valid_cart"
                >
                Valider mon panier
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {

    data: () => ({
        isExisted: false,
        totalPrice:0

    }),

    computed: {
    },

    methods: {
  		onDrop(evt) {
  			const productID = evt.dataTransfer.getData('productID')

            console.log(' evt',evt.dataTransfer)
  			const product =  this.$store.state.products.products.find(product => product.name == productID)
              console.log('bah alors : ',product)
            this.$store.state.products.cartProducts.forEach(element => {
                if (element.name == product.name){
                    this.findQuantity(product)
                    this.findPrice(product)
                    console.log('oui : ', product)
                    this.$store.dispatch('products/readd_to_cart', product)

                    this.isExisted = true
                    console.log('isExisted : true')

                }
            });
            if (!this.isExisted){
                console.log('isExisted : false')
                this.findQuantity(product)
                this.findPrice(product)
                this.$store.dispatch('products/add_to_cart', product)

            }
            this.findTotal()
            this.$forceUpdate();
            this.isExisted = false
  		},
          findQuantity (product) {
            const index = this.$store.state.products.cartProducts.indexOf(product);
            if (index > -1) {
                return this.$store.state.products.cartProducts[index].quantity
            }

        },
        findPrice (product) {
            const index = this.$store.state.products.cartProducts.indexOf(product);
            if (index > -1) {
                return this.$store.state.products.cartProducts[index].quantity * this.$store.state.products.cartProducts[index].price
            }
        },
        findTotal(){
            this.totalPrice = 0
            this.$store.state.products.cartProducts.forEach(element => {
                this.totalPrice += element.price * element.quantity
            });
            return this.totalPrice
        },
        plus(product){
            this.$store.dispatch('products/readd_to_cart', product)
            this.findTotal()
            this.$forceUpdate();
        },
        sub(product){
            this.$store.dispatch('products/sub_from_cart', product)
            console.log(product.quantity)
            if(product.quantity == 0){
                console.log('??????')
                this.$store.dispatch('products/remove_from_cart', product)
            }
            this.findTotal()
            this.$forceUpdate();

        },
        valid_cart(){
            this.$router.push('/cart')
        }
  	}
}
</script>
