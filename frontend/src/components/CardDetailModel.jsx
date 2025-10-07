import { useState, useEffect } from "react";

// Định nghĩa các màu nền card
const CARD_COLORS = [
    { name: "Mặc định", class: "bg-white", border: "border-slate-200" },
    { name: "Xanh dương", class: "bg-blue-100", border: "border-blue-300" },
    { name: "Vàng", class: "bg-yellow-100", border: "border-yellow-300" },
    { name: "Hồng", class: "bg-pink-100", border: "border-pink-300" },
    { name: "Xanh lá", class: "bg-green-100", border: "border-green-300" },
];

export default function CardDetailModal({ card, isOpen, onClose, onUpdate }) {
    // Các state cũ
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || "");
    const [deadline, setDeadline] = useState(card.deadline || "");
    const [completed, setCompleted] = useState(card.completed || false);
    const [color, setColor] = useState(card.color || "bg-white");
    const [attachments, setAttachments] = useState(card.attachments || []);
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

    // STATE MỚI: Quản lý comments
    const [comments, setComments] = useState(card.comments || []);
    const [newCommentText, setNewCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");


    useEffect(() => {
        setTitle(card.title);
        setDescription(card.description || "");
        setDeadline(card.deadline || "");
        setCompleted(card.completed || false);
        setColor(card.color || "bg-white");
        setAttachments(card.attachments || []);
        setComments(card.comments || []); // Load comments
    }, [card]);

    const handleSave = () => {
        onUpdate({
            ...card,
            title,
            description,
            deadline,
            completed,
            color,
            attachments,
            comments, // LƯU COMMENTS
        });
        onClose();
    };

    // --- LOGIC COMMENTS/ACTIVITY ---
    const handleAddComment = () => {
        if (newCommentText.trim()) {
            const newComment = {
                id: Date.now(),
                text: newCommentText.trim(),
                user: "Bạn", // Có thể thay bằng user hiện tại
                timestamp: new Date().toISOString(),
                icon: "💬", // Icon mặc định
            };
            setComments(prev => [...prev, newComment]);
            setNewCommentText("");
        }
    };

    const handleEditComment = (id, newText) => {
        setComments(prev =>
            prev.map(c =>
                c.id === id ? { ...c, text: newText } : c
            )
        );
        setEditingCommentId(null);
        setEditingCommentText("");
    };

    const handleDeleteComment = (id) => {
        setComments(prev => prev.filter(c => c.id !== id));
    };

    const handleToggleIcon = (id, newIcon) => {
        setComments(prev =>
            prev.map(c =>
                c.id === id ? { ...c, icon: newIcon } : c
            )
        );
    };
    // -------------------------------

    // --- LOGIC FILE UPLOAD (giữ nguyên) ---
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);

        const newAttachments = files.map(file => ({
            id: Date.now() + Math.random(),
            type: file.type.startsWith('image/') ? 'image' :
                file.type.startsWith('video/') ? 'video' : 'other',
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setAttachments(prev => [...prev, ...newAttachments]);
        event.target.value = null;
    };

    const handleRemoveAttachment = (id) => {
        const attachmentToRemove = attachments.find(a => a.id === id);
        if (attachmentToRemove && attachmentToRemove.url) {
            URL.revokeObjectURL(attachmentToRemove.url);
        }
        setAttachments(attachments.filter(a => a.id !== id));
    };
    // ----------------------------------------

    if (!isOpen) return null;

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString('vi-VN');
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && handleSave()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

                {/* Header (giữ nguyên) */}
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

                {/* CONTENT: CHIA LÀM 2 CỘT */}
                <div className="p-6 flex flex-col md:flex-row gap-8">

                    {/* PANEL TRÁI (Thông tin & Cài đặt) */}
                    <div className="md:w-1/3 space-y-6 flex-shrink-0">

                        {/* Khu vực chọn màu nền (giữ nguyên logic show/hide) */}
                        <div className="relative">
                            <label className="flex items-center gap-3 mb-2 text-slate-700 font-medium">
                                <span>🎨</span> Màu nền
                            </label>
                            <button
                                onClick={() => setIsColorPaletteOpen(prev => !prev)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors border flex items-center justify-between w-full ${
                                    color !== 'bg-white'
                                        ? `${color} text-slate-800 border-slate-300 shadow-md`
                                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${color}`} />
                                    {color !== 'bg-white' ? "Đã chọn màu" : "Chọn màu nền"}
                                </div>
                                <span className="ml-3 text-xs">
                                    {isColorPaletteOpen ? '▲' : '▼'}
                                </span>
                            </button>

                            {isColorPaletteOpen && (
                                <div className="absolute top-full left-0 mt-2 z-10 p-3 bg-white border border-slate-200 rounded-lg shadow-xl flex gap-2 w-full max-w-xs flex-wrap">
                                    {CARD_COLORS.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => {
                                                setColor(c.class);
                                                setIsColorPaletteOpen(false);
                                            }}
                                            className={`w-8 h-8 rounded-full transition-all duration-150 ${c.class} ${c.border} border-2 ${
                                                color === c.class ? "ring-4 ring-indigo-500 ring-offset-2" : "hover:ring-2 hover:ring-slate-300"
                                            }`}
                                            title={c.name}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Checkbox hoàn thành */}
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

                        {/* Deadline */}
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

                        {/* Mô tả */}
                        <div>
                            <label className="flex items-center gap-3 mb-2 text-slate-700 font-medium">
                                <span>📝</span> Mô tả
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Thêm mô tả chi tiết hơn..."
                                className="w-full min-h-[150px] px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
                            />
                        </div>

                        {/* Khu vực Tải lên File */}
                        <div>
                            <label className="flex items-center gap-3 mb-2 text-slate-700 font-medium">
                                <span>📎</span> Tệp đính kèm
                            </label>
                            <label className="inline-block cursor-pointer px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                Tải lên Hình ảnh/Video
                            </label>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {attachments.map((item) => (
                                    <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-md border border-slate-200">
                                        {item.type === 'image' && (
                                            <img src={item.url} alt={item.name} className="w-full h-24 object-cover" />
                                        )}
                                        {item.type === 'video' && (
                                            <video src={item.url} controls loop muted className="w-full h-24 object-cover" />
                                        )}
                                        <button
                                            onClick={() => handleRemoveAttachment(item.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Xóa"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    {/* HẾT PANEL TRÁI */}

                    {/* PANEL PHẢI (Nhận xét & Hoạt động) */}
                    <div className="md:w-2/3 space-y-6">
                        <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">💬 Nhận xét & Hoạt động</h3>

                        {/* INPUT BÌNH LUẬN */}
                        <div>
                            <div className="font-medium text-slate-700 mb-2">Viết bình luận</div>
                            <textarea
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                                placeholder="Nhập bình luận của bạn..."
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical min-h-[70px]"
                            />
                            <button
                                onClick={handleAddComment}
                                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
                                disabled={!newCommentText.trim()}
                            >
                                Bình luận
                            </button>
                        </div>

                        {/* DANH SÁCH BÌNH LUẬN/HOẠT ĐỘNG */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-slate-700">Lịch sử hoạt động</h4>
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
                                    <div className="text-2xl mt-1">{comment.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                            <span className="font-semibold text-slate-700">{comment.user}</span>
                                            <span>•</span>
                                            <span>{formatTime(comment.timestamp)}</span>
                                        </div>

                                        {editingCommentId === comment.id ? (
                                            // Chế độ chỉnh sửa
                                            <div className="flex flex-col gap-2">
                                                <textarea
                                                    value={editingCommentText}
                                                    onChange={(e) => setEditingCommentText(e.target.value)}
                                                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                                    rows="3"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditComment(comment.id, editingCommentText)}
                                                        className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs"
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingCommentId(null)}
                                                        className="px-3 py-1 bg-slate-200 text-slate-700 rounded-md text-xs"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Chế độ xem
                                            <p className="text-slate-800 whitespace-pre-wrap">{comment.text}</p>
                                        )}

                                        {/* Các nút thao tác */}
                                        {!editingCommentId && (
                                            <div className="mt-2 flex gap-3 text-xs text-slate-500">
                                                <button
                                                    onClick={() => {
                                                        setEditingCommentId(comment.id);
                                                        setEditingCommentText(comment.text);
                                                    }}
                                                    className="hover:text-indigo-600 font-medium"
                                                >
                                                    Chỉnh sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="hover:text-red-600 font-medium"
                                                >
                                                    Xóa
                                                </button>
                                                <button
                                                    onClick={() => handleToggleIcon(comment.id, comment.icon === '⭐' ? '💬' : '⭐')}
                                                    className="hover:text-yellow-600 font-medium"
                                                >
                                                    {comment.icon === '⭐' ? 'Bỏ ghim' : 'Ghim'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {comments.length === 0 && <p className="text-slate-500 text-sm italic">Chưa có hoạt động nào.</p>}
                        </div>

                    </div>
                    {/* HẾT PANEL PHẢI */}

                </div>

                {/* Footer (giữ nguyên) */}
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