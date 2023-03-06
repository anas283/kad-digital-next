export default function GetDayNumber(date) {
  if(date) {
    const months = ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"];
    const d = new Date(date);
    const month = months[d.getMonth()];
    return month;
  }
}