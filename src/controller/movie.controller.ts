import { Request, Response } from "express";
import { MovieFacade } from "../facades/movie.facade";
import mongoose from "mongoose";

const movieFacade = new MovieFacade();

// Obtener todas las películas
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieFacade.getMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error en getMovies:", error);
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

export const getMoviesId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movies = await movieFacade.getMoviesId(id);
    console.log("Obteniendo pelicula en especifico");
    res.json(movies);
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
    const newMovie = await movieFacade.createMovie(
      title,
      genre,
      duration,
      classification
    );
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error en createMovie:", error);
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

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const updatedMovie = await movieFacade.updateMovie(id, updateData);

    if (!updatedMovie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    res.json(updatedMovie);
  } catch (error) {
    console.error("Error al actualizar la película:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
