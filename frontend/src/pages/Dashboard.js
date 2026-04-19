<template>
  <v-container style="max-width:800px">

    <h1>Dashboard</h1>

    <h3>Welcome {{ user?.name }}</h3>

    <!-- 🔥 PORTFOLIO MENU -->
    <h2>Portfolio Menu</h2>

    <v-btn color="blue" class="mr-2" @click="goCV">
      CV
    </v-btn>

    <v-btn color="green" class="mr-2" @click="goSkills">
      Skills
    </v-btn>

    <v-btn color="purple" class="mr-2" @click="goBlog">
      Blog
    </v-btn>

    <v-btn color="orange" class="mr-2" @click="goContact">
      Contact
    </v-btn>

    <hr />

    <!-- CV BUTTON -->
    <v-btn color="blue" class="mr-2" @click="goCV">
      Upload / View CV
    </v-btn>

    <v-btn color="red" @click="logout">
      Logout
    </v-btn>

    <hr />

    <h2>Create Project</h2>

    <input v-model="title" placeholder="Project title" />
    <br /><br />

    <textarea v-model="description" placeholder="Project description"></textarea>
    <br /><br />

    <v-btn color="green" @click="createProject">
      Add Project
    </v-btn>

    <hr />

    <h2>Projects</h2>

    <div 
      v-for="p in projects" 
      :key="p.id"
      style="border:1px solid #ddd; padding:10px; margin-bottom:10px; border-radius:8px;"
    >
      <h3>{{ p.title }}</h3>
      <p>{{ p.description }}</p>

      <button @click="deleteProject(p.id)">Delete</button>
    </div>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref(null)
const projects = ref([])

const title = ref('')
const description = ref('')

// SAFE LOAD USER
user.value = JSON.parse(localStorage.getItem('user'))

// NAVIGATION FUNCTIONS
const goCV = () => router.push('/cv')
const goSkills = () => router.push('/skills')
const goBlog = () => router.push('/blog')
const goContact = () => router.push('/contact')

// GET PROJECTS
const loadProjects = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/projects')
    projects.value = await res.json()
  } catch (err) {
    console.log(err)
  }
}

// CREATE PROJECT
const createProject = async () => {
  await fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      description: description.value
    })
  })

  title.value = ''
  description.value = ''
  loadProjects()
}

// DELETE PROJECT
const deleteProject = async (id) => {
  await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: 'DELETE'
  })

  loadProjects()
}

// LOGOUT
const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}

onMounted(() => {
  loadProjects()
})
</script>