<template>
<div class="py-5">
  <h4 class="mt-4">Users</h4>
  <ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Dashboard</li>
    <li class="breadcrumb-item">Users View</li>
  </ol>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading users...</span>
      </div>
    </div>

    <ul class="list-group">
      <li 
        v-for="user in users" 
        :key="user.id" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="mb-2 mb-md-0">
          <strong>{{ user.name }}</strong><br />
          <small>
            <em>{{ user.username }}</em> - {{ user.email }}
          </small>
        </div>
        <div class="d-flex align-items-center">
          <span class="badge bg-secondary badge-sm">{{ user.albumCount || 0 }} Albums</span>
          <nuxt-link 
            :to="`/user/${user.id}`" 
            class="btn btn-info btn-sm ms-3 btn-smaller"
          >
            <i class="bi bi-eye"></i> View
          </nuxt-link>
        </div>
      </li>
    </ul>

    <div v-if="!loading && users.length === 0" class="alert alert-info text-center" role="alert">
      No users found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useAxios from '~/composables/useAxios';
import type { User } from '~/types/types';
const users = ref<User[]>([]);
const { get, response, loading, error } = useAxios();

const fetchUsers = async () => {
  await get('/users');
  users.value = response.value?.data;

  await Promise.all(users.value.map(async (user) => {
    const albumsResponse = await get(`/albums?userId=${user.id}`);
    user.albumCount = albumsResponse?.data.length;
  }));

  if (error.value) console.error(error.value);
};

definePageMeta({
  middleware: ['auth'],
  layout: 'custom'
});

onMounted(fetchUsers);
</script>

<style scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item:hover {
  background-color: rgba(0, 123, 255, 0.1); 
}

.badge-sm {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}

.btn-smaller {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}

@media (max-width: 576px) {
  .list-group-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .badge-sm, .btn-smaller {
    width: 100%;
    margin-top: 0.25rem;
  }
}
</style>
