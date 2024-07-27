export interface IVideoGallery {
  videos: IVideo[];
  onVideoSelect: (video: IVideo) => void;
}