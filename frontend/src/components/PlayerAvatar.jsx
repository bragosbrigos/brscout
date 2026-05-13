function PlayerAvatar({ player, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-20 h-20 text-3xl'
  };

  // Generate initials from player name
  const getInitials = (name) => {
    if (!name) return 'P';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate consistent color based on player ID or name
  const getColor = (player) => {
    const colors = [
      'from-blue-500 to-blue-700',
      'from-green-500 to-green-700',
      'from-purple-500 to-purple-700',
      'from-red-500 to-red-700',
      'from-yellow-500 to-orange-700',
      'from-pink-500 to-pink-700',
      'from-indigo-500 to-indigo-700',
      'from-teal-500 to-teal-700'
    ];
    const index = player.id ? player.id % colors.length : 
                  (player.name || '').length % colors.length;
    return colors[index] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br ${getColor(player)} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
      {getInitials(player.name)}
    </div>
  );
}

export default PlayerAvatar;
