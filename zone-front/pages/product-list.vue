<template>
<div>
    <div style="width: 30%;"  class="v-input mx-auto mt-2 v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--is-booted v-text-field--enclosed v-text-field--placeholder  rounded-lg" data-v-7f162986="">
        <div class="v-input__control">
            <div class="v-input__slot grey lighten-3">
                <div class="v-text-field__slot">
                    <input autocomplete="off" role="button" aria-haspopup="true" aria-expanded="false" id="input-21" placeholder="Recherchez un article ..." type="text" value="">
                </div>
                <div class="v-input__prepend-inner">
                    <span aria-hidden="true" class="v-icon notranslate ml-1 mr-2 theme--light grey--text" data-v-7f162986="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg">
                            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z">
                            </path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div
        v-if="this.$store.state.categories.filteredCategories.length != 0"
    >
        <v-chip
            v-for="filter in this.$store.state.categories.filteredCategories"
            :key="filter.id"
            class="ma-2"
            close
            @click:close="removeFilter(filter)"
        >
            {{filter.name}}
        </v-chip>
    </div>
    <div class="d-flex">
        <v-row
            no-gutters
            style="width: 70%;"
            class="mt-16"
        >

            <v-col
                v-for="product in findSaleList()"
                :key="product.name"
                sm="4"
            >
                <v-card
                class="mx-auto mb-8 drag-el mx-2"
                width="70%"
                draggable
                @dragstart="startDrag($event, product)"
                >
                    <v-img
                        :src="product.images[0]"
                        width="100%"
                        height="200px"
                        class="mx-auto"
                    ></v-img>
                    <img
                        v-on:click="toggle_wish($event, product)"
                        class="mt-2 ml-2"
                        width="30px"
                        :src="isInWishList(product)"

                    />
                        <a href="product" class=" text-decoration-none"><h4 class="text-center py-1 white--text">
                            {{ product.brand}}
                        </h4></a>
                        <v-card-text class="text-center py-1">
                            {{product.name}}
                        </v-card-text>
                        <h4 class="text-center py-1 red--text">
                            {{product.price}} €
                        </h4>
                </v-card>
            </v-col>
        </v-row>
        <cart></cart>
    </div>
    <categories-slider ></categories-slider>
</div>
</template>

<script>
import heart_fill from '../assets/images/heart_fill.png'
import heart_empty from '../assets/images/heart_empty.png'
import categoriesSlider from '../components/categories-slider.vue'

export default {
  components: { categoriesSlider },

    data: () => ({
        isClicked: false,
        page: 0,
        previousPageDisable: true,
        nextPageDisable: false,
        categories:[],
    }),
    async created() {
        const productsRef = await this.$fire.firestore
            .collection("products");

        const cartRef = await this.$fire.firestore
            .collection("cart")
            .where("userId", "==", this.$fire.auth.currentUser.uid);

        const categoriesRef = await this.$fire.firestore
            .collection("categories")

        try {
            const productDoc = await productsRef.get();
            productDoc.forEach((product) => {
                this.$store.dispatch('products/add_to_products', product.data() )
            });
        } catch (e) {
            console.log(e);
        }

        try {
            const cartDoc = await cartRef.get();
            cartDoc.forEach((product) => {
                this.$store.dispatch('products/add_to_cart', product.data() )
            });

        } catch (e) {
            console.log(e);
        }

        try {
            const categoriesDoc = await categoriesRef.get();
            categoriesDoc.forEach((category) => {
                this.$store.dispatch('categories/add_category', {...category.data(), 'id':category.id} )
            });
            console.log(this.$store.state.categories.categories)
        } catch (e) {
            console.log(e);
        }


    },
    methods: {

  		startDrag (evt, product) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('productID', product.name)
  		},

        toggle_wish(evt, product){
            if (evt.target.src.split('/')[evt.target.src.split('/').length -1] == 'heart_empty.png'){
                this.$store.dispatch('products/add_to_wish_list', product )
                evt.target.src = heart_fill
                // const wish = {
                //     userId: this.$fire.auth.currentUser.uid,
                //     brand: product.brand,

                // }
                // const whishRef = await this.$fire.firestore
                //     .collection("wishes")
                //     .where("userId", "==", this.$fire.auth.currentUser.uid);

                // try {
                //     await whishRef.update(wish);
                // } catch (e) {
                //     console.error(e);
                // }
            } else {
                this.$store.dispatch('products/sub_from_wish_list', product )
                evt.target.src = heart_empty
            }
        },
        findSaleList(){
            if (this.$store.state.categories.filteredCategories.length != 0){
                return this.$store.state.products.filteredProducts
            } else {
                return this.$store.state.products.products
            }

        },
        removeFilter(filter){
            var filteredProducts = this.$store.state.products.products.filter( product => product.category == filter.id)
            this.$store.dispatch('categories/remove_filter', filter)
            this.$store.dispatch('products/remove_products_from_filtered_products', filteredProducts)
        },
        isInWishList(product){
            this.$store.state.products.wishList.forEach(whish => {
                if (whish == product){
                    return heart_fill
                }
            });
            return heart_empty
        }

  	},
}
</script>
