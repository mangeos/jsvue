<template>
  <div id="app">
      <editor id='myeditor'/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import editor from './components/editor.vue'

export default {
  name: 'App',
  components: {
    editor,
  }
}
</script>

<style>
body {
    background-color: rgba(53, 108, 144, 0.7);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px;
}

#myeditor {
    background-color: white;
}
.ck-editor__editable_inline {
  min-height: 500px;
}
.toolbar {
    display: flex;
    flex-direction: row;
}

.button {
    display: flex;
    background-color: #4CAF50; /* Green */
    color: white;
    padding: 15px 32px;
    text-align: left;
    font-size: 16px;

}

.button:hover {
  background-color: #3e8e41;
}

</style>
