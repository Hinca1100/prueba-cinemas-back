import { Router } from "express";
import { getMovies, createMovie, deleteMovie, getMoviesId } from "../controller/movie.controller";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMoviesId);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);

export default router;