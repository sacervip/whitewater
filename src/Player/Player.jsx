import React, { useState, useRef, useEffect } from 'react';
import { Video } from 'cloudinary-react';
import { FiSkipBack, FiSkipForward, FiPlay, FiPause } from 'react-icons/fi'; // Import icons
import './player.scss';
import { songsdata } from './audios';

const Player = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const playbackPositionRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current && videoRef.current.video;
    if (video) {
      if (isPlaying) {
        video.currentTime = playbackPositionRef.current;
        video.play();
      } else {
        playbackPositionRef.current = video.currentTime;
        video.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    console.log("Toggle play/pause clicked");
    setIsPlaying((prevState) => !prevState);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songsdata.length);
    playbackPositionRef.current = 0;
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songsdata.length - 1 : prevIndex - 1
    );
    playbackPositionRef.current = 0;
  };

  const currentSong = songsdata[currentSongIndex];

  return (
    <div className='player_container'>
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <Video
        ref={videoRef}
        cloudName="du6p1dtm3"
        publicId={currentSong.videoUrl}
        controls
        loop
        autoPlay
      />
      <div className="controls">
        <button className="btn_action" onClick={playPreviousSong}><FiSkipBack /></button>
        <button className="btn_action" onClick={togglePlayPause}>
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>
        <button className="btn_action" onClick={playNextSong}><FiSkipForward /></button>
      </div>
    </div>
  );
};
export default Player;