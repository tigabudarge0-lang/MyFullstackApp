<template>
  <div style="padding:20px">
    <h1>Login</h1>

    <input v-model="email" placeholder="Email" />
    <br /><br />

    <input v-model="password" type="password" placeholder="Password" />
    <br /><br />

    <button @click="login">Login</button>

    <p style="color:red">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      message.value = data.message || 'Login failed'
      return
    }

    // SAVE USER + TOKEN
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)

    // REDIRECT
    if (data.user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }

  } catch (err) {
    message.value = 'Server error'
  }
}
</script>