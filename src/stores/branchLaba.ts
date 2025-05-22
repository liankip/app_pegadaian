import { defineStore } from 'pinia'
import axios from 'axios'
import type { BranchLabaRow } from '@/types/BranchLabaResponse.ts'

export const useBranchLabaStore = defineStore('branchLaba', {
  state: () => ({
    rows: [] as BranchLabaRow[],
    loading: false,
    error: null as string | null,
    totalRows: 0,
    page: 1,
    limit: 10,
    sort: 'periode DESC'
  }),

  actions: {
    async fetchBranchLaba() {
      this.loading = true
      try {
        const res = await axios.get('/branch-laba', {
          params: {
            page: this.page,
            limit: this.limit,
            sort: this.sort
          }
        })

        this.rows = res.data.data.rows
        this.totalRows = res.data.data.total_rows
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    setPage(page: number) {
      this.page = page
      this.fetchBranchLaba()
    },

    setLimit(limit: number) {
      this.limit = limit
      this.page = 1
      this.fetchBranchLaba()
    },

    setSort(sort: string) {
      this.sort = sort
      this.fetchBranchLaba()
    },

    async exportExcel() {
      try {
        const res = await axios.get('/branch-laba/export', {
          responseType: 'blob'
        })

        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'branch-laba.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (err: any) {
        console.error('Export error:', err)
        this.error = 'Failed to export file.'
      }
    }
  }
})
