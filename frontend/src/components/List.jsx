import { useSortable, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { useState } from "react";

export default function List({ list }) {
    const [cards, setCards] = useState(list.cards);

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: list.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const colors = {
        "Hôm nay": "bg-yellow-700/90",
        "Tuần này": "bg-green-800/90",
        "Sau này": "bg-black/80",
    };

    const addCard = () => {
        const newCard = { id: Date.now().toString(), title: `Thẻ mới ${cards.length + 1}` };
        setCards([...cards, newCard]);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`min-w-[260px] ${colors[list.title] || "bg-slate-800/90"} text-white rounded-xl p-4 shadow-md backdrop-blur-sm flex flex-col gap-3 transition-transform hover:-translate-y-1`}
        >
            <h2 className="font-semibold text-lg mb-1">{list.title}</h2>

            <SortableContext items={cards.map((c) => c.id)} strategy={rectSortingStrategy}>
                <div className="flex flex-col gap-2 flex-1">
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </div>
            </SortableContext>

            <button
                onClick={addCard}
                className="text-sm text-yellow-300 hover:text-white mt-2 text-left font-medium"
            >
                + Thêm thẻ
            </button>
        </div>
    );
}
