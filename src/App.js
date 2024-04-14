import React from 'react';
import Player from './Player/Player';
import { songsdata } from './Player/audios';
import { useRef, useState, useEffect } from 'react';
import '../src/Player/BackgroundVideo.css'; // Import the CSS file for the background video styles

const App = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);

  const audioElem = useRef();
  const videoElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
      videoElem.current.play();
    } else {
      audioElem.current.pause();
      videoElem.current.pause();
    }
  }, [isplaying, currentSong])

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

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": (ct / duration) * 100, "length": duration })

    videoElem.current.currentTime = audioElem.current.currentTime;
  }

  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <video src={currentSong.videoUrl} ref={videoElem} className="background-video" loop={false} muted />
      <Player
        songs={songs}
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        videoElem={videoElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}

export default App;