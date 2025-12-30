import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success("Registration Successful! 🎉");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.form
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .6, type: "spring" }}
                onSubmit={onSubmit}
                className="glass p-10 rounded-3xl w-full max-w-sm text-center border border-white/20 shadow-2xl"
            >
                <h2 className="text-4xl font-bold mb-2 text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                    Register
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mb-8">Join TaskFlow today</p>

                <div className="mb-4 text-left">
                    <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name here"
                        className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4 text-left">
                    <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="pavanmg@example.com"
                        className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-8 text-left">
                    <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="••••••••"
                        className="neon-glow p-3 w-full rounded-xl mb-2 glass bg-white/50 dark:bg-black/20 focus:outline-none"
                        required
                    />
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-full py-3 rounded-xl font-bold text-white shadow-lg btn-primary neon-glow"
                >
                    Sign Up
                </motion.button>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 font-bold hover:underline">Login</Link>
                </div>
            </motion.form>
        </div>
    );
};

export default Register;
