import { useState } from 'react';

import VideoPreview from './components/VideoPreview/VideoPreview';
import VideoGallery from './components/VideoGallery/VideoGallery';

import { mockData } from './data/mockData';

function App() {
  const [activeVideo, setActiveVideo] = useState<IVideo>(mockData[0]);
  const handleVideoSelect = (video: IVideo) => {
    setActiveVideo(video);
  };

  return (
    <>
      <VideoPreview
        id={activeVideo.id}
        title={activeVideo.title}
        description={activeVideo.description}
        url={activeVideo.url}
        logo={activeVideo.logo}
        beginTimecode={activeVideo.beginTimecode}
        endTimecode={activeVideo.endTimecode}
      />

      <VideoGallery videos={mockData} onVideoSelect={handleVideoSelect} />
    </>
  );
}

export default App;
