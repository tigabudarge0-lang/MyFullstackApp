<template>
  <div style="max-width:700px;margin:auto;padding:20px">

    <h1>Blog</h1>

    <!-- ADD BLOG -->
    <input v-model="title" placeholder="Title" />
    <br /><br />

    <textarea v-model="content" placeholder="Content"></textarea>
    <br /><br />

    <button @click="addPost">Add Post</button>

    <hr />

    <!-- BLOG LIST -->
    <div 
      v-for="b in blogs" 
      :key="b.id"
      style="
        border:1px solid #ddd;
        padding:10px;
        margin-bottom:10px;
        border-radius:8px;
      "
    >

      <h3>{{ b.title }}</h3>
      <p>{{ b.content }}</p>

      <button @click="deletePost(b.id)">Delete</button>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const blogs = ref([])
const title = ref('')
const content = ref('')

// GET BLOGS
const loadBlogs = async () => {
  const res = await fetch('http://localhost:5000/api/blog')
  blogs.value = await res.json()
}

// ADD BLOG
const addPost = async () => {
  if (!title.value || !content.value) {
    alert("Please fill all fields")
    return
  }

  await fetch('http://localhost:5000/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      content: content.value
    })
  })

  title.value = ''
  content.value = ''

  loadBlogs()
}

// DELETE BLOG
const deletePost = async (id) => {
  await fetch(`http://localhost:5000/api/blog/${id}`, {
    method: 'DELETE'
  })

  loadBlogs()
}

onMounted(() => {
  loadBlogs()
})
</script>