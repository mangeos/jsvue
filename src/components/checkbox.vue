<template>
  <div class="test">
    <div style="height: 685px; width: 200px;">

      <label class="typo__label">Acceptera användare</label>
      <multiselect v-on:change="sendValues()" v-model="value" :options="options" :multiple="true"
        :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some"
        label="username" track-by="username" :preselect-first="true">
        <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen">{{ values.length }} vald användare</span></template>
      </multiselect>
    </div>
    <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: "Checkbox",
  props: {
  },
  data () {
   return {
     value: [],
     options: [
     ],
     token: this.secret
   }
},
watch: {
 // this.uploadAll();
 value: function() {
     // alert("  watcher");
     // alert(this.value)
     let temp = [];
     for (var i = 0; i < this.value.length; i++) {
         temp.push(this.value[i].username);
     }
     this.$emit('users', temp);
 }
},
  methods: {
      sendValues: function() {
          alert(this.value);
        // this.$emit('users', this.values);
      },
      getallusers: async function(tokendata) {
          await fetch('http://localhost:1338/getallusers', {
           method: 'GET', // or 'PUT'
           headers: {
             'Content-Type': 'application/json',
             'x-access-token': tokendata
           },
           body: JSON.stringify(),
         })
         .then(response => response.json())
         .then(data => {
           console.log('Success:', data);
            this.options = [];
           for (var i = 0; i < data.length; i++) {
               this.options.push({username:data[i]})
           }
           // this.$emit('users', data);
         })
         .catch((error) => {
           console.error('Error:', error);
         });
      }
  },
  components: {
      Multiselect
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style >
    .test {
    display: flex;
    justify-content: center;
    flex-direction: column;
   /* height: 384px;
*/
    }

    .height {
      height: 665px;
    }
</style>
