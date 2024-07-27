import VideoPreview from './components/VideoPreview';

function App() {
  return (
    <>
      <VideoPreview
        url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        beginTimecode={104}
        endTimecode={146}
      />
    </>
  );
}

export default App;
