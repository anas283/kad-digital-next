import Head from "next/head";
import { useRouter } from "next/router"

import api from '../../api';
import { useSelector } from "react-redux";
import useSound from 'use-sound';
import Music from "../../components/Music";
import MockupImages from "../../components/MockupImages";

import Autumn from "../../themes/Autumn";
import Elegent from "../../themes/Elegent";
import Enchant from "../../themes/Enchant";
import Forest from "../../themes/Forest";
import Lavish from "../../themes/Lavish";
import Luxury from "../../themes/Luxury";
import Magestic from "../../themes/Magestic";
import Ocean from "../../themes/Ocean";
import Simply from "../../themes/Simply";
import Woods from "../../themes/Woods";
import { useEffect, useState } from "react";

const songs = Music();

const WeddingCard = () => {
  const router = useRouter();
  const name = router.query.cardName;

  const [data, setData] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const isCardOpen = useSelector((state) => state.theme.isCardOpen);
  const [musicUrl, setMusicUrl] = useState('');
  const isPause = useSelector(state => state.theme.isPause);
  const [themeName, setThemeName] = useState('');
  const [isMusic, setIsMusic] = useState(0);

  const [playSound1, sound1] = useSound(songs[0].url);
  const [playSound2, sound2] = useSound(songs[1].url);
  const [playSound3, sound3] = useSound(songs[2].url);
  const [playSound4, sound4] = useSound(songs[3].url);
  const [playSound5, sound5] = useSound(songs[4].url);
  const [playSound6, sound6] = useSound(songs[5].url);

  useEffect(() => {
    let names;
    let men_short_name;
    let women_short_name;

    if(name !== undefined) {
      names = name.split("-");
      men_short_name = names[0];
      women_short_name = names[1];
    }

    if(name !== 'demo' && name !== undefined) {
      const getCardsById = async () => {
        const body = {
          men_short_name: men_short_name,
          women_short_name: women_short_name
        }
        try {
          await api.post('/api/card/get-by-name',
            body
          ).then((res) => {
            if(res.data.status === 'success') {

              const cardData = res.data.data;
              for(let i=0; i<MockupImages.length; i++) {
                let card_name = cardData.theme.slice(41);
                card_name = card_name.split('.')[0];

                let mockup_name = MockupImages[i].image.slice(41);
                mockup_name = mockup_name.split('.')[0];

                if(card_name === mockup_name) {
                  setThemeName(mockup_name);
                }
              }

              setData(res.data.data);
              setMusicUrl(res.data.data.music_url);
              setIsMusic(res.data.data.is_music);

              const total_view = res.data.data.total_view;
              updateTotalView(total_view, men_short_name, women_short_name);
            }
          })
        } catch (e) {
          if(e.response) {
            // router.push("/not-found");
          }
        }
      }
      getCardsById();
    }
    else {
      const demo_theme = localStorage.getItem('demo_theme');
      setThemeName(demo_theme);
      setIsLive(false);
    }
  },[name])

  useEffect(() => {
    if(isCardOpen) {
      setTimeout(() => {
        startPlayingSong();
      }, 2000);
    }
  },[isCardOpen])

  useEffect(() => {
    if(isPause) {
      stopPlayingSong();
    } else {
      startPlayingSong();
    }
  },[isPause])

  const startPlayingSong = () => {
    if(!isLive) {
      playSound1();
    } else {
      if(!isPause && isMusic === 1) {
        if(songs[0].url === musicUrl) {
          playSound1();
        }
        else if(songs[1].url === musicUrl) {
          playSound2();
        }
        else if(songs[2].url === musicUrl) {
          playSound3();
        }
        else if(songs[3].url === musicUrl) {
          playSound4();
        }
        else if(songs[4].url === musicUrl) {
          playSound5();
        }
        else if(songs[4].url === musicUrl) {
          playSound6();
        }
      }
    }
  }

  const stopPlayingSong = () => {
    if(!isLive) {
      sound1.pause();
    } else {
      if(songs[0].url === musicUrl) {
        sound1.pause();
      }
      else if(songs[1].url === musicUrl) {
        sound2.pause();
      }
      else if(songs[2].url === musicUrl) {
        sound3.pause();
      }
      else if(songs[3].url === musicUrl) {
        sound4.pause();
      }
      else if(songs[4].url === musicUrl) {
        sound5.pause();
      }
      else if(songs[5].url === musicUrl) {
        sound6.pause();
      }
    }
  }

  const updateTotalView = async (total_view, men_short_name, women_short_name) => {
    try {
      await api
        .put("/api/card/total-view", {
          total_view: total_view + 1,
          men_short_name: men_short_name,
          women_short_name: women_short_name
        }).then((res) => {
          if (res.data.status === "success") {
          }
        });
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      }
    }
  };

  const meta = {
    title: "Walimatul Urus - Kamal & Diana",
    description: "Bertempat di Villamay Shah Alam pada 15 April 2023",
    type: "website",
  }

  return (
    <>
      <Head>
        <title>{ meta.title }</title>
        <meta name="description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
      </Head>
      {themeName === 'autumn' &&
        <Autumn
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'elegent' &&
        <Elegent
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'enchant' &&
        <Enchant
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'forest' &&
        <Forest
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'lavish' &&
        <Lavish
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'luxury' &&
        <Luxury
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'magestic' &&
        <Magestic
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'ocean' &&
        <Ocean
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'simply' &&
        <Simply
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
      {themeName === 'woods' &&
        <Woods
          data={data}
          isLive={isLive}
          isCardOpen={isCardOpen}
        />
      }
    </>
  )
}

export default WeddingCard