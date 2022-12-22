import { useState } from "react";

interface Movie {
  id: string;
  name: string;
  price: number;
}

const mockMovies: Movie[] = [
  {
    id: "aa",
    name: " 아바타",
    price: 12000,
  },
  {
    id: "bb",
    name: "ㅇㅇㅇ",
    price: 10000,
  },
];

function useMovie() {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  //   const [currentMovie, setCurrentMovie] = useState<Movie | null>();
  const [currentMovie, setCurrentMovie] = useState<Movie>(mockMovies[0]);
  return {};
}

export default useMovie;
