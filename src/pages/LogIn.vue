<script setup lang="ts">
import { ref } from 'vue';
import logo from '../assets/logo.png';
import { auth } from '../firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router';

//Define state variables
const email = ref(''), password = ref(''), errorMessage = ref(''), loading = ref(false), router = useRouter();

const handleLogin = async () => {
  errorMessage.value = ''; // Reset error message

  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in both fields!';
    return;
  }

  try {
    // Attempt to sign in using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('✅ Admin Logged In:', userCredential.user);
    
    // Store user data in localStorage (you can also use Vuex or Pinia for state management)
    localStorage.setItem('user', JSON.stringify(userCredential.user));

    // Redirect to dashboard after successful login
    router.push('/dashboard'); // This should now work correctly
  } catch (error: any) {
    console.error('❌ Login error:', error.message);
    errorMessage.value = 'Invalid email or password';
  }
};

</script>

<template>
    <div class="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
        <img :src="logo" alt="Logo" class="mx-auto mb-4" />
        <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
                <label class="block text-sm font-semibold"> Email: </label>
                <input v-model="email" type="email" class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300" />
            </div>
            <div>
                <label class="block text-sm font-semibold"> Password: </label>
                <input v-model="password" type="password" class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300" />
            </div>

            <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

            <button type="submit" class="w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-lg transition" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Log In' }}
            </button>
        </form>
    </div>
</template>