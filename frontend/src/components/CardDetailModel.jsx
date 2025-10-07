import { useState, useEffect } from "react";

export default function CardDetailModel({ card, isOpen, onClose, onUpdate }) {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || "");
    const [deadline, setDeadline] = useState(card.deadline || "");
    const [completed, setCompleted] = useState(card.completed || false);

    useEffect(() => {
        setTitle(card.title);
        setDescription(card.description || "");
        setDeadline(card.deadline || "");
        setCompleted(card.completed || false);
    }, [card]);

    const handleSave = () => {
        onUpdate({
            ...card,
            title,
            description,
            deadline,
            completed,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && handleSave()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-start justify-between">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-2xl font-bold text-slate-800 w-full border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1"
                    />
                    <button
                        onClick={handleSave}
                        className="ml-4 text-slate-400 hover:text-slate-600 transition-colors text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span
                                className={`text-lg font-medium ${
                                    completed ? "text-green-600" : "text-slate-700"
                                }`}
                            >
                                {completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                            </span>
                        </label>
                    </div>

                    <div>
                        <label className="flex items-center gap-3 mb-2 text-slate-700 font-medium">
                            <span>📅</span> Thời hạn
                        </label>
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-3 mb-2 text-slate-700 font-medium">
                            <span>📝</span> Mô tả
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Thêm mô tả chi tiết hơn..."
                            className="w-full min-h-[200px] px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
                        />
                    </div>
                </div>

                <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 flex justify-end gap-3">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}