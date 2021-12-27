import Vue from 'vue'
import App from './App.vue'
import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.use( CKEditor );




// import socketIOClient from "socket.io-client";
// // import VueSocketIO from 'vue-socket.io'
//
// const ENDPOINT = "http://localhost:1338";
// //
// const socket = socketIOClient(ENDPOINT);
//
// // Vue.use( socket);
//
//
// // socket.on("salutations", function(ss) {
// //     let data = {data:"sdsdsdsa"};
// //     socket.emit("create", data);
// //     console.log(ss);
// // });
//
//
// let data = {
//     _id: "LÅNG OCH SLUMPAT",
//     html: "Texten i html format från editorn"
// };
//
// socket.emit("create", data);


Vue.config.productionTip = false

window.Event = new Vue({
  render: h => h(App),
}).$mount('#app')
