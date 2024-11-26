<template>
  <li class="text-[#91C3FF]" :class="{ 'mt-1': !isFirstChild }">
    <template v-if="item.children">
      <button
        @click="toggleSubmenu"
        class="flex items-center w-full p-1 rounded-radius12 transition-colors text-xs overflow-hidden"
        :class="{
          '': isActiveParent,
          'hover:bg-blue-700/50': !isActiveParent,
        }"
      >
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          class="w-[18px] h-[18px] mr-2"
        />
        <span>{{ item.name }}</span>
        <Icon
          icon="heroicons:chevron-down"
          class="ml-auto transition-transform w-[16px] h-[16px]"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>
      <ul v-show="isOpen" class="pl-4 mt-2 space-y-1">
        <SidebarMenuItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
        />
      </ul>
    </template>

    <router-link
      v-else
      :to="item.route"
      class="relative flex items-center py-[1px] rounded-radius12 transition-colors text-xs font-thin w-[220px]"
      :class="{
        'bg-gradient-to-r from-[#5B9CE3] from-25% to-transparent to-80%':
          isActive,
        'hover:bg-blue-700/50 rounded-radius12': !isActive,
      }"
    >
      <div
        :class="{
          'flex items-center py-1 px-2 rounded-radius12 bg-gradient-to-r from-[#1D53B9] from-30% to-tertiary to-80% w-full text-white':
            isActive,
          'hover:bg-blue-700/50 flex items-center py-1 px-2 w-full rounded-radius12':
            !isActive,
        }"
      >
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          class="w-[18px] h-[18px] mr-2"
        />
        <span>{{ item.name }}</span>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isFirstChild: {
    type: Boolean,
    default: false,
  },
});

// Check if current route matches this menu item
const isActive = computed(() => route.path === props.item.route);

// Check if any child route is active
const isActiveParent = computed(() => {
  if (!props.item.children) return false;
  return props.item.children.some(
    (child: { route: string }) => route.path === child.route
  );
});

const isOpen = ref(false);
const toggleSubmenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
