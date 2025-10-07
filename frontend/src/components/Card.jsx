import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ card, onClick }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const isOverdue = card.deadline && new Date(card.deadline) < new Date() && !card.completed;
    const hasDeadline = card.deadline;

    // LẤY MÀU NỀN
    const cardBackgroundColor = card.color || "bg-gradient-to-r from-white/90 to-slate-50";

    // Hàm click cho Card (mở modal)
    const handleClick = (e) => {
        onClick();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            // Chỉ gán sự kiện click cho div chính (mở modal)
            onClick={handleClick}
            // Áp dụng màu nền card
            className={`${cardBackgroundColor} text-slate-700 border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all cursor-pointer group`}
        >
            {/* Hàng đầu tiên: Tiêu đề, Hoàn thành, Drag Handle */}
            <div className="flex items-start justify-between gap-2">

                {/* TIÊU ĐỀ THẺ: GIỚI HẠN HIỂN THỊ CHỈ MỘT DÒNG */}
                <span
                    className={`flex-1 min-w-0 truncate ${
                        card.completed ? "line-through text-slate-400" : ""
                    }`}
                    title={card.title}
                >
                    {card.title}
                </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                    {card.completed && <span className="text-green-600">✓</span>}

                    {/* DRAG HANDLE: GÁN LISTENERS Ở ĐÂY */}
                    <span
                        {...listeners}
                        className="text-slate-400 hover:text-slate-600 cursor-grab ml-1"
                        // Ngăn chặn mở modal khi click vào handle kéo
                        onClick={(e) => e.stopPropagation()}
                    >
                        ☰
                    </span>
                </div>
            </div>

            {/* THỜI HẠN: Đảm bảo hiển thị đầy đủ */}
            {hasDeadline && (
                <div
                    // THÊM: flex-shrink-0 để ngăn nó bị co lại khi thẻ nhỏ
                    className={`flex items-center gap-1 mt-2 text-xs flex-shrink-0 ${
                        isOverdue ? "text-red-600 font-medium" : "text-slate-500"
                    }`}
                >
                    <span>📅</span>
                    <span className="flex-shrink-0">{new Date(card.deadline).toLocaleDateString("vi-VN")}</span>
                </div>
            )}

            {/* Thêm biểu tượng file đính kèm/bình luận nếu có */}
            <div className="flex gap-2 text-slate-500 mt-2 text-xs">
                {card.attachments && card.attachments.length > 0 && (
                    <span title={`${card.attachments.length} tệp đính kèm`} className="flex items-center gap-1">
                        📎 {card.attachments.length}
                    </span>
                )}
                {card.comments && card.comments.length > 0 && (
                    <span title={`${card.comments.length} bình luận`} className="flex items-center gap-1">
                        💬 {card.comments.length}
                    </span>
                )}
            </div>

        </div>
    );
}