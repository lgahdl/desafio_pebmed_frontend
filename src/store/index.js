import Vue from 'vue';
import Vuex from 'vuex';
import error from './error';
import loading from './loading';
import patients from './patients';
import appointments from './appointments';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        error,
        loading,
        patients,
        appointments
    }
})

