import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)] transition-colors duration-300">

            <Sidebar />

            {/* Main UI */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full pt-20 md:pt-10">
                {children}
            </main>
        </div>
    );
}
