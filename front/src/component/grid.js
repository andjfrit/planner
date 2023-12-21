import React, { useState } from 'react';
import DailyTasks from './tasklist';
import './grid.css'; // Import the stylesheet
function CalendarGrid() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // January is 0
    function generateCalendarDates(year, month) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
    
        const dates = [];
        let currentDate = new Date(startDate);
    
        // Add days from the previous month if the month doesn't start on Sunday
        while (currentDate.getDay() !== 0) {
            currentDate.setDate(currentDate.getDate() - 1);
            dates.unshift(new Date(currentDate));
        }
    
        currentDate = new Date(startDate);
        
        // Add all days of the current month
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        // Add days from the next month to complete the week
        while (dates.length % 7 !== 0) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return dates;
    }

    
    const dates = generateCalendarDates(currentYear, currentMonth);

    return (
        <div className="calendar-grid">
             {dates.map(date => (
                <div key={date.toString()} className="grid-cell">
                    <div className="date-number">{date.getDate()}</div> {/* Display the day of the month */}
                    <DailyTasks date={date.toISOString().split('T')[0]} />
                </div>
            ))}
        </div>
    );
}

export default CalendarGrid;
