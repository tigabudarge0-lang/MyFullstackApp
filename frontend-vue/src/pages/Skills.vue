<template>
  <div style="max-width:700px;margin:auto;padding:20px">

    <h1>Skills</h1>

    <!-- ADD SKILL -->
    <input v-model="name" placeholder="Skill name" />
    <br /><br />

    <input v-model="level" type="number" placeholder="Level (1-100)" />
    <br /><br />

    <button @click="addSkill">Add</button>

    <hr />

    <!-- SKILLS LIST -->
    <div v-for="s in skills" :key="s.id" style="margin-bottom:20px">

      <h3>{{ s.name }} - {{ s.level }}%</h3>

      <!-- PROGRESS BAR -->
      <div style="background:#ddd; height:10px; border-radius:5px;">
        <div 
          :style="{
            width: s.level + '%',
            height: '10px',
            background: 'green',
            borderRadius: '5px'
          }"
        ></div>
      </div>

      <br />

      <button @click="deleteSkill(s.id)">Delete</button>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const skills = ref([])
const name = ref('')
const level = ref('')

// GET SKILLS
const loadSkills = async () => {
  const res = await fetch('http://localhost:5000/api/skills')
  skills.value = await res.json()
}

// ADD SKILL
const addSkill = async () => {
  await fetch('http://localhost:5000/api/skills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      level: level.value
    })
  })

  name.value = ''
  level.value = ''
  loadSkills()
}

// DELETE SKILL
const deleteSkill = async (id) => {
  await fetch(`http://localhost:5000/api/skills/${id}`, {
    method: 'DELETE'
  })

  loadSkills()
}

onMounted(() => {
  loadSkills()
})
</script>