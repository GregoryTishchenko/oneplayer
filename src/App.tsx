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
        <VideoPlayer
          url={activeVideo.url}
          handleClose={handleCloseVideoPlayer}
        />
      ) : (
        <>
          <VideoPreview
            id={activeVideo.id}
            title={activeVideo.title}
            description={activeVideo.description}
            url={activeVideo.url}
            logo={activeVideo.logo}
            beginTimecode={activeVideo.beginTimecode}
            endTimecode={activeVideo.endTimecode}
            onPlayVideo={handlePlayVideo}
          />

          <VideoGallery videos={mockData} onVideoSelect={handleVideoSelect} />
        </>
      )}
    </>
  );
}

export default App;
