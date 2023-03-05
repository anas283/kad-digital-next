const music1 = require('../public/songs/James_Arthur_Say_You_Wont_Let_Go.mp3');
const music2 = require('../public/songs/Shane_Filan_Beautiful_In_White.mp3');
const music3 = require('../public/songs/Calum_Scott_You_Are_The_Reason.mp3');
const music4 = require('../public/songs/Ippo_Hafiz_Saat_Bahagia.mp3');
const music5 = require('../public/songs/Hael_Husaini_Hari_Ini.mp3');
const music6 = require('../public/songs/Virgoun_Bukti.mp3');

export default function Music() {
  const musics = [
    {
      title: "Say You Won't Let Go - James Arthur",
      url: music1
    },
    {
      title: "Shane Filan - Beautiful In White",
      url: music2
    },
    {
      title: "Calum Scott - You Are The Reason",
      url: music3
    },
    {
      title: "Ippo Hafiz - Saat Bahagia",
      url: music4
    },
    {
      title: "Hael Husaini - Hari Ini.mp3",
      url: music5
    },
    {
      title: "Virgoun - Bukti",
      url: music6
    }
    // {
    //   title: "Say You Won't Let Go - James Arthur",
    //   url: "https://storage.cloud.google.com/kad-digital/James%20Arthur%20-%20Say%20You%20Won't%20Let%20Go.mp3"
    // },
    // {
    //   title: "Shane Filan - Beautiful In White",
    //   url: "https://storage.cloud.google.com/kad-digital/Shane%20Filan%20-%20Beautiful%20In%20White.mp3"
    // },
    // {
    //   title: "Calum Scott - You Are The Reason",
    //   url: "https://storage.cloud.google.com/kad-digital/Calum%20Scott%20-%20You%20Are%20The%20Reason.mp3"
    // },
    // {
    //   title: "Ippo Hafiz - Saat Bahagia",
    //   url: "https://storage.cloud.google.com/kad-digital/Ippo%20Hafiz%20-%20Saat%20Bahagia.mp3"
    // },
    // {
    //   title: "Hael Husaini - Hari Ini",
    //   url: "https://storage.cloud.google.com/kad-digital/Hael%20Husaini%20-%20Hari%20Ini.mp3"
    // },
    // {
    //   title: "Virgoun - Bukti",
    //   url: "https://storage.cloud.google.com/kad-digital/Virgoun%20-%20Bukti.mp3"
    // }
  ]
  return musics;
}