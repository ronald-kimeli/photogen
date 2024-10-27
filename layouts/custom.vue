<template>
  <div :class="['wrapper', { 'expanded': isSidebarOpen }]" id="wrapper">
    <aside id="sidebar" :class="{ 'expand': isSidebarOpen }">
      <div class="d-flex align-items-center">
        <button class="toggle-btn" type="button" @click="toggleSidebar">
          <i :class="isSidebarOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
        </button>
        <div class="sidebar-logo">
          <nuxt-link to="/dashboard" class="text-white">PhotoGen</nuxt-link>
        </div>
      </div>
      <ul class="sidebar-nav">
        <li class="sidebar-item" :class="{ active: isActive('/dashboard') }">
          <nuxt-link to="/dashboard" class="sidebar-link" @click="isSidebarOpen = false">
            <i class="bi bi-house"></i>
            <span>Dashboard</span>
          </nuxt-link>
        </li>
        <li class="sidebar-item" :class="{ active: isActive('/users') }">
          <nuxt-link to="/users" class="sidebar-link" @click="isSidebarOpen = false">
            <i class="bi bi-person"></i>
            <span>Users</span>
          </nuxt-link>
        </li>
        <li class="sidebar-item">
          <nuxt-link class="sidebar-link" @click="showLogoutModal">
            <i class="lni lni-exit"></i>
            <span>Logout</span>
          </nuxt-link>
        </li>
      </ul>
    </aside>

    <div :class="['topnav', { 'scrolling': isScrolling }]">
      <h1 class="topnav-title">Welcome to PhotoGen</h1>
    </div>

    <main class="main flex-grow-1 p-3 mb-4">
      <NuxtPage />
    </main>

    <!-- Logout Confirmation Modal -->
    <div :class="['modal fade', { show: isLogoutModalOpen }]" @click.self="closeLogoutModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Logout</h5>
            <button type="button" class="btn-close" @click="closeLogoutModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to log out?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeLogoutModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { signOut, getAuth } from 'firebase/auth';

const auth = getAuth();
const route = useRoute();
const router = useRouter();

const isSidebarOpen = ref(false);
const isScrolling = ref(false);
const isLogoutModalOpen = ref(false);

const showLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const closeLogoutModal = () => {
  isLogoutModalOpen.value = false;
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Successfully signed out");
    await router.push('/'); 
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

function isActive(path: string) {
  return route.path === path;
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleScroll = () => {
  isScrolling.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh; 
  background-color: rgba(0, 0, 0, 0.8); 
  z-index: 1050;
  justify-content: center;
  align-items: center;
}

.modal.show {
  display: flex;
}

.modal.show {
  display: flex;
}
</style>
