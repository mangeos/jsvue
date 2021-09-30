<template>
    <div id="menu">

        <!-- <ss @clicked='test' /> -->
        <div class="flexbutton" v-for="doc in name" :key="doc.id">
            <div class="flexrow">
                <button  v-on:click="uploadOne(doc.html)" class="nbutton">{{doc._id}}</button>
                <!-- <i @click="update()" class="fas fa-sync-alt"></i> -->
            </div>




            <!-- <button v-bind="tasks" type="button" name="button"></button> -->
        </div>
    </div>
</template>

<script>

export default {
    name: 'Menu',
    props:{
        name: Array
    },
    methods: {
        uploadOne: function() {
            console.log("funkar");
        }
    }

    }

</script>
<style >
    .flexrow {
        display: flex;
        flex-direction: row;
        gap: 5% 10%;
    }
    .nbutton {
        width: 100%;
        margin: 1%;
    }

i {
    font-size: 1.2em;

}
    i:hover {
        font-size: 1em;
    }
</style>
