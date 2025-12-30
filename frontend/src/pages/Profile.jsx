import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import Layout from "../components/Layout";
import toast from 'react-hot-toast';
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put('/auth/profile', { name, email });
            toast.success("Profile Updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        }
    };

    return (
        <Layout>
            <PageTransition>
                <div className="max-w-md mx-auto mt-6 glass p-8 rounded-3xl shadow-2xl border border-white/20">
                    <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-[var(--gradient)]">
                        Profile
                    </h2>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase mb-2 block">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-xs text-gray-500 dark:text-gray-300 ml-1 font-semibold uppercase mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="neon-glow p-3 w-full rounded-xl glass bg-white/50 dark:bg-black/20 focus:outline-none"
                                required
                            />
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            type="submit"
                            className="btn-primary w-full flex justify-center py-3 rounded-xl font-bold shadow-lg neon-glow"
                        >
                            Update Profile
                        </motion.button>
                    </form>
                </div>
            </PageTransition>
        </Layout>
    );
};

export default Profile;
