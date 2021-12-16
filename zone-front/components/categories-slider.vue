<template>
    <div class="my-16">
        <h5 class="ml-16">
            Produits qui pourraient vous plaire :
        </h5>

        <div
            class="d-flex"
        >

            <div class="mx-auto d-flex justify-center">
                <v-btn
                height="100%"
                v-if="!this.previousPageDisable"
                @click="previousPage"
            >
                <v-icon dark >
                    mdi-arrow-left-bold
                </v-icon>
            </v-btn>
            <v-row>
                <v-col
                    v-for="category in this.categories"
                    :key="category.id"
                >
                    <v-card

                        class="mx-6"
                    >
                        <v-img
                                :src="category.image"
                                width="350px"
                                class="mx-auto"
                        ></v-img>
                        <v-card-text
                            class="text-center py-1 white--text"
                            @click="filterByCategory(category)"
                        >
                            {{category.name}}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
                <v-btn
                height="100%"
                v-if="!this.nextPageDisable"
                @click="nextPage"
            >
                <v-icon dark >
                    mdi-arrow-right-bold
                </v-icon>
            </v-btn>
            </div>

        </div>
    </div>
</template>
<script>
export default {

    data: () => ({
        page: 0,
        previousPageDisable: true,
        nextPageDisable: false,
        categories:[],
        isFiltered: false,
    }),

    computed:{
        productList () {
            return  this.$store.state.products.products
        }
    },
    methods: {

        findPaged(limit, offset){
            var nb=1;
            this.categories = []
            this.$store.state.categories.categories.forEach(element => {
                if(element.id >= offset+1 &&  nb<= limit){
                    this.categories.push(element);
                    nb++;
                }
            });
            return this.categories
        },

        previousPage(){
            if (!this.page + 1 == 1){
                this.page --
                this.findPaged(4, 4 * this.page)
                this.nextPageDisable = false
            }

            if (this.page + 1 == 1){
                this.previousPageDisable = true
            }
        },

        nextPage(){
            if (this.page + 1  <= (parseInt(this.$store.state.categories.categories.length) / 4)){
                this.page ++
                this.findPaged(4, 4 * this.page)
                this.previousPageDisable = false
            }

            if (this.page + 1 == (parseInt(this.$store.state.categories.categories.length) / 4)){
                this.nextPageDisable = true
            }
        },

        filterByCategory(category){
            this.$store.state.categories.filteredCategories.forEach( filteredCategory => {
                if (filteredCategory.name == category.name){
                    this.isFiltered = true;
                }
            });
            if (!this.isFiltered){
                var filteredProducts = this.$store.state.products.products.filter( product => product.category == category.name)
                this.$store.dispatch('categories/filter_category', category)
                this.$store.dispatch('products/filter_product_list', filteredProducts)
            }
            this.isFiltered = false;

        }
  	},
    mounted() {
        this.categories = this.findPaged(4, 4 * this.page)
    },
}
</script>
