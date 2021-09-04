<template>
      <div id="app">
          <div class="toolbar">
              <button class='button' v-on:click="save()" >save</button>
          </div>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
       name: 'editor',
       data() {
           return {
               editor: ClassicEditor,
               editorData: '<p>Content of the editor.</p>',
               editorConfig: {
                   // The configuration of the editor.
               }
           };
       },
       methods: {
           save: function() {
               console.log(this.editorData);
           }
       }
   }

</script>
