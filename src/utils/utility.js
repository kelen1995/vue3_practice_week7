function zeroPadding(num) {
  // 為月份、日期補零
  if (num < 10) return `0${num}`;
  return num;
}

export default function dateFormat(timestamp) {
  // 將日期格式化為 YY/MM/DD
  const date = new Date(timestamp * 1000);
  return `${date.getFullYear()}/${zeroPadding(
    date.getMonth() + 1,
  )}/${zeroPadding(date.getDate())}`;
}
