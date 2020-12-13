define(['store/modules/projects/state','store/modules/projects/getters','store/modules/projects/mutations','store/modules/projects/actions',],
(state, getters, mutations, actions) => {
    return {
        namespaced: true,
        state,getters,mutations,actions
    };
});