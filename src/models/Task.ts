// Nhiệm vụ
export interface Task {
  id: string,
  title: string,
  quantityRequire: number // Số lượng cần để hoàn thành nhiệm vụ
  type: string,
  oaId: string
}