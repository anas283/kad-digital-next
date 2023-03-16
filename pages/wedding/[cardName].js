import Head from "next/head";
import { useRouter } from "next/router"

import api from '../../api';
import { useSelector } from "react-redux";
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
import { useSyncLanguage } from "ni18n";
import { changeLanguage } from "i18next";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const songs = Music();

const WeddingCard = ({ metaData }) => {
  const router = useRouter();
  const name = router.query.cardName;

  const [data, setData] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const isCardOpen = useSelector((state) => state.theme.isCardOpen);
  const [musicUrl, setMusicUrl] = useState(songs[0].url);
  const isPause = useSelector(state => state.theme.isPause);
  const [themeName, setThemeName] = useState('');
  const [isMusic, setIsMusic] = useState(0);
  const [meta, setMeta] = useState([]);
  const { i18n } = useTranslation();

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

                const metaData = res.data.data;
                setMeta({
                  title: 'Walimatul Urus - ' + metaData.men_short_name + ' & ' + metaData.women_short_name,
                  description: metaData.wedding_address_name + ' pada ' + GetDayNumber(metaData.wedding_date) + ' ' + GetMonth(metaData.wedding_date) + ' ' + GetYear(metaData.wedding_date),
                  type: "website",
                }) 

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

                console.log(cardData.language);
                i18n.changeLanguage(cardData.language);

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

        setMeta(
          {
            title: "Walimatul Urus - Kamal & Diana",
            description: "Villamay Shah Alam pada 15 April 2023",
            type: "website",
          }
        )
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

  useEffect(() => {
    if(metaData.title === '') {
      router.push('/')
    }
  },[metaData])

  return (
    <>
      <Head>
        <title>{ metaData.title }</title>
        <meta name="description" content={ metaData.description } />
        <meta property="og:title" content={ metaData.title } />
        <meta property="og:description" content={ metaData.description } />
        <meta property="og:image" content={ metaData.image } />
      </Head>
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

export const getServerSideProps = async (context) => {
  const name = context.params.cardName
  let metaData = null;

  // const api_url = "http://localhost:8080";
  const api_url = "https://kad-digital.up.railway.app";

  if(name === 'demo') {
    metaData = {
      title: "Walimatul Urus - Kamal & Diana",
      description: "Villamay Shah Alam pada 15 April 2023",
      image: "https://ik.imagekit.io/kaddigital/og-image-bahasa.png",
    }
  } else {
    let names;
    let men_short_name;
    let women_short_name;
    names = name.split("-");
    men_short_name = names[0];
    women_short_name = names[1];
    const body = {
      men_short_name: men_short_name,
      women_short_name: women_short_name
    }
    
    await fetch(api_url + '/api/card/get-by-name', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((res) =>{
      let data = res.data;
      if(data) {
        metaData = {
          title: "Walimatul Urus - " + data.men_short_name + ' & ' + data.women_short_name,
          description: data.wedding_address_name + ' pada ' + GetDayNumber(data.wedding_date) + ' ' + GetMonth(data.wedding_date) + ' ' + GetYear(data.wedding_date),
          image: "https://ik.imagekit.io/kaddigital/og-image-bahasa.png",
        }
      }
      else {
        metaData = {
          title: "",
          description: "",
          image: ""
        }
      }
    })
  }

  return {
    props: {
      metaData,
    },
  };
};