/// <reference types="vite/client" />

interface IVideo {
  id: number;
  title: string;
  description: string;
  logo?: string;
  poster?: string;
  url: string;
  beginTimecode: number;
  endTimecode: number;
  scenesApi?: string;
  crewApi?: string;
}