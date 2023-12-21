
import React, { useState } from 'react';
import './calendar.css';
import Grid from './grid';



    
function MyCalendar() {
  // Assuming a static month layout for simplicity
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  return (
    <div className='app-container'>
    <div className="calendar">
      
      <div className="calendar-title"> {currentMonth} {currentYear}</div>
      <Grid /> 
    
    </div>
    </div>

    


  );
}

export default MyCalendar;
