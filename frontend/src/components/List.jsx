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
        "Hôm nay": "from-yellow-100 to-yellow-200",
        "Tuần này": "from-green-100 to-green-200",
        "Sau này": "from-slate-200 to-slate-300",
    };

    const addCard = () => {
        const newCard = { id: Date.now().toString(), title: `Thẻ mới ${cards.length + 1}` };
        setCards([...cards, newCard]);
    };

    // Chiều cao linh hoạt: nhỏ lúc đầu, tăng dần khi có nhiều thẻ
    const dynamicHeight = Math.min(120 + cards.length * 60, 500);
    // bắt đầu 120px, mỗi thẻ thêm ~60px, giới hạn 500px

    return (
        <div
            ref={setNodeRef}
            style={{ ...style, height: `${dynamicHeight}px` }}
            {...attributes}
            {...listeners}
            className={`min-w-[260px] bg-gradient-to-br ${
                colors[list.title] || "from-white to-slate-50"
            } rounded-2xl p-4 shadow-lg backdrop-blur-md flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-xl`}
        >
            <h2 className="font-semibold text-lg mb-1 text-slate-800">{list.title}</h2>

            <SortableContext items={cards.map((c) => c.id)} strategy={rectSortingStrategy}>
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </div>
            </SortableContext>

            <button
                onClick={addCard}
                className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 text-left font-medium transition-colors"
            >
                + Thêm thẻ
            </button>
        </div>
    );
}

