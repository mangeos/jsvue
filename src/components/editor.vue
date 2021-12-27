<template>
      <div id="app">
          <div class="toolbar">
              <button class='button' v-on:click="save()" >Spara Nytt Document</button>
              <!-- <button class='button' v-on:click="uploadAll()" >show all</button> -->
              <!-- <Menu /> -->
               <multiselect v-model="value" :options="options" @select="dispatchAction"></multiselect>

               <button v-on:click="updateDoc(doc._id, editorData, value)" v-show="vissible" class="button">Uppdatera</button>
          </div>

          <!-- <div class="flexis" v-for="doc in docs" :key='doc._id'>
              <button  v-on:click="uploadOne(doc.html, doc)">
                  {{doc.title}}
              </button>
          </div> -->
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
<!-- @ready="prefill" -->

  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

  // register globally
  // Vue.component('multiselect', Multiselect)

// import Vue from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Menu from './menu.vue';

import socketIOClient from "socket.io-client";
// import VueSocketIO from 'vue-socket.io'

// const ENDPOINT = "http://localhost:1338";
const ENDPOINT = "https://jsramverk-editor-maoi19.azurewebsites.net/";

//
const socket = socketIOClient(ENDPOINT);


export default {
       name: 'editor',
       // components:{
       // Menu
   // },
       data() {
           return {
               vissible: false,
               message: String,
               editor: ClassicEditor,
               editorData: "",
               editorConfig: {
                   // The configuration of the editor.
               },
               docs: [],
               doc: Object,
               counter: 1,
               value: null,
               options: [],
               // testar: this.editorData

           };
       },
     components: { Multiselect },
     mounted: function() {
         this.uploadAll();
         // alert("mounted");

     },
        watch: {
         // this.uploadAll();
         editorData: function() {
             // alert("  watcher");

             this.textChange();
         }


     },
       methods: {
           dispatchAction(selected1){
               console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
               this.uploadAll();
               this.vissible = true;
               for (var i = 0; i < this.docs.length; i++) {
                   if (this.docs[i].title == selected1) {
                       this.editorData = this.docs[i].html;
                       this.doc.html = this.docs[i].html;
                       // this.value = selected1;
                       this.doc.title = this.docs[i].title;
                       this.doc._id = this.docs[i]._id;
                   }
                   //
                   // socket.emit("create", {
                   //     _id: this.doc._id
                   // });

               }
           },
           seta(data) {
               console.log(data);
               this.editorData = data;
               // this.updateDoc(this.doc._id, this.doc.html, this.doc.title);

           },
           textChange: function () {
               if (this.doc._id) {
                   // e.preventDefault();
                   // this.doc.html = this.editorData;
                   console.log(`sendToServer: ${this.editorData}`);

                   // socket.emit("leave", {
                   //     _id: this.doc._id
                   // });


                   socket.emit("editor", {
                       _id: this.doc._id,
                       text: this.editorData
                   });


                    socket.on("chat", this.seta);



               } else {

                   console.log("inget id");
               }
           },
           save: async function() {

               console.log(this.editorData);
               for (var i = 0; i < this.docs.length; i++) {
                   if (this.docs[i].title == 'dokument'+this.counter) {
                       this.counter = this.counter + 1;
                   }
               }
               const data = {title:'dokument'+this.counter,
                   html:this.editorData};
                   // socket.emit("create", data);
                 this.counter = this.counter+1;
               await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
                // fetch('https://localhost:1337', {
                 method: 'POST', // or 'PUT'
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(data),
               })
               .then(response => response.json())
               .then(data => {
                 console.log('Success:', data);
                 this.uploadAll();
               })
               .catch((error) => {
                 console.error('Error:', error);
               });
           },
           uploadAll: async function() {
               await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
                // fetch('https://localhost:1337', {
                 method: 'get', // or 'PUT'
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(),
               })
               .then(response => response.json())
               .then(data => {
                // console.log('Success:', data);
                this.$emit('clicked', data);
                console.log(data);
                 this.docs = data;
                 this.options = [];
                 for (var i = 0; i < data.length; i++) {
                    this.options.push(data[i].title);
                 }

               })
               .catch((error) => {
                 console.error('Error:', error);
               });
           },
           uploadOne: async function(html, doc) {
               console.log(html);
               this.doc = doc;
               this.editorData = html;
           },
           updateDoc: async function(id_, html_, titeln) {
               const data = { _id:id_, title:titeln, html:html_};

            await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
              method: 'PUT', // or 'PUT'
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
             this.uploadAll();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
           }
       }
      }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    .flexis {
        display: flex;
        gap: 5% 5%;
    }

    .my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #c4c4c4;
  }
}
</style>
