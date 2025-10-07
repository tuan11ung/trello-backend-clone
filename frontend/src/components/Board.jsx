import { useState } from "react";
import List from "./List";
import CardDetailModel from "./CardDetailModel.jsx";
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";

export default function Board() {
    const [lists, setLists] = useState([
        { id: "1", title: "Hôm nay", cards: [
                // Thêm trường 'attachments' (mặc định là mảng rỗng)
                { id: "c1", title: "Thiết kế trang chính", color: "bg-white", attachments: [] }
            ] },
        { id: "2", title: "Tuần này", cards: [
                { id: "c2", title: "Tạo API", color: "bg-white", attachments: [] }
            ] },
        { id: "3", title: "Sau này", cards: [] },
    ]);

    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleCardClick = (card) => {
        console.log(`[Board] Card clicked: ${card.title} (${card.id})`);
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log("[Board] Closing modal.");
        setIsModalOpen(false);
        setSelectedCard(null);
    };

    const handleUpdateCard = (updatedCard) => {
        setLists(prev =>
            prev.map(list => ({
                ...list,
                cards: list.cards.map(c => (c.id === updatedCard.id ? updatedCard : c)),
            }))
        );
    };

    const updateCards = (listId, newCards) => {
        setLists(prev => prev.map(l => (l.id === listId ? { ...l, cards: newCards } : l)));
    };

    const addList = () => {
        setLists([...lists, { id: Date.now().toString(), title: "Danh sách mới", cards: [] }]);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const oldListIndex = lists.findIndex(l => l.cards.some(c => c.id === active.id));
        const newListIndex = lists.findIndex(l => l.cards.some(c => c.id === over.id));
        if (oldListIndex === -1 || newListIndex === -1) return;

        const oldList = lists[oldListIndex];
        const newList = lists[newListIndex];
        const card = oldList.cards.find(c => c.id === active.id);

        if (oldList.id === newList.id) {
            const oldIndex = oldList.cards.findIndex(c => c.id === active.id);
            const newIndex = oldList.cards.findIndex(c => c.id === over.id);
            const newCards = arrayMove(oldList.cards, oldIndex, newIndex);
            updateCards(oldList.id, newCards);
        } else {
            updateCards(oldList.id, oldList.cards.filter(c => c.id !== active.id));
            updateCards(newList.id, [...newList.cards, card]);
        }
    };

    return (
        <>
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="relative w-full h-screen bg-slate-100 p-4 overflow-x-auto flex gap-6">
                    <SortableContext items={lists.map(l => l.id)} strategy={rectSortingStrategy}>
                        {lists.map(list => (
                            <List
                                key={list.id}
                                list={list}
                                updateCards={updateCards}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </SortableContext>

                    <button
                        onClick={addList}
                        className="min-w-[260px] h-fit bg-white/70 hover:bg-white/90 text-slate-700 rounded-2xl p-4 border border-dashed border-slate-400 text-left font-medium shadow-md hover:shadow-lg transition-all"
                    >
                        + Thêm danh sách
                    </button>
                </div>
            </DndContext>

            {selectedCard && (
                <CardDetailModel
                    card={selectedCard}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateCard}
                />
            )}
        </>
    );
}