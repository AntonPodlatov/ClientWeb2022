import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";

import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";
import PhoneBook from "./phoneBook.vue";

new Vue({
    render(h) {return h(PhoneBook);}
}).$mount("#app");





