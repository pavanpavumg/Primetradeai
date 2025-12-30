import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    status: { type: String, enum: ["todo", "inprogress", "done"], default: "todo" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
