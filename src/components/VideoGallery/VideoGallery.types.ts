export interface IVideoGallery {
  videos: IVideo[];
  onVideoSelect: (video: IVideo) => void;
  onPlayVideo: (video: IVideo) => void;
}