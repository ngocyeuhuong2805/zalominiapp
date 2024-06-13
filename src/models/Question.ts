// Câu hỏi
export interface Question {
  id: string,
  order: number, //Số thứ tự
  questionText: string,
  url: string,
  result: string, //Đáp án lấy từ phương án
  plans: string[] //Phương án
}