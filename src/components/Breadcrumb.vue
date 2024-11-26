<template>
  <nav class="breadcrumb my-4" aria-label="breadcrumb">
    <ol class="flex items-center space-x-2 text-xs text-gray-600">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <li>
          <router-link
            v-if="item.path && index !== breadcrumbItems.length - 1"
            :to="item.path"
            class="text-gray-600"
          >
            {{ item.name }}
          </router-link>
          <span
            v-else
            :class="{ 'text-blue-600': index === breadcrumbItems.length - 1 }"
          >
            {{ item.name }}
          </span>
        </li>
        <li v-if="index < breadcrumbItems.length - 1" class="text-gray-500">
          <Icon
            icon="hugeicons:arrow-right-01"
            :width="15"
            class="text-primary ml-1"
          />
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();

interface BreadcrumbItem {
  name: string;
  path?: string;
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const paths = route.path.split('/').filter(Boolean);

  return paths.map((path, index) => {
    // Create the full path up to this point
    const fullPath = '/' + paths.slice(0, index + 1).join('/');

    // Format the name (capitalize and replace hyphens with spaces)
    const name = path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      name,
      path: fullPath,
    };
  });
});
</script>
