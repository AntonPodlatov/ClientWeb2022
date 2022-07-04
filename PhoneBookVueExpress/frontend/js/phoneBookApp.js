import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";

import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";
import PhoneBook from "./PhoneBook.vue";

new Vue({
    render: h => h(PhoneBook)
}).$mount("#app");