<template>
  <div style="padding:20px">

    <h1>Upload CV (PDF)</h1>

    <input type="file" accept=".pdf" @change="handleFile" />

    <p v-if="selectedName">
      Selected: {{ selectedName }}
    </p>

    <br />

    <button @click="uploadCV">
      Upload CV
    </button>

    <p>{{ message }}</p>

    <a v-if="fileUrl" :href="fileUrl" target="_blank">
      Download CV
    </a>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const file = ref(null)
const message = ref('')
const fileUrl = ref('')
const selectedName = ref('')

const handleFile = (e) => {
  file.value = e.target.files[0]
  selectedName.value = file.value?.name
}

const uploadCV = async () => {
  if (!file.value) {
    message.value = "Please select a PDF"
    return
  }

  const formData = new FormData()
  formData.append('cv', file.value)

  try {
    const res = await fetch('http://localhost:5000/api/cv/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    message.value = data.message

    fileUrl.value = `http://localhost:5000/uploads/${data.file}`
  } catch (err) {
    message.value = "Upload failed"
  }
}
</script>