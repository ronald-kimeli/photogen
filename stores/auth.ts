
import { defineStore } from 'pinia';
import { GoogleAuthProvider, signOut, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: useCurrentUser(),
  }),

  actions: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = useFirebaseAuth();

      if (auth) {
        await signInWithPopup(auth, provider);
      } else {
        console.error("Firebase Auth not initialized.");
      }
    },
    
    async loginWithEmail(email: string, password: string) {
      const auth = useFirebaseAuth();

      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        console.error("Firebase Auth not initialized.");
      }
    },

    async logout() {
      const auth = useFirebaseAuth();

      if (auth) {
        await signOut(auth);
      } else {
        console.error("Firebase Auth not initialized.");
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
  },
});
