<template>
  <div class="profile">
    <h1>👤 Edit Profile</h1>

    <input v-model="user.name" placeholder="Name" />
    <input v-model="user.email" placeholder="Email" />

    <button @click="save">Save</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const save = () => {
  localStorage.setItem('user', JSON.stringify(user.value))
  alert("Saved!")
}
</script>

<style>
.profile {
  padding: 20px;
}
</style>