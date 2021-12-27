<template>
  <div id="app">
      <div class="container">
          <div class="item">
              <h1>Documents</h1>
          </div>
          <div class="item">
              <h1>Editor</h1>
          </div>
      </div>
      <div class="container">

          <Menu :name="tasks" />
          <editor v-on:clicked="testing($event)" id='myeditor'/>
      </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import editor from './components/editor'
import Menu from './components/menu'



export default {
  name: 'App',
  components: {
    editor,
    Menu
},
data() {
        return {
            tasks: [],
             // editorDatan:""
        }
},
//created() {
// Event.$on('clicked', (data) => this.tasks = data);
// },
methods: {
    testing: function(u) {
        // console.log("u"+u);
        this.tasks=u
        // console.log(this.tasks);
    }
    // ss: function(a) {
    //     this.editorData = a;
    // }
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
.container {
    display: flex;
    height: 100%;
    width: 100%;
}

.container > #myeditor {
    flex-direction:column;
    background-color: white;
    display: flex;
    width: 70%;
    margin: 1%;
}

.container > #menu {
    display: flex;
    background-color: white;
    height: 100%;
    width: 30%;
    min-height: 500px;
    margin: 1%;
    flex-direction: column;
}

.flexloop {
    display: flex;
    align-items: stretch
}

.flexbutton {
    display: flex;

}

.item {
    width: 30%;
    margin: 1%;
}

.ck-editor__editable_inline {
  min-height: 500px;
}

.toolbar {
    display: flex;
}

.button {
    background-color: #4CAF50; /* Green */
    color: white;
    /* padding: 15px 32px; */
    text-align: center;
    /* font-size: 16px; */
    border-radius: 5px;
    width: 10em;

}

.button:hover {
  background-color: #3e8e41;
}

</style>
