<template>
    <div id="app">
        <div class="header">
            <!-- <div class="header-link"> -->
            <h2 style="padding: 20px; font-family: 'Cedarville Cursive', cursive;">Home</h2>
            <h2 style="padding: 20px; font-family: 'Cedarville Cursive', cursive;">Documents</h2>

            <div v-if="this.token == 'not logged in'" class="header-link">
                <button style="background-color: #f4f4f4;" class="login-button" v-on:click="form()">Logga in</button>
                <button style="background-color: #f4f4f4;" class="login-button" v-on:click="formCreate()">Skapa
                    Konto</button>

            </div>
            <div v-if="this.token != 'not logged in'" class="header-link">
                <button style="background-color: #f4f4f4;" class="login-button" v-on:click="reload()">Logga ut</button>
            </div>
            <!-- </div> -->
        </div>

        <div class="container">
            <checkbox ref="childComponentCheckbox" :secret='token' v-on:users="users" v-show="checkboxVissible" />
            <create v-show="createLogin" v-on:form2="form2()" v-on:setToken=setToken v-on:getdata="getdata" />
            <Login ref="childComponentLogin" :secret='token' v-show="LoginVissible" v-on:form2="form2()"
                v-on:getdata="getdata" v-on:formCreate="formCreate()" />
            <editor ref="childComponentRef" :secret='token' v-show="editorVissible" v-on:clicked="getLoggedIn()"
              v-on:setAllData="setAllData"  id='myeditor' />
              <mail v-if="this.token != 'not logged in'"  :allData ="allData" :acceptedUser="acceptedUser" :token="token"/>
              
                
        </div>
        <div class="footer">
            <ul>
                <li><a href="https://jsramverk.se">Jsramverk</a></li>
                <li><a href="mailto:mange.ostling@gmail.com">Email</a></li>
                <li><a href="https://github.com/mangeos">Github</a></li>
                <li><a href="https://dbwebb.se/kurser/jsramverk-v1">Dbwebb</a></li>
                <li>
                    <p>👋</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import editor from './components/editor'
import create from './components/createLogin'
import Login from './components/login'
import checkbox from './components/checkbox'
import mail from './components/mail'


export default {
  name: 'App',
  components: {
    editor,
    Login,
    create,
    checkbox,
    mail
},

data() {
        return {
            tasks: [],
            checkboxVissible: false,
            LoginVissible: false,
            createLogin: false,
            editorVissible: true,
            token:"not logged in",
            allData: [],
            acceptedUser: []
            //username: this.$refs.childComponentLogin.getLoggedInUsername() || "test"
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
    setAllData: function (data) {
        this.allData = [];
        for (let index = 0; index < data.length; index++) {
          this.allData.push(data[`${index}`].title);
        }
        this.acceptedUser = data;
    },
    reload: function () {
        window.location.reload();  
    },
    setToken: function (tok) {
       // alert(tok);
      this.token = tok;  
    },
    getToken: function () {
        return this.token;
    },
    users: function(data) {
        this.$refs.childComponentRef.allowedUsers(data);
    },
    getdata: function(data, loggedin) {
        console.log(loggedin+" : "+"test");
            // alert(data)
            this.token = data;
            this.$refs.childComponentRef.getLoggedInUsername(loggedin);
            this.$refs.childComponentRef.checktoken(data);
            this.$refs.childComponentCheckbox.getallusers(data);
           // alert(data)
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
    background-color:white;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    overflow: hidden;
    position: absolute;
    width: 100%;
    flex-direction: column;
    display: flex;
    
    align-items: center;

}
/*
.header {
    display: flex;
    justify-content:space-between;
    position: absolute;
    top: 0;
    background-color: #F7F7F7;
    width: 100%;
    align-items: center;

}
@media screen and (max-width: 1600px) {
    #app {
        display: flex;
        flex-direction: column;

            font-family: Avenir, Helvetica, Arial, sans-serif;
                overflow: hidden;
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center
    }
}
        */

.header {
    width: 100%;

    display: flex;
   
    justify-content: space-between;
   
    background-color: #f4f4f4;
    -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
    
}

.header-link {
   
    padding: 20px; 

    gap: 10%;
    display: flex;
    

}

.footer {
   
    background-color: #333333;
    width: 100%;
    height:250px;
    color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    
}
.footer .con {
    max-width: 1170px;
    display: flex;
    min-width: 700px;
    /*align-items: center;
    justify-content: center;
    */
}
/*-------------------------------------------------------------*/
ul {
    display: inline-grid;
    grid-auto-flow: row;
    grid-gap: 24px;
    justify-items: center;
    margin: auto;
    list-style-type: none;
}

@media (min-width: 500px) {
    ul {
        grid-auto-flow: column;
        list-style-type: none;
    }
}

a {
    color: white;
    text-decoration: none;
    box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
}

a:hover {
    box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
}

li:last-child {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

li:hover~li p {
    animation: wave-animation 0.3s infinite;
}

/*-------------------------------------------------------------*/
.container {
    display: flex;
    gap: 60px;
    padding-top: 60px;
    padding-bottom: 60px;
    min-height: 600px;
    justify-content: center;
    width: 100%;
}

.container > #myeditor {
    flex-direction: column;
        max-width: 700px;
    /* background-color: white; */
    display: flex;
    justify-content: center;
   /* width: 60%;*/
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
    padding: 15px 32px;
    text-align: center;
    font-size: 16px;
    border: 0px;
    border-radius: 5px;    
    cursor: pointer;
    width: 10em;

}

.button-blue {
    background-color: #008CBA;
        /* Green */
        color: white;
        padding: 15px 32px;
        text-align: center;
        font-size: 16px;
        border: 0px;
        border-radius: 5px;
        cursor: pointer;
        width: 10em;
}

.button-blue:hover {
  background-color: #036a8d;
}
.button:hover {
    background-color: #3e8e41;
}
.login-button { 
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: rgb(0, 0, 0);
    background-color: white;
    border: none;
    width: 60%;
   
}

.login-button:hover {
    color: #d9d5e6
}

</style>
