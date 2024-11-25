<template>
  <div class="flex h-screen bg-[#EFF6FF]">
    <!-- Left side image grid -->
    <div class="md:basis-3/3 hidden md:block">
      <img
        :src="HeroSide"
        alt="Login Icon"
        class="w-full h-full object-contain p-5"
      />
    </div>

    <!-- Right side login form -->
    <div class="md:basis-1/3 flex flex-col justify-between w-full md:w-1/2 p-8">
      <div class="flex flex-col justify-center flex-grow">
        <!-- Logo -->
        <img
          :src="Logo"
          alt="Logo"
          class="w-14 bg-secondary rounded-full shadow-xl shadow-secondary/50 mx-auto mb-9"
        />

        <!-- Header text -->
        <div class="text-center space-y-2">
          <h1 class="text-2xl font-bold">
            Solusi <span class="text-[#2563EB]">POS Cerdas</span>,
          </h1>
          <h2 class="text-2xl font-bold">
            Untuk Kemudahan <span class="text-[#2563EB]">Bisnis Anda</span>
          </h2>
          <p class="text-gray-600">Masuk ke Dashboard</p>
        </div>

        <!-- Login form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700"
                >Username</label
              >
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                :disabled="authStore.loading"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >Kata Sandi</label
              >
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                :disabled="authStore.loading"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-end">
            <a href="#" class="text-sm text-[#2563EB] hover:text-blue-700">
              Lupa kata sandi?
            </a>
          </div>

          <div v-if="authStore.error" class="text-red-500 text-sm text-center">
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {{ authStore.loading ? 'Loading...' : 'Masuk' }}
          </button>
        </form>

        <!-- Company name -->
        <div class="text-center text-sm text-secondary mt-8">
          PT Sumber Digital Solusindo
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import HeroSide from '@/assets/login/hero-side.svg';
import Logo from '@/assets/login/facelogo-white.png';

const authStore = useAuthStore();

const form = reactive({
  username: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    await authStore.login(form);
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>
