<template>
      <div id="app">
          <div class="toolbar">
              <button class='button' v-on:click="save()" >save</button>
              <button class='button' v-on:click="uploadAll()" >show all</button>
              <!-- <Menu /> -->

          </div>

          <div class="flexis" v-for="doc in docs" :key='doc'>
              <button  v-on:click="uploadOne(doc.html)">
                  {{doc.title}}
              </button>
              <button v-on:click="updateDoc(doc._id, editorData)" class="">Uppdatera befintlig dokument</button>
          </div>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Menu from './menu.vue';

export default {
       name: 'editor',
       // components:{
       // Menu
   // },
       data() {
           return {
               editor: ClassicEditor,
               editorData: String,
               editorConfig: {
                   // The configuration of the editor.
               },
               docs:Array,
               i:0,

           };
       },
       methods: {
           save: async function() {
               console.log(this.editorData);
               const data = {title:'dokument',
                   html:this.editorData};
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
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(),
               })
               .then(response => response.json())
               .then(data => {
                // console.log('Success:', data);
                this.$emit('clicked', data);

                 this.docs = data;

               })
               .catch((error) => {
                 console.error('Error:', error);
               });
           },
           uploadOne: async function(html) {
               console.log(html);
               this.editorData = html;
           },
           updateDoc: async function(id_, html_) {
               const data = { _id:id_, title:id_, html:html_};

            fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
              method: 'PUT', // or 'PUT'
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
           }
       }
      }

</script>

<style>
    .flexis {
        display: flex;
        gap: 5% 5%;
    }
</style>
