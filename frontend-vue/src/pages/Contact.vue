<template>
  <div style="max-width:600px;margin:auto;padding:20px">

    <h1>Contact Me</h1>

    <input v-model="name" placeholder="Your Name" />
    <br /><br />

    <input v-model="email" placeholder="Your Email" />
    <br /><br />

    <textarea v-model="message" placeholder="Your Message"></textarea>
    <br /><br />

    <button @click="sendMessage">Send</button>

    <p>{{ status }}</p>

    <hr />

    <h2>Messages (Admin View)</h2>

    <div v-for="m in messages" :key="m.id">
      <h4>{{ m.name }} ({{ m.email }})</h4>
      <p>{{ m.message }}</p>
      <hr />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('')
const messages = ref([])

// GET MESSAGES
const loadMessages = async () => {
  const res = await fetch('http://localhost:5000/api/contact')
  messages.value = await res.json()
}

// SEND MESSAGE
const sendMessage = async () => {
  if (!name.value || !email.value || !message.value) {
    status.value = "Please fill all fields"
    return
  }

  await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      message: message.value
    })
  })

  status.value = "Message sent ✔"

  name.value = ''
  email.value = ''
  message.value = ''

  loadMessages()
}

onMounted(() => {
  loadMessages()
})
</script>