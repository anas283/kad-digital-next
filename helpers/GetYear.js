export default function GetDayNumber(date) {
  if(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    return year;
  }
}
