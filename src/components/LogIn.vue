<script setup lang="ts">
import { ref } from 'vue';

const email = ref(''), password = ref(''), errorMessage = ref('');

const handleLogin = () => {
    errorMessage.value = !email.value || !password.value ? 'Please fill in both fields!' : '';
    if (!errorMessage.value) alert(`Logging in with Email: ${email.value}`);
};

</script>

<template>
    <div class="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Log In</h2>

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

            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
             Log In
            </button>

        </form>
    </div>
</template>