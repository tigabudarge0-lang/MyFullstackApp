<template>
  <div class="container">
    <h1>📊 Projects CRUD</h1>

    <!-- ADD PROJECT -->
    <div class="add-box">
      <input v-model="title" placeholder="Title" />
      <input v-model="desc" placeholder="Description" />
      <button @click="addProject">➕ Add</button>
    </div>

    <!-- PROJECT LIST -->
    <div v-for="p in projects" :key="p.id" class="card">

      <!-- NORMAL VIEW -->
      <div v-if="editId !== p.id">
        <h3>{{ p.title }}</h3>
        <p>{{ p.description }}</p>

        <button @click="startEdit(p)">✏️ Edit</button>
        <button @click="deleteProject(p.id)">🗑️ Delete</button>
      </div>

      <!-- EDIT MODE -->
      <div v-else>
        <input v-model="editTitle" />
        <input v-model="editDesc" />

        <button @click="updateProject(p.id)">💾 Save</button>
        <button @click="cancelEdit">❌ Cancel</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])

// ADD
const title = ref('')
const desc = ref('')

// EDIT
const editId = ref(null)
const editTitle = ref('')
const editDesc = ref('')

// LOAD PROJECTS
const loadProjects = async () => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch('http://localhost:5000/api/projects', {
      headers: { 'x-auth-token': token }
    })

    const data = await res.json()
    console.log("Projects:", data)

    projects.value = data
  } catch (err) {
    console.log(err)
  }
}

// ADD PROJECT
const addProject = async () => {
  try {
    const token = localStorage.getItem('token')

    await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({
        title: title.value,
        description: desc.value
      })
    })

    title.value = ''
    desc.value = ''
    loadProjects()
  } catch (err) {
    console.log(err)
  }
}

// DELETE PROJECT
const deleteProject = async (id) => {
  try {
    const token = localStorage.getItem('token')

    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token }
    })

    loadProjects()
  } catch (err) {
    console.log(err)
  }
}

// START EDIT
const startEdit = (p) => {
  editId.value = p.id
  editTitle.value = p.title
  editDesc.value = p.description
}

// CANCEL EDIT
const cancelEdit = () => {
  editId.value = null
}

// UPDATE PROJECT
const updateProject = async (id) => {
  try {
    const token = localStorage.getItem('token')

    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({
        title: editTitle.value,
        description: editDesc.value
      })
    })

    editId.value = null
    loadProjects()
  } catch (err) {
    console.log(err)
  }
}

// INIT
onMounted(loadProjects)
</script>

<style>
.container {
  padding: 20px;
  background: #0f172a;
  min-height: 100vh;
  color: white;
}

/* ADD BOX */
.add-box {
  margin-bottom: 20px;
}

.add-box input {
  margin-right: 10px;
  padding: 8px;
}

/* CARD */
.card {
  background: #1e293b;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
}

/* BUTTON */
button {
  margin-right: 10px;
  margin-top: 10px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>