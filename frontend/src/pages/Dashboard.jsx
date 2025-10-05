import Board from "../components/Board";

export default function Dashboard() {
    return (
        <div className="p-6">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-slate-800">My Task Board</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                    + New Board
                </button>
            </header>
            <Board />
        </div>
    );
}
