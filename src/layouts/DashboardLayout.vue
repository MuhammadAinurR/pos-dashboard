<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <aside class="w-[250px] bg-tertiary text-white p-[20px] overflow-hidden">
      <img src="/logo.png" alt="Logo" class="w-[140px] h-[32px]" />

      <nav class="mt-4">
        <SidebarMenu :menu-items="menuItems" />
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation -->

      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-6">
        <header class="flex items-center bg-accent shadow rounded-lg p-2">
          <div class="flex items-center w-full">
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                />
              </svg>
            </button>
            <div class="ml-auto flex flex-row items-center gap-5 pr-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon
                    icon="solar:bell-bold"
                    :width="24"
                    class="text-secondary"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                  <DropdownMenuItem>Clear all</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div class="flex flex-row items-center">
                    <Icon
                      icon="solar:user-bold"
                      :width="24"
                      class="text-secondary"
                    />
                    <div class="flex flex-col items-start">
                      <div class="text-xs text-secondary text-[8px]">
                        Welcome
                      </div>
                      <div class="text-primary -mt-1 text-xs">
                        {{ username }}
                      </div>
                    </div>
                    <Icon
                      icon="hugeicons:arrow-down-01"
                      :width="16"
                      class="text-primary ml-3"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                  <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon
                    icon="solar:settings-bold"
                    :width="24"
                    class="text-secondary"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                  <DropdownMenuItem>Clear all</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <Breadcrumb />
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import { useMenuStore } from '@/stores/menu';
import { useAuthStore } from '@/stores/auth.store';
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const menuStore = useMenuStore();
const menuItems = ref([]);
const authStore = useAuthStore();
const username = authStore.user?.username;

onMounted(async () => {
  await menuStore.fetchMenuItems();
  menuItems.value = menuStore.items;
});
</script>
