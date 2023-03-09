export default function GetDay(date) {
  if(date) {
    const weekday = ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"];
    const d = new Date(date);
    const day = weekday[d.getDay()];
    return day;
  }
}