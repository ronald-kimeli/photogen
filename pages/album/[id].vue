<template>
 <div class="py-5">
  <h4 class="mt-4">Photos</h4>
  <ol class="breadcrumb">
    <li class="breadcrumb-item active">Album</li>
    <li class="breadcrumb-item">{{ album.title }}</li>
  </ol>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="features-row">
      <div v-for="photo in photos" :key="photo.id" class="album-card">
        <div class="card">
          <img 
            :src="photo.thumbnailUrl" 
            :alt="photo.title" 
            class="card-img-top" 
            loading="lazy" 
          />
          <div class="card-body">
            <h5 class="card-title">{{ photo.title }}</h5>
            <nuxt-link :to="`/photo/${photo.id}`" class="btn btn-info btn-sm">
              <i class="bi bi-eye"></i> View Photo
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loadingMore" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading more photos...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import useAxios from '@/composables/useAxios';
import type { Album, Photo } from '~/types/types';

const route = useRoute();
const album = ref<Album>({ id: 0, title: '', userId: 0 });
const photos = ref<Photo[]>([]);
const loadingMore = ref(false);
const hasMorePhotos = ref(true);
let currentPage = ref(1);
const itemsPerPage = 10;

definePageMeta({
  middleware: ['auth'],
  layout: 'custom'
});

const { get, response, error, loading } = useAxios();

const fetchPhotos = async (page: number) => {
  loadingMore.value = loading.value;
  const photosResponse = await get(`/photos?albumId=${route.params.id}&_page=${page}&_limit=${itemsPerPage}`);
  
  if (photosResponse.data.length === 0) {
    hasMorePhotos.value = loading.value;
  } else {
    photos.value.push(...photosResponse.data);
  }

  loadingMore.value = loading.value;
};

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const bottom = document.documentElement.scrollHeight;

  if (scrollPosition >= bottom - 100 && !loadingMore.value && hasMorePhotos.value) {
    currentPage.value++;
    fetchPhotos(currentPage.value);
  }
};

onMounted(async () => {
  loading.value = true;
  await get(`/albums/${route.params.id}`);
  album.value = response.value?.data;
  await fetchPhotos(currentPage.value);
  window.addEventListener('scroll', handleScroll);
  loading.value = loading.value;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.features-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.album-card {
  flex: 1 1 calc(100% - 20px);
  max-width: calc(100% - 20px);
  display: flex;
}

.card {
  flex-grow: 1;
  overflow: hidden;
  border: none;
  border-radius: 15px;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  width: 100%;
  height: auto;
}

@media (min-width: 576px) {
  .album-card {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

@media (min-width: 768px) {
  .album-card {
    flex: 1 1 calc(33.33% - 20px);
    max-width: calc(33.33% - 20px);
  }
}

@media (min-width: 992px) {
  .album-card {
    flex: 1 1 calc(25% - 20px);
    max-width: calc(25% - 20px);
  }
}
</style>
