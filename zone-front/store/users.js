import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const ACTIONS = {
    ADD_USER_METHOD: 'users/add_user',
  }


export const state = () => ({
    users: [],
  })

export const mutations = {
    ADD_USER: (state, user) => {
        state.users.push(user);
        console.log('ca add ossi')
    },
}

export const actions = {
    add_user({ commit }, user) {
        console.log('ca add')
        commit('ADD_USER', user);
    },
    
    connect_user({commit}, user){
        cookies.set('current_user', user, { path: '/' });
        this.$router.push('/inspire');
    },
}