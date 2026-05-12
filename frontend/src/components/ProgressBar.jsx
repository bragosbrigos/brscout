// ==================== PROGRESS BAR ====================
import { useState, useEffect } from 'react';

function ProgressBar({ value, max, color = "bg-br-green", height = "h-2" }) {
    const [width, setWidth] = useState(0);
    
    useEffect(() => { 
        setTimeout(() => setWidth(Math.min((value/max)*100, 100)), 400); 
    }, [value, max]);
    
    return (
        <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height} overflow-hidden`}>
            <div className={`${height} ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${width}%` }}></div>
        </div>
    );
}

export default ProgressBar;
