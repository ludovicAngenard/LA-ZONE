export const state = () => ({
    products: [],
    filteredProducts: [],
    cartProducts: [],
    wishList: [],

})

export const mutations = {
  add_to_products: (state, product) => {
    state.products.push(product)
  },
  add_to_cart: (state, product) => {
    product.quantity = 1
    state.cartProducts.push(product)
  },
  remove_from_cart: (state, product) => {
    const index = state.cartProducts.indexOf(product);
    if (index > -1) {
      state.cartProducts.splice(index, 1);
    }
  },
  sub_from_cart: (state, product) => {
    const index = state.cartProducts.indexOf(product);
    if (index > -1) {
      state.cartProducts[index].quantity --;
    }
  },
  readd_to_cart: (state, product) => {
    const index = state.cartProducts.indexOf(product);
    if (index > -1) {
      state.cartProducts[index].quantity += 1;
    }
  },
  add_to_wish_list: (state, product) => {
    state.wishList.push(product)
  },
  sub_from_wish_list: (state, product) => {
    const index = state.wishList.indexOf(product);
    if (index > -1) {
      state.wishList.splice(index, 1);
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

  add_to_products({ commit }, product) {
    commit('add_to_products',product)
  },
  add_to_cart({ commit }, product) {
    commit('add_to_cart',product)
  },
  sub_from_cart({ commit }, product) {
    commit('sub_from_cart',product)
  },
  remove_from_cart({ commit }, product) {
    commit('remove_from_cart',product)
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
