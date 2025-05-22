<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Branch Laba</h4>
      <button class="btn btn-success" @click="store.exportExcel">
        Export
      </button>
    </div>

    <div class="mb-3 d-flex justify-content-between align-items-center">
      <div>
        <label class="me-2">Limit:</label>
        <select class="form-select d-inline-block w-auto" v-model.number="store.limit" @change="store.setLimit(store.limit)">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
      <div>
        <label class="me-2">Sort:</label>
        <select class="form-select d-inline-block w-auto" v-model="store.sort" @change="store.setSort(store.sort)">
          <option value="periode DESC">Periode Desc</option>
          <option value="periode ASC">Periode Asc</option>
        </select>
      </div>
    </div>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Label</th>
        <th>Periode</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in store.rows" :key="row.periode">
        <td>{{ row.label_rekonsiliasi_fiskal }}</td>
        <td>{{ new Date(row.periode).toLocaleDateString() }}</td>
        <td>{{ formatIDR(row.nilai) }}</td>
      </tr>
      </tbody>
    </table>

    <nav v-if="totalPages > 1">
      <ul class="pagination">
        <li
            class="page-item"
            :class="{ disabled: store.page === 1 }"
            @click="store.setPage(store.page - 1)"
        >
          <a class="page-link" href="#">Previous</a>
        </li>

        <li v-if="visiblePages[0] > 1" class="page-item disabled">
          <a class="page-link">...</a>
        </li>

        <li
            v-for="p in visiblePages"
            :key="p"
            class="page-item"
            :class="{ active: store.page === p }"
            @click="store.setPage(p)"
        >
          <a class="page-link" href="#">{{ p }}</a>
        </li>

        <li v-if="visiblePages[visiblePages.length - 1] < totalPages" class="page-item disabled">
          <a class="page-link">...</a>
        </li>

        <li
            class="page-item"
            :class="{ disabled: store.page === totalPages }"
            @click="store.setPage(store.page + 1)"
        >
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBranchLabaStore } from '@/stores/branchLaba'
import { formatIDR } from '@/utils/format'

const store = useBranchLabaStore()

onMounted(() => {
  store.fetchBranchLaba()
})

const totalPages = computed(() => Math.ceil(store.totalRows / store.limit))

const visiblePages = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  const start = Math.max(1, store.page - Math.floor(maxPagesToShow / 2))
  const end = Math.min(totalPages.value, start + maxPagesToShow - 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>
