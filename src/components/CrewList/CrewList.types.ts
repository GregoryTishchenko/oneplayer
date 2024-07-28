export interface ICrew {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface ICrewList {
  crew: ICrew[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
}
