<template>
  <div class="about">
    <h1>👤 About Me</h1>

    <div class="card">
      <p><b>Name:</b> {{ user.name }}</p>
      <p><b>Email:</b> {{ user.email }}</p>
      <p><b>Role:</b> {{ user.role }}</p>

      <hr />

      <p>
        I am a fullstack developer building web applications using Vue,
        Node.js and MySQL.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: '',
  email: '',
  role: ''
})

try {
  const saved = localStorage.getItem('user')
  if (saved) {
    user.value = JSON.parse(saved)
  }
} catch (e) {
  console.log("User parse error:", e)
}
</script>

<style>
.about {
  padding: 30px;
  background: #0f172a;
  min-height: 100vh;
  color: white;
}

.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
}
</style>