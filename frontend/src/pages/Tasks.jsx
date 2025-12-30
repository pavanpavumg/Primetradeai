import { useState, useEffect, useContext } from 'react';
import taskService from '../api/tasks';
import AuthContext from '../context/AuthContext';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = user?.token;
                if (token) {
                    const data = await taskService.getTasks(token);
                    setTasks(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, [user]);

    const onAdd = async (e) => {
        e.preventDefault();
        if (!newTaskTitle) return;

        try {
            const taskData = { title: newTaskTitle, status: 'pending' };
            const token = user.token;
            const createdTask = await taskService.createTask(taskData, token);
            setTasks([...tasks, createdTask]);
            setNewTaskTitle('');
        } catch (error) {
            console.error(error);
        }
    };

    const onDelete = async (id) => {
        try {
            const token = user.token;
            await taskService.deleteTask(id, token);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>

            <form onSubmit={onAdd} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="New Task Title"
                    className="border p-2 rounded flex-grow max-w-md"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Add
                </button>
            </form>

            <ul className="space-y-4 max-w-md">
                {tasks.map((task) => (
                    <li key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <span>{task.title}</span>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
                {tasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}
            </ul>
        </div>
    );
};

export default Tasks;
