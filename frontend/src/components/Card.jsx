export default function Card({ card }) {
    return (
        <div className="bg-gradient-to-r from-white/90 to-slate-50 text-slate-700 border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all cursor-grab active:cursor-grabbing">
            {card.title}
        </div>
    );
}
