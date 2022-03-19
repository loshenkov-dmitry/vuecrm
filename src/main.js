/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import Vue from "vue";
import Vuelidate from "vuelidate";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import Loader from "@/components/Loader";
import Paginate from "vuejs-paginate";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(titlePlugin);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyBZEr9deB7A_napYPEfkgnq8nWVEMQS7JA",
  authDomain: "vue-ytb-f004f.firebaseapp.com",
  projectId: "vue-ytb-f004f",
  storageBucket: "vue-ytb-f004f.appspot.com",
  messagingSenderId: "555406509858",
  appId: "1:555406509858:web:c0543140a952b0ff11877b",
  measurementId: "G-JNDRQ8E4DT",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

// base.auth().onAuthStateChanged(() => {

//   if (!app) {

//   }

// });
