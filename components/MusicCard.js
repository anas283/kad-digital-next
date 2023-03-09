import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseSong } from '../store/themeReducer';
import { useRef } from 'react';

const MusicCard = ({ title, url }) => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.theme.song);
  const [isPlaying, setIsPlaying] = useState(false);

  const choose = (e) => {
    e.preventDefault()
    dispatch(chooseSong(url))
  }

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

  const playMusic = () => {
    if (!isPlaying) {
      play();
      setIsPlaying(true);
    } 
    else {
      stop();
      setIsPlaying(false);
    }
  }

  return (
    <div className={
      song === url ? 'card card-song shadow-sm p-3 mt-3 card-selected':'card card-song shadow-sm p-3 mt-3'} 
    >
      <div className="icon-check"> 
        <FeatherIcon icon="check" size={13} />
      </div>
      <h6 className="song-name">
        { title }
      </h6>
      <div className="mt-2">
        <audio ref={audioRef} src={url} />
        <button type="button" className="btn btn-light me-2" onClick={playMusic}>
          { !isPlaying &&
            <FeatherIcon icon="play-circle" size={18} />
          }
          { isPlaying &&
            <FeatherIcon icon="pause-circle" size={18} />
          }
          <span className="btn-text ms-2">
            { isPlaying ? 'Henti':'Main' }
          </span>
        </button>
        <button type="button" className="btn btn-light" onClick={choose}>
          <FeatherIcon icon="check-circle" size={16} />
          <span className="btn-text ms-2">Pilih</span>
        </button>
      </div>
    </div>
  )
}

export default MusicCard;