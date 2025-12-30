import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const task = await Task.create({ ...req.body, userId: req.user });
    res.json(task);
});

router.get("/", auth, async (req, res) => {
    const search = req.query.search || "";
    const status = req.query.status || "all";
    const sort = req.query.sort || "latest";
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const filter = {
        userId: req.user,
        title: { $regex: search, $options: "i" },
        ...(status !== "all" && { status })
    };

    const sortOption = {
        latest: { createdAt: -1 },
        oldest: { createdAt: 1 },
        az: { title: 1 },
        za: { title: -1 },
    }[sort] || { createdAt: -1 };

    const tasks = await Task.find(filter).sort(sortOption).skip(skip).limit(limit);
    const total = await Task.countDocuments(filter);

    res.json({
        tasks,
        total,
        hasMore: page * limit < total,
    });
});

router.put("/:id", auth, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

export default router;
