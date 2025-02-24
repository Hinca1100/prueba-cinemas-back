import { Movie } from "../models/movie.model";

export class MovieFacade {
  async getMovies() {
    return await Movie.find();
  }

  async getMoviesId(id: string) {
    return await Movie.findById(id);
  }

  async createMovie(title: string, genre: string, duration: number, classification: string) {
    const newMovie = new Movie({ title, genre, duration, classification });
    return await newMovie.save();
  }

  async updateMovie(id: string, updateData: any) {
    return await Movie.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteMovie(id: string) {
    return await Movie.findByIdAndDelete(id);
  }
}