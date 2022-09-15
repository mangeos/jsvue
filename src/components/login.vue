<template>
  <div class="form">
    <div class="center">
      <h1>Login</h1>
    </div>
    <div class="innerform">
      <form class="ss" @submit.prevent="login">
        <input type="email" v-model="username" placeholder="username">
        <input v-model="password" placeholder="password" type="password">
        <input type="submit" value="log in">
      </form>
    </div>
    <div class="innerform">
      <button class="login-button ss" v-on:click="formCreate()">Skapa Konto</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  props:{secret:String},
  data() {
    return {
      username: "",
      password: "",

    };
},
  methods: {
      getLoggedInUsername: function() {
          return this.username;
      },
      formCreate: function() {
          // alert("Funkar!!");
        this.$emit("formCreate");
      },
    async login() {
      const { username, password } = this;
       await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/auth/login', {
      //await fetch('http://localhost:1338/auth/login', {
       method: 'POST', // or 'PUT'
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
     })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
       if (data.msg == "Login success") {

         console.log(data.msg);
         alert(`Inloggad: ${data.msg}`);
            this.$emit('form2');
            this.$emit('getdata', data.token, this.username);
         this.$emit('setToken', data.token);
       } else {
           alert(data.msg)
       }
       // this.uploadAll();
     })
     .catch((error) => {
       console.error('Error:', error);
     });

    }
  }
};
</script>
<style >
    .center {
        display: flex;
        justify-content: center;
    }
    .ss {
        flex-direction: column;
    display: flex;
    width: 100%;
    /* justify-items: center; */
    justify-content: center;
    padding: 0 25%;
    }
    .form {
        /* flex-direction: column; */
    /* background-color: #f2f2f2; */
    /* display: flex; */
    /* flex-direction: column; */
    /* background-color: white; */
    /* display: flex; */
    /* justify-content: center; */
    /* width: 60%; */
    flex-direction: column;
    /* background-color: white; */
    display: flex;
    justify-content: center;
    width: 60%;
    }

    .innerform {
        
    background-color: white;
    /* padding: 5em 20em; */
    justify-content: center;
    display: flex;
    
    }

    input[type=email], input[type=password], select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type=submit] {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #45a049;
    }

</style>
