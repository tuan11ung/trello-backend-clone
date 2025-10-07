import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ card }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-gradient-to-r from-white/90 to-slate-50 text-slate-700 border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all cursor-grab active:cursor-grabbing"
        >
            {card.title}
        </div>
    );
}