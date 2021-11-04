export const ACTIONS = {
    ADD_USER_METHOD: 'users/add_user',
  }


export const state = () => ({
    user:{},
  })

export const mutations = {
    ADD_USER: (state, user) => {
        state.user = user
    },
}

export const actions = {
    onAuthStateChangedAction({commit},{authUser}){
        if (authUser != null){
            const {uid, email} = authUser;
            commit('ADD_USER',{uid, email});
        }
        
    }
}
 