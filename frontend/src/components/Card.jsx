export default function Card({ card }) {
    return (
        <div className="bg-white/90 text-slate-800 border border-white/20 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing">
            {card.title}
        </div>
    );
}
