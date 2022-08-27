<template>
  <div class="form">
    <div class="center">
      <h1>Skapa Login</h1>
    </div>
    <div class="innerform">
      <form class="ss" @submit.prevent="createLogin">
        <input type="email" v-model="username" placeholder="username">
        <input v-model="password" placeholder="password" type="password">
        <input type="submit" value="Skapa">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async createLogin() {
      const { username, password } = this;
      await fetch('http://localhost:1338/auth/register', {
       method: 'POST', // or 'PUT'
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
     })
     .then(response => response.json())
        .then(data => {
       console.log(data);
       this.$emit('form2');
          this.$emit('getdata', data.token, this.username);
          this.$emit("setToken", data.token);
         // this.$emit('getdata');
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



    input[type=text], input[type=password], select {
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
