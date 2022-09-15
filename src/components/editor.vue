<template>
    <div id="app">
        <div v-show="showNavVissible" class="toolbar">
            <!-- <button class='button' v-on:click="uploadAll()" >show all</button> -->
            <!-- <Menu /> -->
            <multiselect v-model="value" :options="options" @select="dispatchAction"></multiselect>

        </div>

        <ckeditor contenteditable="true" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <div style=" display: flex; gap: 20px; padding-top: 20px;" v-show="showNavVissible">
            <button class='button' v-on:click="save()">Spara Nytt</button>
            <button v-on:click="updateDoc(doc._id, editorData, value)" v-show="vissible"
                class="button-blue">Uppdatera</button>
            <button class="button" v-on:click="contactUser()">Visa/stäng kontakt lista</button>
            <button class="button" v-on:click="createPdf()">pdf</button>
        <!-- Write your comments here   <button v-on:click="highlight('yellow')" >comment</button>-->
        </div>
        <div style="padding:20px;background-color: #333333; border-radius: 5px;margin-top: 30px;"
            v-if="this.part === true " class="">
            <h2 style="color:white">Kontakter</h2>
            <hr>
            <li style="" v-for="(user) in this.allUsers" :key="user">
                <a :href="'mailto:'+user">{{user}}</a><br>

            </li>
        </div>
    </div>
</template>

 

<script>

import Multiselect from 'vue-multiselect'

  // register globally
  // Vue.component('multiselect', Multiselect)
import html2canvas from 'html2canvas';
// import Vue from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Menu from './menu.vue';
//import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import socketIOClient from "socket.io-client";
// import VueSocketIO from 'vue-socket.io'
import { jsPDF } from "jspdf";
//const ENDPOINT = "http://localhost:1338";
const ENDPOINT = "https://jsramverk-editor-maoi19.azurewebsites.net/";

//
const socket = socketIOClient(ENDPOINT);

// imoort pdf
//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
// const { PDFDocument, StandardFonts, rgb } = PDFLib

// Plugins to include in the build.
//ClassicEditor.builtinPlugins = [Comments];

export default {
       name: 'editor',
       // components:{
       // Menu
   // },
       data() {
           return {
               showNavVissible: false,
               vissible: false,
               message: String,
               editor: ClassicEditor,
               editorData: "",
               editorConfig: {
                   // The configuration of the editor.
                   

               },
               docs: [],
               alldata: [],
               doc: Object,
               counter: 1,
               value: null,
               options: [],
               // testar: this.editorData
               token: this.$emit('getToken'),
               users: [],
               loggedInUser:String,
               allUsers:[],
               part: false

           };
       },
    //   props: {
      //     secret: String
     //  },
       components: {
           Multiselect
       },
       /*
        updated(){
            if (!(this.token == "not logged in")) {
                this.uploadAll();
            }
        },*/
     mounted: function() {
         // alert(this.token1)
         if (!(this.token == "not logged in")) {
             this.uploadAll();
            // alert("uploadAll");
         }
     },
        watch: {
         // this.uploadAll();
         editorData: function() {
             // alert("  watcher");
             this.textChange();
         }
     },
       methods: {
        allData:function () {
          return this.allData  
        },


        comment: function () {
           var range=window.getSelection().getRangeAt(0)
           let span= document.createElement("span")
           span.style.backgroundColor="yellow";
           span.appendChild(range.extractContents())
           range.insertNode(span)
           alert(range)



       /*  var span = document.createElement("span");
        span.style.backgroundColor = "yellow";

        if (window.getSelection) {
            var sel = window.getSelection();
            console.log(sel.rangeCount);
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0).cloneRange();
                console.log(range);
                range.surroundContents(span);
           //     sel.removeAllRanges();
                sel.addRange(range);
            }
        }
        //html.style.color="red";  
        */
        },
        makeEditableAndHighlight: function(colour) {
    var sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        var range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
},

highlight :function (colour) {
    var range;
    if (window.getSelection) {
        // IE9 and non-IE
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                this.makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            this.makeEditableAndHighlight(colour)
        }
    } else if (document.selection && document.selection.createRange) {
        // IE <= 8 case
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    }
},



        
         createPdf: async function(){
            var myEditor = document.getElementsByClassName("ck-editor__main")[0]
            html2canvas(myEditor).then(function(canvas) {
                let img = canvas.toDataURL("image/jpeg",1);
                    let pdf = new jsPDF();
                    pdf.addImage(img,"jpeg",5,5,205,292);
                    pdf.save("file.pdf");
  //  document.body.appendChild(canvas);
});
      
        },
           showNav(data){
               this.showNavVissible = data;
           },
           allowedUsers(data){
               this.users = data;
           },
           checktoken(data){
               this.token = data;
               this.uploadAll();
           },
           dispatchAction(selected1){
               // console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
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
               // console.log(data);
               this.editorData = data;
               // this.updateDoc(this.doc._id, this.doc.html, this.doc.title);

           },
           textChange: function () {
               if (this.doc._id) {
                   // e.preventDefault();
                   // this.doc.html = this.editorData;
                   // console.log(`sendToServer: ${this.editorData}`);

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
               this.checkAcceptedUsername();

               // this.$emit('users');
               // console.log(this.editorData);
               for (var i = 0; i < this.alldata.length; i++) {
                   if (this.alldata[i].title == this.loggedInUser +"-"+'dokument'+this.counter) {
                       this.counter = this.counter + 1;
                   }
               }

               const data = {
                   title: this.loggedInUser+"-"+'dokument'+this.counter,
                   html:this.editorData,
                   allowed_users: this.users
               };
                   // socket.emit("create", data);
                 this.counter = this.counter+1;
                await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
              //  await fetch('http://localhost:1338/db', {
                 method: 'POST', // or 'PUT'
                 headers: {
                     'Content-Type': 'application/json',
                     'x-access-token': this.token
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
           getLoggedInUsername: function (data) {
           // alert(data);
             this.loggedInUser = data;
           },
           uploadAll: async function() {
               await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
            //await fetch('http://localhost:1338/db', {
                 method: 'get', // or 'PUT'
                 headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.token,
                    'loggedInUser': this.loggedInUser
                   
                 },
                 body: JSON.stringify(),
               })
               .then(response => response.json())
               .then(data => {
                console.log(data);
                this.$emit("setAllData",data)
                this.alldata = data;

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
           checkAcceptedUsername: function() {
               if (this.users < 1) {
                   this.users.push(this.loggedInUser);
               } else {
                   //lägg till alla valda användare + inloggad användare
                   //kolla om inloggad användare redan är vald eller inte

                   if(this.users.includes(this.loggedInUser) == false){

                       this.users.push(this.loggedInUser);
                       }
               }
           },
           uploadOne: async function(html, doc) {
               // console.log(html);
               this.doc = doc;
               this.editorData = html;
           },
           updateDoc: async function(id_, html_, titeln) {

            this.checkAcceptedUsername();

            // for (var i = 0; i < this.alldata.length; i++) {
            //     if (this.alldata[i].title == 'dokument'+this.counter) {
            //         this.counter = this.counter + 1;
            //     }
            // }


               const data = {
                   _id:id_,
                   title:titeln,
                   html:html_,
                   allowed_users:this.users
               };
               console.log(this.users);

             await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
            //await fetch('http://localhost:1338/db', {
              method: 'PUT', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.token
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
           contactUser: async function(){
               this.allUsers = [];
                // await fetch('http://localhost:1338/graphql', {
                 await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/graphql', {
                   method: 'post',
                   headers: {
                       'Content-Type': 'application/json',
                       'Accept': 'application/json',
                   },
                   body: JSON.stringify({ query: "{ documents { username } }" })
               })
                   .then(r => r.json())
                   .then(data => {
                       console.log(data.data.documents);
                       data.data.documents.forEach(element => {
                           // console.log(element.username);
                           this.allUsers.push(element.username);
                        });
                       this.part = !this.part;
                      
                   }    
               )
                   .catch(error => {console.log(error)})
           }
 }
   }

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');
    /* .flexis {
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
*/
</style>
