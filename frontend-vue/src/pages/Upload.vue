<template>
  <div class="upload">

    <h2>📄 Upload CV</h2>

    <div class="drop"
         @dragover.prevent
         @drop="handleDrop">

      Drag & Drop file here

    </div>

    <input type="file" accept=".pdf" @change="handleFile" />

    <p>{{ message }}</p>

    <a v-if="fileUrl" :href="fileUrl" target="_blank">
      Download CV
    </a>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const fileUrl = ref('')

const handleFile = (e) => {
  const file = e.target.files[0]
  upload(file)
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  upload(file)
}

const upload = async (file) => {
  if (!file) return

  const formData = new FormData()

  // ⚠️ MUST MATCH backend: "cv"
  formData.append('cv', file)

  try {
    const res = await fetch('http://localhost:5000/api/cv/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    message.value = data.message || "Uploaded successfully"

    fileUrl.value = `http://localhost:5000/uploads/${data.file}`
  } catch (err) {
    message.value = "Upload failed"
  }
}
</script>

<style>
.upload {
  padding: 20px;
}

.drop {
  border: 2px dashed gray;
  padding: 40px;
  text-align: center;
  margin-bottom: 10px;
}
</style>