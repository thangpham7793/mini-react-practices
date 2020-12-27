import React, { useEffect, useState } from "react"
import { Movie } from "../types"
import { MovieCard } from "../components/MovieCard"
import MovieService from "../services/MovieService"

export const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      const movies = await MovieService.getMovies()
      if (movies) {
        setLoading(false)
        setMovies(movies)
      }
    }
    fetchMovies()
  }, [])

  return loading ? (
    <div>Loading</div>
  ) : (
    <div>
      {movies?.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  )
}
