import dayjs from 'dayjs';

// Đổi từ định dạng ngày Việt Nam sang ngày ISO (lưu trong CSDL)
export const convertToISOFormat = (date: string) => {
  if (date === "") {
    return dayjs().format('YYYY-MM-DD'); // Return current date if input date is empty
  }
  const isoDate = dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
  return isoDate;
};

// Đổi từ định dạng ngày ISO (lưu trong CSDL) sang ngày Việt Nam
export const convertToVienFormat = (isoDate: string) => {
  if (isoDate === "") {
    return dayjs().format('DD-MM-YYYY'); // Return current date if input ISO date is empty
  }
  const vienDate = dayjs(isoDate).format('DD-MM-YYYY');
  return vienDate;
};

export const getToday = () => {
  const today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0')

  return date;
}
