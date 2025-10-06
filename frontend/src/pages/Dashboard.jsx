import Board from "../components/Board";

export default function Dashboard() {
    return (
        <div className="p-8">
            <header className="flex items-center justify-between mb-8 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold text-slate-800">My Task Board</h1>
                <button className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-violet-600 transition-all">
                    + New Board
                </button>
            </header>
            <Board />
        </div>
    );
}
