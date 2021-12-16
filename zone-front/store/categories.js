export const state = () => ({
    categories:[],
    filteredCategories: [],
  })

export const mutations = {
  filter_category: (state, category) => {
    state.filteredCategories.push(category)
  },
  remove_filter: (state, filter) => {
    const index = state.filteredCategories.indexOf(filter)
    state.filteredCategories.splice(index,1)
  },
  add_category: (state, category) => {
    state.categories.push(category)
  }
}


export const actions = {
  filter_category({ commit }, category) {
    commit('filter_category', category)
  },
  remove_filter({ commit }, filter) {
    commit('remove_filter', filter)
  },
  add_category({ commit }, category) {
    commit('add_category', category)
  },
}
