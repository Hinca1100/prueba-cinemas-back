import { Schema, model } from "mongoose";

export interface IRoom {
  name: string;
  capacity: number;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});

export const Room = model<IRoom>("Room", RoomSchema);