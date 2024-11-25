<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="px-4 py-6">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>

    <main class="p-4">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl mb-4">ManageProducts</h2>
        <button
          @click="authStore.logout()"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
</script>
