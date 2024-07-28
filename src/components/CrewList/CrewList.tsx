import { FC } from 'react';
import styles from './CrewList.module.scss';
import { ICrewList } from './CrewList.types';
import CustomButton from '../UI/CustomButton/CustomButton';
import CustomButtonStyles from '../UI/CustomButton/CustomButton.module.scss';

const CrewList: FC<ICrewList> = ({ crew, loading, onClose }) => {
  return (
    <div
      className={styles.crewListContainer}
      role="dialog"
      aria-labelledby="crewListTitle"
    >
      <CustomButton
        className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--close']}`}
        onClick={onClose}
      >
        <span className="sr-only">Fermer la liste des membres de l'équipe</span>
      </CustomButton>

      <h3 id="crewListTitle">Liste des membres de l'équipe</h3>
      {loading && <p>Loading...</p>}
      {crew.length > 0 && (
        <ul role="list">
          {crew.map((member) => (
            <li key={member.id} role="listitem">
              <p className={styles.role}>{member.role}</p>
              <p>{member.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CrewList;
