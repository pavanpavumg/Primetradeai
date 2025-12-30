import Task from '../models/Task.js';

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        res.status(400).json({ message: 'Please add a title' });
        return;
    }

    const task = await Task.create({
        user: req.user._id,
        title,
        description,
        status,
    });

    res.status(201).json(task);
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    if (task.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'User not authorized' });
        return;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.json(updatedTask);
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    if (task.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'User not authorized' });
        return;
    }

    await task.deleteOne();

    res.json({ id: req.params.id });
};

export {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
