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
}