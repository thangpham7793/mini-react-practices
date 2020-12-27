import { Movie } from "../types"

class MovieService {
  private static _instance: MovieService

  async getMovies(): Promise<Movie[]> {
    return await (await fetch("src/assets/data.json")).json()
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new MovieService()
    }
    return this._instance
  }
}

export default MovieService.getInstance()
