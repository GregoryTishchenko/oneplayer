export interface IScene {
  id: number;
  title: string;
  beginTimecode: number;
  endTimecode: number;
}

export interface ISceneList {
  scenes: IScene[];
  onSceneClick: (scene: IScene) => void;
  onClose: () => void;
}