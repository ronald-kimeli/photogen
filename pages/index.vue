<template>
  <!-- Navigation -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Photogen</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <nuxt-link :to="`/`" class="nav-link active" aria-current="page">
                Home
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="`/login`" class="nav-link">
               Login
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container text-center">
      <h1 class="display-3">Explore Stunning Photos</h1>
      <p class="lead">Share your imagination with the world.</p>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card album-card">
            <img
              src="https://images.pexels.com/photos/6471779/pexels-photo-6471779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="card-img-top" alt="Feature 1">
            <div class="card-body">
              <h5 class="card-title">Feature 1</h5>
              <p class="card-text">This is a sample feature that showcases beautiful photography.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card album-card">
            <img
              src="https://images.pexels.com/photos/6471779/pexels-photo-6471779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="card-img-top" alt="Feature 2">
            <div class="card-body">
              <h5 class="card-title">Feature 2</h5>
              <p class="card-text">Discover more stunning features and get inspired.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card album-card">
            <img
              src="https://images.pexels.com/photos/6471779/pexels-photo-6471779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="card-img-top" alt="Feature 3">
            <div class="card-body">
              <h5 class="card-title">Feature 3</h5>
              <p class="card-text">Engage with a community of passionate photographers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq">
    <div class="container">
      <h2 class="text-center">Frequently Asked Questions</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="true" aria-controls="collapseOne">
              What is Photogen?
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
            data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Photogen is a platform dedicated to showcasing beautiful photography from around the world.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              How can I contribute?
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              You can contribute by uploading your photographs and sharing them with our community.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Is there a mobile app?
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Currently, we do not have a mobile app, but our website is mobile-friendly!
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { getAuth } from 'firebase/auth';

const auth = getAuth();

definePageMeta({
  middleware: ['auth'],
});

auth ? await navigateTo('/dashboard') : console.log("Successfully signed out");

</script>

<style scoped>
.features {
  padding: 40px 0;
}

.album-card {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s;
}

.album-card:hover {
  transform: scale(1.05);
}

.accordion-button {
  background-color: #343a40;
  color: white;
}

.accordion-button:not(.collapsed) {
  background-color: #495057;
}

.accordion-item {
  border: none;
}

h2 {
  margin-bottom: 30px;
}
</style>