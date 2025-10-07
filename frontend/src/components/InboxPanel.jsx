import React from 'react';

export default function InboxPanel({ onClose, lists }) {
    // Logic mẫu cho Total Unread Count
    const totalUnread = lists.reduce((sum, list) => {
        // Giả định card.hasNewNotification là true/false
        return sum + list.cards.filter(c => c.hasNewNotification).length;
    }, 0);

    return (
        <div className="flex flex-col h-screen min-w-[300px] bg-slate-800 text-white shadow-xl flex-shrink-0">
            {/* Header của Inbox */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h2 className="text-xl font-bold">📧 Hộp thư đến</h2>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white transition-colors text-2xl"
                    title="Đóng Hộp thư đến"
                >
                    ✕
                </button>
            </div>

            {/* Nội dung Hộp thư đến */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Thông báo tổng quát */}
                <div className="p-3 bg-slate-700 rounded-lg">
                    <h3 className="text-lg font-semibold mb-1">Inbox</h3>
                    <p className="text-sm text-slate-400">
                        {totalUnread > 0
                            ? `Bạn có ${totalUnread} thông báo chưa đọc.`
                            : 'Hộp thư đến sạch sẽ!'}
                    </p>
                </div>

                {/* Khu vực công cụ/ứng dụng (dựa trên ảnh Trello mẫu) */}
                <div className="space-y-3">
                    <h3 className="text-base font-semibold border-b border-slate-700 pb-2">Tổng hợp việc cần làm</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* Biểu tượng ứng dụng mẫu */}
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-blue-700 transition-colors">G</div>
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-red-700 transition-colors">M</div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-yellow-600 transition-colors">O</div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-green-600 transition-colors">T</div>
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-purple-700 transition-colors">E</div>
                    </div>
                </div>

                {/* Mục Tùy chỉnh (dựa trên ảnh mẫu) */}
                <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <input type="checkbox" id="myItems" className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer bg-slate-700" />
                        <label htmlFor="myItems">Chỉ mình bạn có thể thấy Hộp thư đến</label>
                    </div>
                </div>

            </div>
        </div>
    );
}