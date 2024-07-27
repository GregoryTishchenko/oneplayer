import { FC } from 'react';
import styles from './SceneList.module.scss';
import { ISceneList } from './SceneList.typees';
import CustomButton from '../UI/CustomButton/CustomButton';

const SceneList: FC<ISceneList> = ({ scenes, onSceneClick, onClose }) => {
  return (
    <div
      className={styles.sceneListContainer}
      role="dialog"
      aria-labelledby="sceneListTitle"
    >
      <CustomButton
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Fermer la liste des scènes"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </CustomButton>
      <h3 id="sceneListTitle">Scènes</h3>
      <ul role="list">
        {scenes.map((scene) => (
          <li key={scene.id} role="listitem">
            <button
              onClick={() => onSceneClick(scene)}
              aria-label={`Accédez à la scène : ${scene.title}`}
            >
              {scene.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SceneList;
