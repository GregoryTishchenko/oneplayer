import { FC } from 'react';
import styles from './SceneList.module.scss';
import { ISceneList } from './SceneList.typees';
import CustomButton from '../UI/CustomButton/CustomButton';
import CustomButtonStyles from '../UI/CustomButton/CustomButton.module.scss';

const SceneList: FC<ISceneList> = ({
  scenes,
  loading,
  onSceneClick,
  onClose,
}) => {
  return (
    <div
      className={styles.sceneListContainer}
      role="dialog"
      aria-labelledby="sceneListTitle"
    >
      <h3 id="sceneListTitle">
        Scènes
        <CustomButton
          className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--close']}`}
          onClick={onClose}
        >
          <span className="sr-only">Fermer la liste des scènes</span>
        </CustomButton>
      </h3>
      {loading && <p>Loading...</p>}
      {scenes.length > 0 ? (
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
      ) : (
        <p>Pas de scènes</p>
      )}
    </div>
  );
};

export default SceneList;
