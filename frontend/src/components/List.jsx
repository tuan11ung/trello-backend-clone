import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { useRef, useEffect, useState } from "react";

export default function List({ list, updateCards }) {
    const containerRef = useRef(null);
    const inputRef = useRef(null);

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

    const [cards, setCards] = useState(list.cards || []);
    const [isAdding, setIsAdding] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");

    useEffect(() => {
        setCards(list.cards);
    }, [list.cards]);

    useEffect(() => {
        if (isAdding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdding]);

    const handleAddCard = () => {
        if (newCardTitle.trim()) {
            const newCard = {
                id: Date.now().toString(),
                title: newCardTitle.trim()
            };
            const newCards = [...cards, newCard];
            setCards(newCards);
            updateCards(list.id, newCards);

            setNewCardTitle("");
            setIsAdding(false);

            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, 0);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddCard();
        } else if (e.key === "Escape") {
            setIsAdding(false);
            setNewCardTitle("");
        }
    };

    const dynamicHeight = Math.min(120 + list.cards.length * 60, 500);

    return (
        <div
            ref={setNodeRef}
            style={{ ...style, height: `${dynamicHeight}px` }}
            className={`min-w-[260px] bg-gradient-to-br ${
                colors[list.title] || "from-white to-slate-50"
            } rounded-2xl p-4 shadow-lg backdrop-blur-md flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-xl`}
        >
            {/* Header có thể kéo */}
                <h2
                    {...attributes}
                    {...listeners}
                    className="font-semibold text-lg mb-1 text-slate-800 cursor-grab active:cursor-grabbing"
                >
                    {list.title}
                </h2>

                <SortableContext items={list.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                    <div
                        ref={containerRef}
                        className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none', /* Firefox */
                            msOverflowStyle: 'none'  /* IE and Edge */
                        }}
                    >
                        {list.cards.map((card) => (
                            <Card key={card.id} card={card} />
                        ))}
                    </div>
                </SortableContext>

                {/* Form add card - không bị ảnh hưởng bởi drag listeners */}
                {isAdding ? (
                    <div className="flex flex-col gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Nhập tiêu đề thẻ..."
                            className="px-3 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddCard}
                                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                                Thêm
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewCardTitle("");
                                }}
                                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 text-left font-medium transition-colors hover:bg-indigo-50 rounded-lg py-2 px-2"
                    >
                        + Thêm thẻ
                    </button>
                )}
        </div>
    );
}