import Vue from 'vue'
import axios from 'axios'
import VMask from 'v-mask'
import store from './store'
import {ValidationObserver} from "vee-validate";
import {ValidationProvider, extend} from 'vee-validate/dist/vee-validate.full.esm';
import {FormText, FormTextArea, FormDatePicker, FormTimePicker, FormSelect} from './components/general/formInputs';
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import routes from './routes';
import Vuetify from "vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vuetify/dist/vuetify.min.css'
import App from "./App";

Vue.use(VueRouter, VueAxios);
Vue.use(VMask);
Vue.use(Vuetify)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('FormText', FormText);
Vue.component('FormTextArea', FormTextArea);
Vue.component('FormDatePicker', FormDatePicker);
Vue.component('FormTimePicker', FormTimePicker);
Vue.component('FormSelect', FormSelect);

extend("required", {
    message: (field) => `O campo ${field} é obrigatório`,
    validate(value) {
        return {
            required: true,
            valid: ['', null, undefined].indexOf(value) === -1
        };
    },
    computesRequired: true
})

const router = new VueRouter({
    routes: routes,
    mode: 'history',
});

Vue.config.productionTip = false

let vue;
let vuetify = new Vuetify();
try {
    vue = new Vue({
        vuetify,
        router,
        store,
        axios,
        render: h => h(App),
    }).$mount('#app')

    window.onbeforeunload = async () => {
        await vue.$store.dispatch("clearLoadingState");
    }

} catch (error) {
    console.error(error);
}
export {vue}
