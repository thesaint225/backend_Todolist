import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

// define todoApp type

type todoType = {
  title: string;
  slug: string;
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
    slug: {
      type: String,
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
      enum: ["Work", "Personal", "Groceries"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.pre<todoType>("save", function (next) {
  this.slug = slugify(this.title.toString(), {
    lower: true,
    trim: true,
  });
  next();
});

const Todo = mongoose.model<todoType>("Todo", TodoSchema);

export default Todo;
