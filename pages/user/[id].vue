<template>
<div class="py-5">
  <h4 class="mt-4">Albums</h4>
  <ol class="breadcrumb">
    <li class="breadcrumb-item active">Dashboard</li>
    <li class="breadcrumb-item">{{ user.name }}</li>
  </ol>
    <p class="user-email"><span class="email-text">{{ user.email }}</span></p>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading user...</span>
      </div>
    </div>

    <ul class="list-group">
      <li v-for="album in albums" :key="album.id"
        class="list-group-item d-flex justify-content-between align-items-center">
        {{ album.title }}
        <nuxt-link :to="`/album/${album.id}`" class="btn btn-info btn-sm float-end">
          <i class="bi bi-eye"></i> Photos
        </nuxt-link>
      </li>
    </ul>

    <div v-if="!loading && albums.length === 0" class="alert alert-info text-center" role="alert">
      No albums found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useAxios from '@/composables/useAxios';
import { useRoute } from 'vue-router';
import type { Album } from '~/types/types';

const route = useRoute();

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User>({
  id: 0,
  name: "",
  email: ""
});

const albums = ref<Album[]>([]);

definePageMeta({
  middleware: ['auth'],
  layout: 'custom'
});

const { get, loading, response, error } = useAxios();

onMounted(async () => {
  const userId = route.params.id as string;
  await get(`/users/${userId}`);
  user.value = response.value?.data;

  const albumsResponse = await get(`/albums?userId=${userId}`);
  albums.value = albumsResponse.data;

  if (error.value) console.error(error.value);
});
</script>

<style scoped>
.user-email {
  margin-top: 0.5rem;
}

.email-text {
  color: #007bff;
  font-weight: bold;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

@media (max-width: 576px) {
  .list-group-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .list-group-item .btn {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
