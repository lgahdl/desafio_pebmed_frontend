const error = {
    state: {
        error: null,
        errorMessage: null,
        errorModal: false,
    },
    getters: {
        error(state) {
            return state.error;
        },
        errorMessage(state) {
            return state.errorMessage;
        },
        errorModal(state) {
            return state.errorModal;
        }
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_ERROR_MESSAGE(state, errorMessage) {
            state.errorMessage = errorMessage;
        },
        SET_ERROR_MODAL(state, errorModal) {
            state.errorModal = errorModal
        },
    },
    actions: {
        setError({commit}, error) {
            commit("SET_ERROR", error);
        },
        setErrorMessage({commit}, errorMessage) {
            commit("SET_ERROR_MESSAGE", errorMessage);
        },
        setErrorModal({commit}, errorModal) {
            commit("SET_ERROR_MODAL", errorModal)
        },
    }
}

export default error;