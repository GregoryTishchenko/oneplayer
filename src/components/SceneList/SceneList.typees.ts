export interface IScene {
  id: number;
  title: string;
  beginTimecode: number;
  endTimecode: number;
}

export interface ISceneList {
  scenes: IScene[];
  loading: boolean;
  error: string | null;
  onSceneClick: (scene: IScene) => void;
  onClose: () => void;
  sceneDetailsApi?: string;
}

export interface ICasting {
  id: number;
  description: string;
  name: string;
  image: string;
}

export interface IReaction {
  name: string;
  message: string;
  timecode: number;
}

export interface ISceneDetails {
  id: number;
  title: string;
  casting: ICasting[];
  image: string;
  reactions: IReaction[];
  beginTimecode: number;
  endTimecode: number;
}

export interface ISceneDetailsProps {
  sceneDetails: ISceneDetails;
  onSceneClick: () => void;
}

export interface IScenes {
  sceneDetails: ISceneDetails;
  onSceneClick: () => void;
  isLoading: boolean;
}