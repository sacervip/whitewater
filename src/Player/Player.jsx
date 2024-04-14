import React, { useRef, useState, useEffect } from 'react';
import './player.scss';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill, BsVolumeDown } from 'react-icons/bs';

const Player = ({ audioElem, videoElem, isplaying, setisplaying, currentSong, setCurrentSong, songs }) => {
  const clickRef = useRef();
  const [volume, setVolume] = useState(1); // Initialize volume to maximum (1)

  const PlayPause = () => {
    setisplaying(!isplaying);
  }

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * currentSong.length;
    videoElem.current.currentTime = divprogress / 100 * currentSong.videoLength;
  }

  const skipBack = () => {
    const index = songs.findIndex(x => x.title === currentSong.title);
    const prevIndex = (index === 0) ? songs.length - 1 : index - 1;
    setCurrentSong(songs[prevIndex]);
    audioElem.current.currentTime = 0;
    videoElem.current.currentTime = 0;
  }

  const skiptoNext = () => {
    const index = songs.findIndex(x => x.title === currentSong.title);
    const nextIndex = (index === songs.length - 1) ? 0 : index + 1;
    setCurrentSong(songs[nextIndex]);
    audioElem.current.currentTime = 0;
    videoElem.current.currentTime = 0;
  }

  const volumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioElem.current.volume = newVolume;
  }

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
      videoElem.current.play();
    } else {
      audioElem.current.pause();
      videoElem.current.pause();
    }

    return () => {
      audioElem.current.pause();
      videoElem.current.pause();
    };
  }, [isplaying]);

  useEffect(() => {
    const handleVideoEnd = () => {
      if (!audioElem.current.ended) {
        videoElem.current.currentTime = 0;
        videoElem.current.play();
      }
    };

    videoElem.current.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElem.current.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentSong]);

  return (
    <div className='player_container'>
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{ width: `${currentSong.progress + "%"}` }}></div>
        </div>
      </div>
      <div className="controls">
        <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />
        {isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause} /> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause} />}
        <BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext} />
        <div className="volume-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={volumeChange}
            className="volume-slider"
          />
          <BsVolumeDown className='volumeDown' />
        </div>
      </div>
    </div>
  )
}

export default Player;