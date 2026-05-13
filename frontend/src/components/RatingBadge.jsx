// ==================== RATING BADGE ====================
function RatingBadge({ rating }) {
    // Backend envia rating como inteiro (60-94), converte para escala 0-10
    const normalizedRating = typeof rating === 'number' ? rating / 10 : 0;
    
    const color = normalizedRating >= 8.5 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                  normalizedRating >= 7.5 ? "bg-green-500/20 text-green-400 border-green-500/30" :
                  "bg-blue-500/20 text-blue-400 border-blue-500/30";
    
    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${color}`}>
            {normalizedRating.toFixed(1)}
        </span>
    );
}

export default RatingBadge;
