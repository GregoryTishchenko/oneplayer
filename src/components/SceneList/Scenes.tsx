import { FC, useState } from 'react';
import ApiServices from '../../Api/ApiServices';
import useFetch from '../../hooks/useFetch';
import { ISceneDetails, ISceneList } from './SceneList.typees';
import SceneDetails from './SceneDetails';

const formatTime = (timecode: number): string => {
  const minutes = Math.floor(timecode / 60);
  const seconds = timecode % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Scenes: FC<ISceneList> = ({ scenes, onSceneClick, sceneDetailsApi }) => {
  const [expandedScene, setExpandedScene] = useState<number | null>(null);
  const [sceneDetails, setSceneDetails] = useState<ISceneDetails | null>(null);

  const [fetchSceneDetails, isLoading] = useFetch(
    async (beginTimecode: number) => {
      const response = await ApiServices.getSceneDetails(
        sceneDetailsApi,
        beginTimecode
      );
      setSceneDetails(response);
    }
  );

  const handleSceneClick = async (sceneId: number, beginTimecode: number) => {
    if (expandedScene === sceneId) {
      setExpandedScene(null);
    } else {
      setExpandedScene(sceneId);
      await fetchSceneDetails(beginTimecode);
    }
  };

  return (
    <ul role="list">
      {scenes.map((scene) => (
        <li key={scene.id} role="listitem">
          <button
            onClick={() => handleSceneClick(scene.id, scene.beginTimecode)}
            aria-label={`Voir la scène : ${scene.title}`}
          >
            {scene.title} ({formatTime(scene.beginTimecode)} -{' '}
            {formatTime(scene.endTimecode)})
          </button>

          {expandedScene === scene.id && sceneDetails && (
            <SceneDetails
              sceneDetails={sceneDetails}
              onSceneClick={() => onSceneClick(scene)}
              isLoading={isLoading}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Scenes;
