import { useState } from "react";
import List from "./List";
import CardDetailModal from "./CardDetailModel";
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import InboxPanel from "./InboxPanel";

export default function Board() {
    const [lists, setLists] = useState([
        { id: "1", title: "Hôm nay", cards: [
                { id: "c1", title: "Thiết kế trang chính", color: "bg-white", description: "", deadline: "", completed: false, attachments: [], comments: [] }
            ] },
        { id: "2", title: "Tuần này", cards: [
                { id: "c2", title: "Tạo API", color: "bg-white", description: "", deadline: "", completed: false, attachments: [], comments: [] }
            ] },
        { id: "3", title: "Sau này", cards: [] },
    ]);

    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInboxOpen, setIsInboxOpen] = useState(true);

    const toggleInbox = () => setIsInboxOpen(prev => !prev);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
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

                {/* Board Layout Container: Giữ h-screen (100vh) ở đây */}
                <div
                    className={`relative w-full h-screen grid ${ // H-SCREEN TẠO RA 100% CHIỀU CAO
                        isInboxOpen
                            ? 'grid-cols-[300px_1fr]'
                            : 'grid-cols-1'
                    }`}
                >

                    {/* 1. INBOX PANEL */}
                    {isInboxOpen && (
                        <InboxPanel
                            onClose={toggleInbox}
                            lists={lists}
                        />
                    )}

                    {/* 2. MAIN BOARD - KHU VỰC CẦN CUỘN NGANG */}
                    <div
                        // THAY ĐỔI QUAN TRỌNG:
                        // 1. Dùng h-full để chiếm trọn ô grid.
                        // 2. Padding p-4 làm nội dung tràn ra, nên chúng ta cần đảm bảo
                        //    chiều cao của List bên trong không gây cuộn dọc.
                        //    Tuy nhiên, nếu bạn muốn scrollbar ngang ở cuối màn hình,
                        //    thì h-full và overflow-x-auto là đúng.
                        className={`p-4 overflow-x-auto flex gap-6 h-full`} // H-FULL GIẢI QUYẾT OVERFLOW-Y
                        style={{ background: 'linear-gradient(135deg, #3b006c 0%, #1e004d 50%, #0c0033 100%)' }}
                    >
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
                            className="min-w-[260px] h-fit bg-white/10 hover:bg-white/20 text-white rounded-2xl p-4 border border-dashed border-white/40 text-left font-medium shadow-md hover:shadow-lg transition-all"
                        >
                            + Thêm danh sách
                        </button>
                    </div>
                </div>
            </DndContext>

            {selectedCard && (
                <CardDetailModal
                    card={selectedCard}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateCard}
                />
            )}

            <button
                onClick={toggleInbox}
                className="fixed bottom-4 left-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 z-50"
                title={isInboxOpen ? "Đóng Inbox" : "Mở Inbox"}
            >
                {isInboxOpen ? "⬅️" : "✉️"}
            </button>
        </>
    );
}