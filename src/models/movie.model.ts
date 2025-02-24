import { Schema, model } from "mongoose";

export interface IMovie {
  title: string;
  genre: string;
  duration: number;
  classification: string;
}

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  classification: { type: String, required: true },
});

export const Movie = model<IMovie>("Movie", MovieSchema);