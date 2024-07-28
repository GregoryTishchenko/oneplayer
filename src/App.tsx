import { useState } from 'react';

import VideoPreview from './components/VideoPreview/VideoPreview';
import VideoGallery from './components/VideoGallery/VideoGallery';

import { mockData } from './data/mockData';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

function App() {
  const [activeVideo, setActiveVideo] = useState<IVideo>(mockData[0]);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const handleVideoSelect = (video: IVideo) => {
    setActiveVideo(video);
  };

  const handlePlayVideo = () => {
    setShowVideoPlayer(true);
  };

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  return (
    <>
      {showVideoPlayer ? (
        <VideoPlayer {...activeVideo} handleClose={handleCloseVideoPlayer} />
      ) : (
        <>
          <VideoPreview {...activeVideo} onPlayVideo={handlePlayVideo} />
          <VideoGallery
            videos={mockData}
            onPlayVideo={handlePlayVideo}
            onVideoSelect={handleVideoSelect}
          />
        </>
      )}
    </>
  );
}

export default App;
