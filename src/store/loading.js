export default {
    state: {
        loading: false,
        tasksList: [],
    },
    getters: {
        loading(state) {
            return state.loading
        },
        tasksList(state) {
            return state.tasksList
        }
    },
    mutations: {
        PUSH_TASK(state) {
            state.tasksList.push(1);
            state.loading = true;
        },
        REMOVE_TASK(state) {
            state.tasksList.pop();
            state.loading == state.tasksList.length == 0 ? false : true;
        },
        CLEAR_LOADING_STATE(state) {
            state.tasksList = [];
            state.loading = false;
        },
    },
    actions: {
        pushTask({commit}) {
            commit("PUSH_TASK");
        },
        removeTask({commit}) {
            commit("REMOVE_TASK");
        },
        clearLoadingState({commit}) {
            commit("CLEAR_LOADING_STATE");
        },

    }

}