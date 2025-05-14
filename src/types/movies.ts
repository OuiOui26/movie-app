export default interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date:string;
  genre_ids: number[];
  popularity: number;
};
