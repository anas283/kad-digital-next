export default function GetDayNumber(date) {
  if(date) {
    const weekday = ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"];
    const d = new Date(date);
    const day = weekday[d.getDay()];
    return day;
  }
}