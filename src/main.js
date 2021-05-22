import Vue from 'vue'
import App from './App.vue';
import vuetify from './plugins/vuetifiy' // path to vuetify export
import {ValidationObserver} from "vee-validate";
import {ValidationProvider, extend} from 'vee-validate/dist/vee-validate.full.esm';
import 'sweetalert2/dist/sweetalert2.min.css';
import FormInputs from '@/components/general/formInputs';
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import routes from './routes';
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter, VueAxios);
Vue.use(VMask);
Vue.use(Vuetify)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('FormText', FormInputs.FormText);
Vue.component('FormTextArea', FormInputs.FormTextArea);
Vue.component('FormDatePicker', FormInputs.FormDatePicker);
Vue.component('FormTimePicker', FormInputs.FormTimePicker);
Vue.component('FormSelect', FormInputs.FormSelect);

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

extend("confirmValue", {
    message: () => "Os campos não estão iguais",
    validate(value, [confirmedValue]) {
        return value === confirmedValue;
    },
    hasTarget: true,
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
