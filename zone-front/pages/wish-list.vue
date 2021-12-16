<template>
    <div
        class="d-flex mt-16"
    >
        <v-row
            width="70%"
            class="mr-4"
        >
            <v-col
                sm="12"
            >
                <div
                    v-for="whish in this.$store.state.products.wishList"
                    :key="whish.id"
                    class="mx-auto mb-8 drag-el mx-2 d-flex justify-center"
                    draggable
                    @dragstart="startDrag($event, whish)"
                >
                    <v-img
                        :src="whish.image"
                        max-width="500px"
                        class=" mr-4"
                    >
                    </v-img>
                    <div class="d-flex flex-column justify-center">
                        <a href="product" class=" text-decoration-none">
                            <h2 class=" py-1 white--text">
                                {{whish.brand}}
                            </h2>
                        </a>
                        <h3 class=" py-1">
                            {{whish.name}}
                        </h3>
                        <h4 class=" py-1 red--text">
                            {{whish.price}} €
                        </h4>
                    </div>
                </div>
            </v-col>
        </v-row>
        <cart></cart>
    </div>
</template>
<script>
export default{
    data: () => ({
    }),

    methods: {

  		startDrag (evt, product) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('productID', product.id)
  		},
  	},
}
</script>
