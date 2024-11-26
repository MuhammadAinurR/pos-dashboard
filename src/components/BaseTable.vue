<template>
  <div class="w-full bg-white rounded-lg py-4 shadow-sm">
    <!-- Search Bar -->
    <div class="flex justify-end mb-4 mr-4">
      <div class="relative">
        <SearchIcon
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#989EAC]"
        />
        <input
          type="search"
          placeholder="Search"
          class="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-xs bg-[#FCFCFD]"
          :value="searchQuery"
          @input="$emit('search', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="w-full overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-[#F5F7FF] text-xs text-[#30333C] border-b">
            <th v-if="selectable" class="w-12 px-4 py-3">
              <input
                type="checkbox"
                class="rounded border-gray-300"
                v-model="selectAll"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left"
              :class="column.class"
            >
              <div class="flex items-center gap-2 font-base">
                {{ column.label }}
                <ChevronDownIcon v-if="column.sortable" class="h-4 w-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            class="border-b bg-white text-gray-600 text-xs"
          >
            <td v-if="selectable" class="px-4 py-3">
              <input
                type="checkbox"
                class="rounded border-gray-300"
                v-model="row.selected"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 font-thin"
            >
              <slot :name="column.key" :row="row">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 mx-4">
      <div class="flex items-center gap-2">
        <span class="text-xs text-[#4F5563] font-thin">Per page</span>
        <select
          :value="perPage"
          class="border rounded-md px-2 py-1 text-xs font-thin text-[#4F5563]"
          @change="
            $emit(
              'update:perPage',
              Number(($event.target as HTMLSelectElement).value)
            )
          "
        >
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
      <div class="text-xs text-gray-400 font-thin">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of
        {{ totalItems }} Result
      </div>
      <div class="flex gap-1">
        <button
          class="p-2 rounded-md hover:bg-gray-100"
          :disabled="currentPage === 1"
          @click="$emit('update:currentPage', currentPage - 1)"
        >
          <ChevronLeftIcon class="h-4 w-4 text-[#4F5563]" />
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="px-3 py-1 rounded-md text-xs font-thin text-white"
          :class="
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100'
          "
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </button>
        <button
          class="p-2 rounded-md hover:bg-gray-100"
          :disabled="currentPage === totalPages"
          @click="$emit('update:currentPage', currentPage + 1)"
        >
          <ChevronRightIcon class="h-4 w-4 text-[#4F5563]" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-vue-next';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  class?: string;
}

interface Props {
  columns: Column[];
  data: any[];
  selectable?: boolean;
  currentPage: number;
  perPage: number;
  pageSizes?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  pageSizes: () => [5, 10, 20],
});

const emit = defineEmits(['update:currentPage', 'update:perPage', 'search']);

const searchQuery = ref('');
const selectAll = ref(false);

// Pagination calculations
const totalItems = computed(() => props.data.length);
const totalPages = computed(() => Math.ceil(totalItems.value / props.perPage));
const startIndex = computed(() => (props.currentPage - 1) * props.perPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + props.perPage, totalItems.value)
);

const paginatedData = computed(() => {
  return props.data.slice(startIndex.value, endIndex.value);
});

// Toggle all checkboxes
const toggleSelectAll = () => {
  const newValue = selectAll.value;
  props.data.forEach((row) => {
    row.selected = newValue;
  });
};
</script>
