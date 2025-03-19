<script setup lang="ts">
import Sidebar from '../../layouts/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";

// Reactive variables
const users = ref<{ id: string; email: string; role: string }[]>([]);
const email = ref('');
const password = ref('');
const role = ref('foreman');
const isModalOpen = ref(false);

// Fetch users from Firestore
const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    users.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      email: doc.data().email,
      role: doc.data().role,
    }));
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    alert(`Error: ${error.message}`);
  }
};

// Add new user to Firebase Auth & Firestore
const addUser = async () => {
  if (!email.value || !password.value) {
    alert("Email and password are required.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      role: role.value,
      createdAt: new Date(),
    });

    await fetchUsers(); // Refresh list
    closeModal(); // Reset modal state
    alert("User successfully added!");
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    alert(`Error: ${error.message}`);
  }
};

// Close modal and reset form fields
const closeModal = () => {
  isModalOpen.value = false;
  email.value = '';
  password.value = '';
  role.value = 'foreman';
};

onMounted(fetchUsers);
</script>

<template>
  <div class="flex">
    <Sidebar />
    
    <div class="flex-1 p-6">
      <h2 class="text-2xl font-bold">Users Management</h2>
      
      <button class="bg-green-600 text-white px-4 py-2 rounded-md my-4" @click="isModalOpen = true">
        + Add New User
      </button>

      <!-- User List -->
      <table class="w-full mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr class="bg-green-600 text-white text-left">
            <th class="p-4">Email</th>
            <th class="p-4">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b transition hover:bg-gray-100 even:bg-gray-50">
            <td class="p-4">{{ user.email }}</td>
            <td class="p-4 capitalize">{{ user.role.replace('-', ' ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 class="text-xl font-bold mb-4">Add New User</h2>

        <label class="block mb-2">Email</label>
        <input type="email" v-model="email" class="w-full border p-2 rounded-md mb-4" required />

        <label class="block mb-2">Password</label>
        <input type="password" v-model="password" class="w-full border p-2 rounded-md mb-4" required />

        <label class="block mb-2">Role</label>
        <select v-model="role" class="w-full border p-2 rounded-md mb-4">
          <option value="foreman">Foreman</option>
          <option value="waste-collector-team">Waste Collector Team</option>
          <option value="bmrf-personnel">BMRF Personnel</option>
        </select>

        <div class="flex justify-end">
          <button class="bg-gray-400 text-white px-4 py-2 rounded-md mr-2" @click="closeModal">
            Cancel
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded-md" @click="addUser">
            Add User
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
