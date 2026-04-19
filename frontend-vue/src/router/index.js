import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import Skills from '../pages/Skills.vue'
import Blog from '../pages/Blog.vue'
import Contact from '../pages/Contact.vue'
import Upload from '../pages/Upload.vue'
import Admin from '../pages/Admin.vue'
import About from '../pages/About.vue'
import Profile from '../pages/Profile.vue'
import Projects from '../pages/Projects.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },

  { path: '/dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/skills', component: Skills, meta: { auth: true } },
  { path: '/blog', component: Blog, meta: { auth: true } },
  { path: '/contact', component: Contact, meta: { auth: true } },
  { path: '/upload', component: Upload, meta: { auth: true } },
{ path: '/projects', component: Projects, meta: { auth: true } },
  { path: '/about', component: About, meta: { auth: true } },
{ path: '/profile', component: Profile, meta: { auth: true } },
  // 👨‍💻 ADMIN ROUTE
  { path: '/admin', component: Admin, meta: { auth: true } }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.auth && !user) {
    next('/')
  } else {
    next()
  }
})

export default router