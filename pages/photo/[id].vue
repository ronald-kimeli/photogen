<template>
  <div class="py-5">
    <h4 class="mt-4">Photo</h4>
    <ol class="breadcrumb">
      <li class="breadcrumb-item active">Dashboard</li>
      <li class="breadcrumb-item">Photo view and title update</li>
    </ol>
    <h4 class="mt-4">{{ photo.title }}</h4>
    <div v-if="axiosLoading && !loadingTitle" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div class="image-container text-center mb-3">
        <img 
          v-if="photo.thumbnailUrl" 
          :src="photo.thumbnailUrl" 
          alt="Photo" 
          class="img-fluid rounded shadow" 
        />
        <div v-else class="text-center my-4">Image not available.</div>
      </div>

      <div class="mb-3">
        <input v-model="editedTitle" type="text" class="form-control" placeholder="Edit photo title" />
      </div>
      <div class="mb-3">
        <button @click="updatePhotoTitle" class="btn btn-primary w-100" :disabled="loadingTitle">
          <span v-if="loadingTitle" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Update Title
        </button>
      </div>

      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useAxios from '@/composables/useAxios';
import type { Photo } from '~/types/types';

const route = useRoute();
const photo = ref<Photo>({
  id: 0,
  title: '',
  url: '',
  albumId: 0,
  thumbnailUrl: ''
});
const editedTitle = ref<string>('');
const loadingTitle = ref(false);
const errorMessage = ref<string | null>(null);
const { get, put, response, loading: axiosLoading, error } = useAxios();
const { $toast } = useNuxtApp();

definePageMeta({
  middleware: ['auth'],
  layout: 'custom'
});

onMounted(async () => {
  const photoId = route.params.id as string;
  errorMessage.value = null;

  await get(`/photos/${photoId}`);

  if (error.value) {
    errorMessage.value = 'Error loading photo. Please try again later.';
    console.error(error.value);
  } else {
    photo.value = response.value?.data;
    editedTitle.value = response.value?.data.title;
  }
});

async function updatePhotoTitle() {
  if (!photo.value) return;

  loadingTitle.value = true;
  errorMessage.value = null;

  await put(`/photos/${photo.value.id}`, { title: editedTitle.value });

  if (error.value) {
    errorMessage.value = 'Error updating title. Please try again.';
    console.error(error.value);
  } else {
    photo.value.title = editedTitle.value;
    $toast.success('Title updated successfully!', {
      position: $toast.POSITION.BOTTOM_RIGHT,
    });
  }

  loadingTitle.value = false;
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

h2 {
  color: #333;
}

.image-container {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  width: 100%;
  height: auto;
  max-height: 300px; 
  object-fit: cover; 
}

input.form-control {
  width: 100%;
}

.btn-primary {
  width: 100%;
}

.alert {
  margin-top: 15px;
}
</style>
