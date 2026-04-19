<template>
  <div class="layout">

    <!-- SIDEBAR -->
    <div class="sidebar">
      <h2>⚡ Admin</h2>

      <ul>
        <li @click="go('/admin')">🏠 Dashboard</li>
        <li @click="go('/projects')">📊 Projects</li>
        <li @click="go('/blog')">📝 Blog</li>
        <li @click="go('/skills')">⚡ Skills</li>
        <li @click="go('/contact')">📩 Messages</li>
        <li @click="go('/about')">👤 About</li>
        <li @click="go('/profile')">👤 Profile</li>
      </ul>

      <button @click="logout">Logout</button>
    </div>

    <!-- MAIN -->
    <div class="main">

      <!-- TOPBAR -->
      <div class="topbar">
        <h1>Dashboard</h1>

        <div class="user">
          <img src="https://i.pravatar.cc/40" />
          <span>{{ user.name }}</span>
        </div>
      </div>

      <!-- STATS -->
      <div class="grid">

        <div class="card" v-for="card in cards" :key="card.title">
          <h3>{{ card.icon }} {{ card.title }}</h3>
          <p>{{ card.value }}</p>
        </div>

      </div>

      <!-- CHART -->
      <div class="chart">
        <Bar :data="chartData" />
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

// chart
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const router = useRouter()

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const projects = ref(0)
const blogs = ref(0)
const skills = ref(0)
const messages = ref(0)

// cards
const cards = computed(() => [
  { title: 'Projects', value: projects.value, icon: '📊' },
  { title: 'Blogs', value: blogs.value, icon: '📝' },
  { title: 'Skills', value: skills.value, icon: '⚡' },
  { title: 'Messages', value: messages.value, icon: '📩' }
])

// chart
const chartData = computed(() => ({
  labels: ['Projects', 'Blogs', 'Skills', 'Messages'],
  datasets: [
    {
      label: 'Stats',
      data: [projects.value, blogs.value, skills.value, messages.value],
      backgroundColor: '#3b82f6'
    }
  ]
}))

// load API
const loadData = async () => {
  const token = localStorage.getItem('token')

  const [p, b, s, m] = await Promise.all([
    fetch('http://localhost:5000/api/projects', { headers: { 'x-auth-token': token } }),
    fetch('http://localhost:5000/api/blog', { headers: { 'x-auth-token': token } }),
    fetch('http://localhost:5000/api/skills', { headers: { 'x-auth-token': token } }),
    fetch('http://localhost:5000/api/contact', { headers: { 'x-auth-token': token } })
  ])

  projects.value = (await p.json()).length
  blogs.value = (await b.json()).length
  skills.value = (await s.json()).length
  messages.value = (await m.json()).length
}

const go = (path) => router.push(path)

const logout = () => {
  localStorage.clear()
  router.push('/')
}

onMounted(loadData)
</script>

<style>
.layout {
  display: flex;
  height: 100vh;
  font-family: Arial;
}

/* SIDEBAR */
.sidebar {
  width: 220px;
  background: #020617;
  color: white;
  padding: 20px;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
}

.sidebar li:hover {
  background: #1e293b;
}

/* MAIN */
.main {
  flex: 1;
  background: #f1f5f9;
  padding: 20px;
}

/* TOPBAR */
.topbar {
  display: flex;
  justify-content: space-between;
}

/* CARDS */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 14px;
  text-align: center;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-6px);
}

/* CHART */
.chart {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
}
</style>