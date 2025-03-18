<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { CogIcon, ArrowLeftStartOnRectangleIcon, MapIcon, UserGroupIcon, HomeIcon } from '@heroicons/vue/16/solid';

const isOpen = ref(false), route = useRoute(), router = useRouter(); // isOpen is a reactive variable that controls whether the sidebar is open(true) or closed(false). Initially, we set it to false so the sidebar starts in a collapsed state.

const logout = async () => {
  try {
    await signOut(auth); //Firebase sign out using your existing auth instance
    router.push('/'); //Redirect to login page
  } catch(error) {
    console.error("Error signing out: ", error);
  }
};
</script>

<template>
  <div class="flex"> <!-- class="flex" makes it a flexbox container, so the sidebar and content sit next to each other.-->
    <!-- Sidebar -->
    <aside 
      class="bg-green-900 text-white h-screen p-5 transition-all duration-300 ease-in-out flex flex-col"
      :class="isOpen ? 'w-64' : 'w-20'"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      >
      <!-- Sidebar Menu-->
       <nav class="mt-6">
        <ul>
          <li class="mb-4">
            <router-link 
              to="/dashboard"
              class="flex items-center space-x-4 p-2 hover:bg-green-700 rounded-lg transition-all"
              :class="route.path === '/dashboard' ? 'bg-green-700' : 'hover:bg-green-700'"
              >
              <!-- Dashboard Icon -->
              <HomeIcon class="h-6 w-6 transition-all" />
              <span v-if="isOpen" class="text-sm"> Dashboard </span>              
            </router-link>
          </li>
          <li class="mb-4">
            <router-link 
              to="/map"
              class="flex items-center space-x-4 p-2 hover:bg-green-700 rounded-lg transition-all"
              :class="route.path === '/map' ? 'bg-green-700' : 'hover:bg-green-700'"
              >
              <!-- Map Icon -->
              <MapIcon class="h-6 w-6 transition-all" />
              <span v-if="isOpen" class="text-sm"> Map </span>              
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/teams"
              class="flex items-center space-x-4 p-2 hover:bg-green-700 rounded-lg transition-all"
              :class="route.path === '/teams' ? 'bg-green-700' : 'hover:bg-green-700'"
              >
              <!-- Teams Icon -->
              <UserGroupIcon class="h-6 w-6 transition-all" />
              <span v-if="isOpen" class="text-sm"> Teams </span>              
            </router-link>
          </li>
          <li class="mb-4">
            <router-link 
              to="/settings"
              class="flex items-center space-x-4 p-2 hover:bg-green-700 rounded-lg transition-all"
              :class="route.path === '/settings' ? 'bg-green-700' : 'hover:bg-green-700'"
              >
              <!-- Settings Icon -->
              <CogIcon class="h-6 w-6 transition-all" />
              <span v-if="isOpen" class="text-sm"> Settings </span>              
            </router-link>
          </li>
          <li class="mb-4">
            <button 
              @click="logout"
              class="flex items-center space-x-4 p-2 hover:bg-green-700 rounded-lg transition-all w-full text-left"
              >
              <!-- LogOut Icon -->
              <ArrowLeftStartOnRectangleIcon class="h-6 w-6 transition-all" />
              <span v-if="isOpen" class="text-sm"> Log out </span>              
            </button>
          </li>
        </ul>
       </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1">
      <slot /> <!-- Slot for dashboard content -->
    </div>
  </div>
</template>

<style scoped>
/** Sidebar hover effect */
aside:hover {
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}
</style>