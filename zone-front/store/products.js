export const state = () => ({
    products: [
        {
          id: 0, // pas besoin d'id
          brand: 'adidas',
          name: 'product Aaaa a a a aaaaaaa   aaaaaa aaaaaa',
          price: 100.8, //number
          description:'Magnifique objet que vous devez absolument avoir pour demain !',
          category:"outil",
          image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api", //Tableau
        },
        {
          id: 1,
          brand : 'nike',
          name: 'product B',
          price: 10,
          description:'Magnifique  que vous devez  avoir pour  !',
          category:"voiture",
          image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
        },
        {
          id: 3,
          brand: 'carglass',
          name: 'product C',
          price: 1000,
          description:' objet que vous  absolument avoir  demain !',
          category:"sport",
          image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
        },
        {
          id: 4,
          brand: 'adidas',
          name: 'product A',
          price: 100,
          description:'Magnifique objet que vous devez absolument avoir pour demain !',
          category:"sport",
          image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
        },
        {
          id: 5,
          brand : 'nike',
          name: 'product B',
          price: 10,
          description:'Magnifique  que vous devez  avoir pour  !',
          category:"voiture",
          image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
        },
        {
          id: 6,
          brand: 'carglass',
          name: 'product C',
          price: 1000,
          description:' objet que vous  absolument avoir  demain !',
          category:"extérieur",
          image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
        }
    ],
    filteredProducts: [],
    cartProducts: [],
    whishList: [
      {
        id: 5,
        brand : 'nike',
        name: 'product B',
        price: 10,
        description:'Magnifique  que vous devez  avoir pour  !',
        category:"voiture",
        image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
      },
      {
        id: 6,
        brand: 'carglass',
        name: 'product C',
        price: 1000,
        description:' objet que vous  absolument avoir  demain !',
        category:"extérieur",
        image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api",
      }
    ],

})

export const mutations = {
  add_to_cart: (state, product) => {
    product.quantity = 1
    state.cartProducts.push(product)
  },
  sub_from_cart: (state, product) => {
    const index = state.cartProducts.indexOf(product);
    if (index > -1) {
      state.cartProducts.splice(index, 1);
    }
  },
  readd_to_cart: (state, product) => {
    const index = state.cartProducts.indexOf(product);
    if (index > -1) {
      state.cartProducts[index].quantity += 1;
    }
  },
  add_to_wish_list: (state, product) => {
    state.whishList.push(product)
  },
  sub_from_wish_list: (state, product) => {
    const index = state.whishList.indexOf(product);
    if (index > -1) {
      state.whishList.splice(index, 1);
    }
  },
  filter_product_list: (state, products) => {
    state.filteredProducts = state.filteredProducts.concat(products)
  },
  remove_products_from_filtered_products: (state, products) => {
    products.forEach(product => {
      const index = state.filteredProducts.indexOf(product);
      if (index > -1) {
        state.filteredProducts.splice(index, 1);
      }
    });

  },
}

export const actions = {
  add_to_cart({ commit }, product) {
    commit('add_to_cart',product)
  },
  sub_from_cart({ commit }, product) {
    commit('sub_from_cart',product)
  },
  readd_to_cart({ commit }, product) {
    commit('readd_to_cart',product)
  },
  add_to_wish_list({ commit }, product) {
    commit('add_to_wish_list',product)
  },
  sub_from_wish_list({ commit }, product) {
    commit('sub_from_wish_list',product)
  },
  filter_product_list({ commit }, products) {
    commit('filter_product_list',products)
  },
  remove_products_from_filtered_products({ commit }, products) {
    commit('remove_products_from_filtered_products',products)
  },
}
