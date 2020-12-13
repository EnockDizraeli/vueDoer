define(['store/modules/tasks/state','store/modules/tasks/getters','store/modules/tasks/mutations','store/modules/tasks/actions',],
(state, getters, mutations, actions) => {
    return {
        namespaced: true,
        state,getters,mutations,actions
    };
});