import Movie from "./movies";

export interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}