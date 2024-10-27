<template>
  <div class="py-5">
    <h4 class="mt-4">Dashboard</h4>
    <ol class="breadcrumb">
      <li class="breadcrumb-item active">Dashboard</li>
      <li class="breadcrumb-item">{{ currentUser?.displayName }}</li>
    </ol>

    <div class="analytics my-4">
      <h5>Analytics Overview</h5>
      <div class="card" v-if="!loading">
        <div class="card-body">
          <h6>Total Users: {{ totalUsers }}</h6>
          <h6>Total Albums: {{ totalAlbums }}</h6>
          <h6>Average Photos per Album: {{ averagePhotosPerAlbum }}</h6>
        </div>
      </div>
      <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCurrentUser } from 'vuefire';
import { ref, onMounted } from 'vue';
import useAxios from '@/composables/useAxios';

const currentUser = useCurrentUser();
const { get, loading, error } = useAxios();

const totalUsers = ref(0);
const totalAlbums = ref(0);
const averagePhotosPerAlbum = ref<number>(0);

definePageMeta({
  middleware: ['auth'],
  layout: 'custom'
});

const fetchAnalyticsData = async () => {
  try {
    const usersResponse = await get('/users');
    totalUsers.value = usersResponse.data.length;

    const albumsResponse = await get('/albums');
    totalAlbums.value = albumsResponse.data.length;

    const photosResponse = await get('/photos');
    const totalPhotos = photosResponse.data.length;
    averagePhotosPerAlbum.value = totalAlbums.value ? Number((totalPhotos / totalAlbums.value).toFixed(2)) : 0;
  } catch (err) {
    console.error("Error fetching analytics data: ", err);
  }
};


onMounted(fetchAnalyticsData);
</script>

<style scoped>
.analytics {
  margin-top: 20px;
}
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}
.card-body {
  padding: 20px;
}
</style>
