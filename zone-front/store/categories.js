export const state = () => ({
    categories:[
        {id:1, name:"sport", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:2, name:"outil", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:3, name:"extérieur", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:4, name:"voiture", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:5, name:"multimédia", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:6, name:"lecture", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:7, name:"décoration", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
        {id:8, name:"cuisine", image:"https://tse3.mm.bing.net/th?id=OIP.WBRxHkGradGYkGmEVdaoXwHaEK&pid=Api"},
    ],
    filteredCategories: [],
  })

export const mutations = {
  filter_category: (state, category) => {
    state.filteredCategories.push(category)
  },
  remove_filter: (state, filter) => {
    const index = state.filteredCategories.indexOf(filter)
    state.filteredCategories.splice(index,1)
  }
}


export const actions = {
  filter_category({ commit }, category) {
    commit('filter_category', category)
  },
  remove_filter({ commit }, filter) {
    commit('remove_filter', filter)
  },
}
