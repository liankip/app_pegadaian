export interface BranchLabaRow {
  label_rekonsiliasi_fiskal: string
  periode: string
  nilai: number
}

export interface BranchLabaResponse {
  limit: number
  page: number
  sort: string
  total_rows: number
  total_pages: number
  rows: BranchLabaRow[]
}
