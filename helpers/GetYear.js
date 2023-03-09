export default function GetYear(date) {
  if(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    return year;
  }
}
