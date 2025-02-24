import { Router } from "express";
import { getMovies, createMovie, deleteMovie, getMoviesId, updateMovie } from "../controller/movie.controller";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMoviesId);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);


export default router;