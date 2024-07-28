import { FC } from 'react';
import styles from './SceneList.module.scss';
import { ISceneDetailsProps } from './SceneList.typees';
import CustomButton from '../UI/CustomButton/CustomButton';
import CustomButtonStyles from '../UI/CustomButton/CustomButton.module.scss';

const SceneDetails: FC<ISceneDetailsProps> = ({
  sceneDetails,
  onSceneClick,
}) => {
  return (
    <div className={styles.accordion}>
      {sceneDetails.casting && (
        <>
          <h4>Casting:</h4>
          <ul>
            {sceneDetails.casting.map((cast) => (
              <li key={cast.id}>
                {cast.name}: ({cast.description})
              </li>
            ))}
          </ul>
        </>
      )}

      {sceneDetails.reactions && (
        <>
          <h4>Reactions:</h4>
          <ul>
            {sceneDetails.reactions.map((reaction, index) => (
              <li key={index}>
                <span>{reaction.name}:</span> {reaction.message}
              </li>
            ))}
          </ul>
        </>
      )}

      <CustomButton
        className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--border']}`}
        onClick={onSceneClick}
      >
        Accédez à la scène
      </CustomButton>
    </div>
  );
};

export default SceneDetails;
