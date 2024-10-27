<template>
  <section class="py-3 py-md-5 py-xl-8">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="mb-5">
            <h2 class="display-5 fw-bold text-center">Sign in</h2>
            <p class="text-center m-0">Don't have an account?</p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div class="row gy-5 justify-content-center">
            <div class="col-12 col-lg-5">
              <form @submit.prevent="handleLogin">
                <div class="row gy-3 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        v-model="email"
                        type="email"
                        class="form-control border-0 border-bottom rounded-0"
                        id="email"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="email" class="form-label">Email</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        v-model="password"
                        type="password"
                        class="form-control border-0 border-bottom rounded-0"
                        id="password"
                        placeholder="Password"
                        required
                      />
                      <label for="password" class="form-label">Password</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button class="btn btn-outline-primary btn-lg" type="submit">Log in</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
              <div>or</div>
            </div>
            <div class="col-12 col-lg-5 d-flex align-items-center">
              <div class="d-flex gap-3 flex-column w-100">
                <button @click="signInWithGoogle" class="btn btn-outline-danger btn-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span class="ms-2 fs-6">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useCurrentUser } from 'vuefire';
import { ref, watch } from 'vue';

const currentUser = useCurrentUser();
const auth = getAuth();

const email = ref<string>('');
const password = ref<string>('');
const loginError = ref<string>('');

const checkUserState = async () => {
  if (currentUser.value) {
    console.log("Successfully signed in");
    await navigateTo('/dashboard');
  }
};

watch(currentUser, async (newUser) => {
  await checkUserState();
});

await checkUserState();

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginError.value = '';
  } catch (error) {
    if (error === 'auth/user-not-found') {
      loginError.value = 'No user found with this email. Please register.';
    } else {
      loginError.value = 'An error occurred. Please try again.';
    }
    console.error("Error: ", error);
  }
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    console.log("Successfully signed in with Google");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
</script>

<style scoped>
.btn-outline-primary, .btn-outline-danger {
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-primary:hover, .btn-outline-danger:hover {
  background-color: #007bff;
  color: white;
}

.section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}
</style>
