import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { useRef, useEffect, useState } from "react";

export default function List({ list, updateCards, onCardClick }) {
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

    const handleAddCard = () => {
        if (newCardTitle.trim()) {
            const newCard = {
                id: Date.now().toString(),
                title: newCardTitle.trim(),
                color: "bg-white",
                attachments: [],
                comments: [],
            };
            const newCards = [...cards, newCard];
            setCards(newCards);
            updateCards(list.id, newCards);

            setNewCardTitle("");
            setIsAdding(false);

            // Bỏ cuộn tự động vì List sẽ tự mở rộng
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleAddCard();
        else if (e.key === "Escape") {
            setIsAdding(false);
            setNewCardTitle("");
        }
    };

    // LOẠI BỎ: dynamicHeight

    return (
        <div
            ref={setNodeRef}
            // THAY ĐỔI: Bỏ style height: `${dynamicHeight}px`
            style={style}
            // THAY ĐỔI: Bỏ h-screen/max-h-screen hoặc các ràng buộc chiều cao khác
            className={`min-w-[260px] h-fit bg-gradient-to-br ${ // Dùng h-fit để chiều cao co lại theo nội dung
                colors[list.title] || "from-white to-slate-50"
            } rounded-2xl p-4 shadow-lg backdrop-blur-md flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-xl`}
        >
            <h2
                {...attributes}
                {...listeners}
                className="font-semibold text-lg mb-1 text-slate-800 cursor-grab active:cursor-grabbing"
            >
                {list.title}
            </h2>

            <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div
                    ref={containerRef}
                    // THAY ĐỔI: Xóa overflow-y-auto và flex-1. Thẻ div sẽ tự mở rộng.
                    className="flex flex-col gap-2"
                >
                    {cards.map((card) => (
                        <Card key={card.id} card={card} onClick={() => onCardClick(card)} />
                    ))}
                </div>
            </SortableContext>

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