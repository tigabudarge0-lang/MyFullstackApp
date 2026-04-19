<template>
  <v-container>

    <h1>Dashboard</h1>
    <h3>Welcome {{ user?.name }}</h3>

    <v-btn color="red" @click="logout">Logout</v-btn>

    <hr />

    <!-- ================= PROFILE ================= -->
    <h2>👤 Profile</h2>

    <input v-model="profile.name" placeholder="Name" />
    <br /><br />

    <input v-model="profile.email" placeholder="Email" />
    <br /><br />

    <textarea v-model="profile.bio" placeholder="Bio"></textarea>
    <br /><br />

    <button @click="updateProfile">Save Profile</button>

    <hr />

    <!-- ================= PROJECT ================= -->
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

    <div v-for="p in projects" :key="p.id">
      <h3>{{ p.title }}</h3>
      <p>{{ p.description }}</p>
      <button @click="deleteProject(p.id)">Delete</button>
      <hr />
    </div>

    <hr />

    <!-- ================= CV LIST ================= -->
    <h2>📄 CV List</h2>

    <div v-for="file in cvs" :key="file">
      <p>{{ file }}</p>

      <button @click="previewCV(file)">👁 Preview</button>

      <a :href="`http://localhost:5000/uploads/${file}`" target="_blank">
        ⬇ Download
      </a>

      <button @click="deleteCV(file)">🗑 Delete</button>

      <hr />
    </div>

    <!-- ================= CV PREVIEW ================= -->
    <div v-if="selectedCV" style="margin-top:20px">
      <h3>📄 CV Preview</h3>

      <iframe
        :src="selectedCV"
        width="100%"
        height="500px"
        style="border:1px solid #ccc"
      ></iframe>
    </div>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ================= USER =================
const user = ref(JSON.parse(localStorage.getItem('user')))

// ================= PROFILE =================
const profile = ref({})

// ================= PROJECT =================
const projects = ref([])
const title = ref('')
const description = ref('')

// ================= CV =================
const cvs = ref([])
const selectedCV = ref(null)

// ================= LOAD PROFILE =================
const loadProfile = async () => {
  const userData = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(`http://localhost:5000/api/profile/${userData.id}`)
  profile.value = await res.json()
}

// ================= UPDATE PROFILE =================
const updateProfile = async () => {
  const userData = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(`http://localhost:5000/api/profile/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile.value)
  })

  const data = await res.json()
  alert(data.message)
}

// ================= LOAD PROJECTS =================
const loadProjects = async () => {
  const res = await fetch('http://localhost:5000/api/projects')
  projects.value = await res.json()
}

// ================= LOAD CVS =================
const loadCVs = async () => {
  const res = await fetch('http://localhost:5000/api/cv')
  cvs.value = await res.json()
}

// ================= CREATE PROJECT =================
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

// ================= DELETE PROJECT =================
const deleteProject = async (id) => {
  await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: 'DELETE'
  })

  loadProjects()
}

// ================= CV PREVIEW =================
const previewCV = (file) => {
  selectedCV.value = `http://localhost:5000/uploads/${file}`
}

// ================= DELETE CV =================
const deleteCV = async (file) => {
  await fetch(`http://localhost:5000/api/cv/${file}`, {
    method: 'DELETE'
  })

  loadCVs()
}

// ================= LOGOUT =================
const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}

// ================= ON LOAD =================
onMounted(() => {
  if (!user.value) {
    router.push('/')
  }

  loadProjects()
  loadCVs()
  loadProfile()
})
</script>