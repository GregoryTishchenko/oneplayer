import { FC } from 'react';
import styles from './VideoGallery.module.scss';
import { IVideoGallery } from './VideoGallery.types';

const VideoGallery: FC<IVideoGallery> = ({ videos, onVideoSelect }) => {
  return (
    <ul className={styles.gallery}>
      {videos.map((video) => (
        <li
          key={video.id}
          onMouseEnter={() => onVideoSelect(video)}
          onFocus={() => onVideoSelect(video)}
          className={styles.gallery__item}
        >
          <div className={styles.poster}>
            <img
              tabIndex={0}
              role="button"
              src={video.poster}
              alt={video.title}
              className={styles.poster}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VideoGallery;
