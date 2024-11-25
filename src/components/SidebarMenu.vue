<template>
  <ul class="space-y-2">
    <template v-for="item in menuItems" :key="item.id">
      <SidebarMenuItem :item="item" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import SidebarMenuItem from './SidebarMenuItem.vue';

interface MenuItem {
  id: string | number;
  name: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
}

defineProps<{
  menuItems: MenuItem[];
}>();
</script>
