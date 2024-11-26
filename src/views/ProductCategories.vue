<template>
  <div class="min-h-screen">
    <header class="mb-4">
      <h1 class="text-xl text-gray-900">Product Categories</h1>
      <p class="text-[#727B8E] text-xs">Daftar semua kategori produk</p>
    </header>
    <BaseTable
      :columns="columns"
      :data="tableData"
      v-model:currentPage="currentPage"
      v-model:perPage="perPage"
      selectable
      @search="handleSearch"
    >
      <!-- Custom action column template -->
      <template #action="{ row }">
        <div class="relative">
          <button
            class="px-3 py-1 text-xs hover:text-[#2D76F9] border rounded-md hover:bg-gray-50 flex items-center"
            @click="toggleDropdown(row)"
          >
            Action
            <ChevronDownIcon class="h-4 w-4 inline ml-1" />
          </button>
          <div
            v-if="activeDropdown === row"
            class="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg border z-10"
          >
            <div class="text-[#30333C] text-[10px]">
              <a
                href="#"
                class="flex items-center px-2 hover:bg-gray-100 text-[10px]"
              >
                <EyeIcon class="h-[9px] w-[11px] mr-2 text-[#225EEE]" />
                Lihat Detail
              </a>
              <a
                href="#"
                class="flex items-center px-2 hover:bg-gray-100 text-[10px]"
              >
                <PencilIcon class="h-[9px] w-[11px] mr-2 text-[#225EEE]" />
                Ubah
              </a>
              <a
                href="#"
                class="flex items-center px-2 hover:bg-gray-100 text-[10px]"
              >
                <TrashIcon class="h-[9px] w-[11px] mr-2 text-red-600" />
                Hapus
              </a>
            </div>
          </div>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BaseTable from '@/components/BaseTable.vue';
import {
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-vue-next';

const columns = [
  { key: 'position', label: 'Posisi / Jabatan', sortable: true },
  { key: 'updatedDate', label: 'Updated Date', sortable: true },
  { key: 'createdBy', label: 'Created By' },
  { key: 'action', label: 'Action', class: 'w-24' },
];

const tableData = ref([
  {
    position: 'Kepala Cabang',
    updatedDate: 'Nov 9, 2024',
    createdBy: 'Jane Doe',
    selected: false,
  },
  {
    position: 'Supervisor',
    updatedDate: 'Nov 9, 2024',
    createdBy: 'Jane Doe',
    selected: false,
  },
  {
    position: 'Manager',
    updatedDate: 'Nov 9, 2024',
    createdBy: 'Jane Doe',
    selected: false,
  },
  {
    position: 'Staff',
    updatedDate: 'Nov 9, 2024',
    createdBy: 'Jane Doe',
    selected: false,
  },
  {
    position: 'Marketing',
    updatedDate: 'Nov 9, 2024',
    createdBy: 'Jane Doe',
    selected: false,
  },
]);

const currentPage = ref(1);
const perPage = ref(5);
const activeDropdown = ref(null);

const handleSearch = (query: string) => {
  // Implement search logic here
  console.log('Searching for:', query);
};

const toggleDropdown = (row: any) => {
  activeDropdown.value = activeDropdown.value === row ? null : row;
};

// Close dropdown when clicking outside
const closeDropdown = (event: Event) => {
  if (!event.target?.closest('.relative')) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>
