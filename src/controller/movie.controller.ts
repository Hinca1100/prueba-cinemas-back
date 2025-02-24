import { Request, Response } from "express";
import { MovieFacade } from "../facades/movie.facade";

const movieFacade = new MovieFacade();

// Obtener todas las películas
export const getMovies = async (req: Request, res: Response) => {
  try {
    console.log("Obteniendo todas las películas...");
    const movies = await movieFacade.getMovies(); // 🔹 Llama al método correcto de la fachada
    res.json(movies); // 🔹 Devuelve la lista de películas
  } catch (error) {
    console.error("Error en getMovies:", error);
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

export const getMoviesId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movies =  await movieFacade.getMoviesId(id);
    console.log("Obteniendo pelicula en especifico");
    res.json(movies); // 🔹 Devuelve una pelicula en especifico
  } catch (error) {
    console.error("Error en getMovies:", error);
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

// Crear una película
export const createMovie = async (req: Request, res: Response) => {
  try {
    console.log("Cuerpo recibido en la petición:", req.body);
    const { title, genre, duration, classification } = req.body;
    const newMovie = await movieFacade.createMovie(title, genre, duration, classification);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error en createMovie:", error); // 👈 Esto mostrará más detalles en la consola
    res.status(500).json({ message: "Error al crear la película" });
  }
};

// Eliminar una película
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await movieFacade.deleteMovie(id);
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película" });
  }
};