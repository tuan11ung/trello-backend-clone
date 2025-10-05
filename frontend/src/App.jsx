import Board from "./components/Board";

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4527A0] via-[#6A1B9A] to-[#AD1457] p-6">
            <h1 className="text-white text-3xl font-bold mb-6">Bảng công việc của tôi</h1>
            <Board />
        </div>
    );
}
