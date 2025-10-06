import { useState } from "react";
import List from "./List";
import {
    DndContext,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

export default function Board() {
    const [lists, setLists] = useState([
        {
            id: "1",
            title: "Hôm nay",
            cards: [
                { id: "c1", title: "Thiết kế trang chính" },
                { id: "c2", title: "Tạo API cho project" },
            ],
        },
        {
            id: "2",
            title: "Tuần này",
            cards: [
                { id: "c3", title: "Xây dựng form đăng nhập" },
                { id: "c4", title: "Kết nối database" },
            ],
        },
        {
            id: "3",
            title: "Sau này",
            cards: [{ id: "c5", title: "Triển khai lên server" }],
        },
    ]);

    const sensors = useSensors(useSensor(PointerSensor));

    const findContainer = (id) => {
        if (lists.find((list) => list.id === id)) return id;
        return lists.find((list) => list.cards.some((card) => card.id === id))?.id;
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);
        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        setLists((prev) => {
            const activeList = prev.find((l) => l.id === activeContainer);
            const overList = prev.find((l) => l.id === overContainer);
            const activeCard = activeList.cards.find((c) => c.id === active.id);

            return prev.map((list) => {
                if (list.id === activeContainer) {
                    return { ...list, cards: list.cards.filter((c) => c.id !== active.id) };
                }
                if (list.id === overContainer) {
                    return { ...list, cards: [...list.cards, activeCard] };
                }
                return list;
            });
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (activeContainer === overContainer) {
            const list = lists.find((l) => l.id === activeContainer);
            const oldIndex = list.cards.findIndex((c) => c.id === active.id);
            const newIndex = list.cards.findIndex((c) => c.id === over.id);
            setLists((prev) =>
                prev.map((l) =>
                    l.id === activeContainer
                        ? { ...l, cards: arrayMove(l.cards, oldIndex, newIndex) }
                        : l
                )
            );
        }
    };

    const addList = () => {
        setLists([
            ...lists,
            { id: Date.now().toString(), title: `Danh sách mới`, cards: [] },
        ]);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="relative w-full h-screen bg-slate-100">
                {/* vùng chứa các danh sách có thể cuộn ngang */}
                <div
                    className="absolute bottom-0 left-0 right-0 flex gap-6 overflow-x-auto overflow-y-hidden pb-6 px-4 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200"
                    style={{ height: "calc(100vh - 100px)" }} // thay đổi nếu có header
                >
                    <SortableContext items={lists.map((l) => l.id)} strategy={rectSortingStrategy}>
                        {lists.map((list) => (
                            <List key={list.id} list={list} />
                        ))}
                    </SortableContext>

                    <button
                        onClick={addList}
                        className="min-w-[260px] h-fit bg-white/70 hover:bg-white/90 text-slate-700 rounded-2xl p-4 border border-dashed border-slate-400 text-left font-medium shadow-md hover:shadow-lg transition-all"
                    >
                        + Thêm danh sách
                    </button>
                </div>
            </div>
        </DndContext>
    );
}
