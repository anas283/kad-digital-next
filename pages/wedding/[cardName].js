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
import { useRef } from 'react';
import GetDayNumber from "../../helpers/GetDayNumber";
import GetMonth from "../../helpers/GetMonth";
import GetYear from "../../helpers/GetYear";

const songs = Music();

const WeddingCard = () => {
  const router = useRouter();
  const name = router.query.cardName;

  const [data, setData] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const isCardOpen = useSelector((state) => state.theme.isCardOpen);
  const [musicUrl, setMusicUrl] = useState(songs[0].url);
  const isPause = useSelector(state => state.theme.isPause);
  const [themeName, setThemeName] = useState('');
  const [isMusic, setIsMusic] = useState(0);

  useEffect(() => {
    let names;
    let men_short_name;
    let women_short_name;

    if(name !== undefined) {
      names = name.split("-");
      men_short_name = names[0];
      women_short_name = names[1];

      if(name !== 'demo') {
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
        const demo_theme = localStorage.getItem('demo_theme') || 'elegent';
        setThemeName(demo_theme);
        setIsLive(false);
      }
    }
  },[name])

  useEffect(() => {
    if(isCardOpen) {
      startPlayingSong();
    }
  },[isCardOpen])

  useEffect(() => {
    if(isPause) {
      stopPlayingSong();
    } else {
      startPlayingSong();
    }
  },[isPause])

  const audioRef = useRef();

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    } else {
      // Throw error
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    } else {
      // Throw error
    }
  }

  const startPlayingSong = () => {
    if(!isLive) {
      play();
    } else {
      if(!isPause && isMusic === 1) {
        play()
      }
    }
  }

  const stopPlayingSong = () => {
    stop()
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
    description: "Villamay Shah Alam pada 15 April 2023",
    type: "website",
  }

  useEffect(() => {
    console.log('data');
    console.log(data);
    console.log(name);
  },[data])

  return (
    <>
      {(data.length !== 0 && name !== 'demo') &&
        <Head>
          <title>{ 'Walimatul Urus - ' + data.men_short_name + ' & ' + data.women_short_name }</title>
          <meta name="description" content={ data.wedding_address_name + ' pada ' + GetDayNumber(data.wedding_date) + ' ' + GetMonth(data.wedding_date) + ' ' + GetYear(data.wedding_date) } />
          <meta property="og:title" content={ 'Walimatul Urus - ' + data.men_short_name + ' & ' + data.women_short_name } />
          <meta property="og:description" content={ data.wedding_address_name + ' pada ' + GetDayNumber(data.wedding_date) + ' ' + GetMonth(data.wedding_date) + ' ' + GetYear(data.wedding_date) } />
        </Head>
      }
      {name === 'demo' &&
        <Head>
          <title>{ meta.title }</title>
          <meta name="description" content={ meta.description } />
          <meta property="og:title" content={ meta.title } />
          <meta property="og:description" content={ meta.description } />
        </Head>
      }
      <audio ref={audioRef} src={musicUrl} />
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