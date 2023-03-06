export default function GetDayNumber(date) {
  if(date) {
    const d = new Date(date);
    return d.getDate();
  }
}