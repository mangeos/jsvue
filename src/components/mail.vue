<template>
  <div class="mail-box">

    <label for="till">To</label>
    <input v-model="till" type="text" id="till" name="till" placeholder="exempel@exempel.se, exempel@exempel.se...">

    <label for="from">From</label>
    <input v-model="from" type="text" id="from" name="from" readonly>



    <label for="subject">subject</label>
    <input v-model="sub" type="text" id="subject" name="subject" placeholder="subject" readonly>

    <label for="select">select</label>
    <select type="text" id="select" name="select">
      <option v-for="(data) in allData" :key="data" :value="data">
        {{data}}
      </option>
    
  
    </select>

    <label for="text">text</label>
    <textarea v-model="text" id="text" name="text" placeholder="Write something.." style="height:200px"></textarea>
    <button @click="test(acceptedUser)" class="bb">skicka</button>
  </div>
</template>

<script>

export default {
  name: "mail",
  
  props: ['allData','acceptedUser','token'],
  
  data() {
    return {
      till: "",
      from: "mange_9l@hotmail.com",
      sub: "Skapa konto och redigera dokument",
      text: "<a href='https://www.student.bth.se/~maoi19/editor/'>skapa konto länk</a>",
      op:""
    }
  },
methods: {
  async test(documentData){
    var e = document.getElementById("select")
    //var value = e.value;
    var text = e.options[e.selectedIndex].text;

  //  console.log(text);
   // console.log(documentData);
    for (let index = 0; index < documentData.length; index++) {
      // find corect user and add the new user in allowed_users then put request
      if (documentData[`${index}`].title == text) {
      //  console.log(documentData[`${index}`])
        let correctUserData=documentData[`${index}`];

        let doneData=correctUserData.allowed_user;
        
         var data = {
                   _id:correctUserData._id,
                   title:correctUserData.title,
                   html:correctUserData.html,
                   allowed_users:doneData
               };
               data.allowed_users.push(this.till)
            //   console.log(data);
               this.updateDocument(data);

               //console.log(data.allowed_user);
          //send data to db
      }
    }

  },
  async updateDocument(data){
     await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
          //  await fetch('http://localhost:1338/db', {
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
              this.sendMail()
            })
            .catch((error) => {
              console.error('Error:', error);
            });
  },
 /*async acceptedUser(updatedData){
       const data = {
                   _id:id_,
                   title:titeln,
                   html:html_,
                   allowed_users:this.users
               };
               console.log(this.users);

            // await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/db', {
            await fetch('http://localhost:1338/db', {
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
  },*/
  async sendMail() {
  //  alert(this.to + this.from + this.sub + this.text)
 // await fetch('http://localhost:1338/mail', {
     await fetch('https://jsramverk-editor-maoi19.azurewebsites.net/mail', {
       method: 'POST', // or 'PUT'
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({to:this.till, from:this.from, sub:this.sub, text:this.text}),
     })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
       if (data == 'Email sent') {
        //update db with new accepted user
    //    this.updateAcceptedUser();
        alert(data);
       }else{
        alert("Email error");
       }
     })
     .catch((error) => {
       console.error('Error:', error);
     });

  }
  },
};
</script>

<style scoped>
  .mail-box {
    border-radius: 5px;
      background-color: #f2f2f2;
      padding: 20px;
      height: 600px;
      width: 300px;
  }
/* Style inputs with type="text", select elements and textareas */
input[type=text], select, textarea, .bb {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
.bb {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
.bb:hover {
  background-color: #45a049;
}

</style>
