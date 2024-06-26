export default function GetTime(date) {
  if(date) {
    const new_date = new Date(date);
    const time = new_date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    return time;
  }
}