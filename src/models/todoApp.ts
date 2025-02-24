import mongoose, { Schema } from "mongoose";

// define todoApp type

type todoType = {
  title: string;
  description?: string;
  completed: boolean;
  category: "work" | "personal" | "Groceries";
  createdAt: Date;
  updatedAt: Date;
};

// create  mongoose  schema

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Work", "personal", "Groceries"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model<todoType>("Todo", TodoSchema);

export default Todo;
