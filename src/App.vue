<template>
    <div id="app">
        <div class="header">
            <!-- <div class="header-link"> -->
            <h2>Home</h2>
            <h2>Documents</h2>
            <div class="header-link">
                <button class="login-button" v-on:click="form()">login</button>
                <button class="login-button" v-on:click="formCreate()">Skapa login</button>

            </div>
            <!-- </div> -->
        </div>
        <div class="container">
            <checkbox ref="childComponentCheckbox" :secret='token' v-on:users="users" v-show="checkboxVissible" />
            <create v-show="createLogin" v-on:form2="form2()" />
            <Login ref="childComponentLogin" :secret='token' v-show="LoginVissible" v-on:form2="form2()"
                v-on:getdata="getdata" v-on:formCreate="formCreate()" />
            <editor ref="childComponentRef" :secret='token' v-show="editorVissible" v-on:clicked="getLoggedIn()"
                id='myeditor' />
        </div>
        <div class="footer">
            <p>Test</p>
        </div>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import editor from './components/editor'
import create from './components/createLogin'
import Login from './components/login'
import checkbox from './components/checkbox'


export default {
  name: 'App',
  components: {
    editor,
    Login,
    create,
    checkbox
},

data() {
        return {
            tasks: [],
            checkboxVissible: false,
            LoginVissible: false,
            createLogin: false,
            editorVissible: true,
            token:"not logged in"
             // editorDatan:""
        }
},
// updated: function() {
//     if (this.LoginVissible == true) {
//         this.editorVissible = false;
//     }
//     else if (this.LoginVissible == false) {
//             this.editorVissible = true;
//     }
//
// },

methods: {
    setToken: function (tok) {
      this.token = tok;  
    },
    getToken: function () {
        return this.token;
    },
    users: function(data) {
        this.$refs.childComponentRef.allowedUsers(data);
    },
    getdata: function(data, loggedin) {
            console.log(data);
            // alert(data)
            this.token = data;
            this.$refs.childComponentRef.checktoken(data);
            this.$refs.childComponentCheckbox.getallusers(data);
            this.$refs.childComponentRef.getLoggedInUsername(loggedin);
    },
    getLoggedIn: function() {
        // console.log("u"+u);
        this.$refs.childComponentLogin.getLoggedInUsername();

        // console.log(this.tasks);
    },
    form: function() {
        // alert("Funkar!!");
        this.LoginVissible = true;
        this.editorVissible = false;
        this.createLogin = false;
    },
    formCreate: function() {
        // alert("Funkar!!");
        this.createLogin = true;
        this.editorVissible = false;
        this.LoginVissible = false;
    },
    form2: function() {
        // alert("Funkar!!");
        this.checkboxVissible = true
        this.editorVissible = true;
        this.LoginVissible = false;
        this.createLogin = false;
        this.$refs.childComponentRef.showNav(true);
    }
}
}
</script>

<style>
*, html {
    margin:0;
    padding:0;
}
body {
    margin: 0;
    padding: 0;
    background-color: rgba(53, 108, 144, 0.7);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.header {
    display: flex;
    justify-content:space-between;
    position: absolute;
    top: 0;
    background-color: #F7F7F7;
    width: 100%;
    align-items: center;
    /* padding: 0.5%; */
}

.header-link {
    width: 10%;
    /* padding: 1%; */

    gap: 10%;
    display: flex;
    align-items: center;

}

.footer {
    position: absolute;
    bottom: 0;
    background-color: #333333;
    width: 100%;
    height: 10%;
    color: white;
}

.container {
    display: flex;
    gap: 1%;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.container > #myeditor {
    flex-direction: column;
    /* background-color: white; */
    display: flex;
    justify-content: center;
    width: 60%;
}

/* .container > #menu {
    display: flex;
    background-color: white;
    height: 100%;
    width: 30%;
    min-height: 500px;
    margin: 1%;
    flex-direction: column;
} */

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

.login-button {
    display: inline-block;
    
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: rgb(0, 0, 0);
    background-color: #F7F7F7;
    border: none;
   
}

.login-button:hover {
    color: #d9d5e6
}

</style>
