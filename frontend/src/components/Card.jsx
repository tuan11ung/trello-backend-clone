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

    const handleClick = (e) => {
        console.log(`[Card ${card.id}] Card clicked, opening modal.`);
        onClick();
    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={handleClick}
            className="bg-gradient-to-r from-white/90 to-slate-50 text-slate-700 border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between gap-2">
                <span className={card.completed ? "line-through text-slate-400" : ""}>
                    {card.title}
                </span>

                <span
                    {...listeners}
                    className="text-slate-400 hover:text-slate-600 cursor-grab flex-shrink-0 ml-2"
                >
                    ☰
                </span>

                {card.completed && <span className="text-green-600 flex-shrink-0">✓</span>}
            </div>

            {hasDeadline && (
                <div
                    className={`flex items-center gap-1 mt-2 text-xs ${
                        isOverdue ? "text-red-600 font-medium" : "text-slate-500"
                    }`}
                >
                    <span>📅</span>
                    <span>{new Date(card.deadline).toLocaleDateString("vi-VN")}</span>
                </div>
            )}
        </div>
    );
}