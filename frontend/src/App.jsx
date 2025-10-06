import Board from "./components/Board";

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-200 p-8">
            <h1 className="text-slate-800 text-3xl font-bold mb-6 drop-shadow-sm">
                Bảng công việc của tôi
            </h1>
            <Board />
        </div>
);
}
