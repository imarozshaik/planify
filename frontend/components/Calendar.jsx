import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, isSameMonth, isSameDay, subMonths, addMonths } from 'date-fns';
import './Calendar.css'; // Import CSS file

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({}); // State to store notes for each date
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [selectedNote, setSelectedNote] = useState(''); // State to store selected note

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          <th colSpan="7" className="calendar-header">
            <button className="nav-button left" onClick={prevMonth}>Previous</button>
            {format(currentDate, 'MMMM yyyy')}
            <button className="nav-button right" onClick={nextMonth}>Next</button>
          </th>
        </tr>
        <tr>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <th key={day} className="calendar-day">{day}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
  
    const dateFormat = 'd';
    const rows = [];
  
    // Define a function to handle click on a specific date
    const handleDateClick = (clickedDay) => {
      const dateKey = format(clickedDay, 'yyyy-MM-dd');
      setSelectedDate(clickedDay); // Update selectedDate when clicking a date
      setSelectedNote(notes[dateKey] || ''); // Update selectedNote based on notes state
    };
  
    // Loop through each day to render cells
    let day = startDate;
    while (day <= endDate) {
      let days = [];
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSameAsSelected = isSameDay(day, selectedDate);
        const dateKey = format(day, 'yyyy-MM-dd');
        const note = notes[dateKey];
  
        // Use a function wrapper to capture the current value of `day`
        const clickHandler = (clickedDay) => () => {
          handleDateClick(clickedDay);
        };
  
        days.push(
          <td
            key={day.getTime()}
            className={`calendar-cell ${!isCurrentMonth ? 'disabled' : ''} ${isSameAsSelected ? 'selected' : ''}`}
            onClick={clickHandler(day)}
          >
            <div className="date-container">
              <button
                className={`date ${isSameAsSelected ? 'selected' : ''}`}
                onClick={clickHandler(day)}
              >
                {formattedDate}
              </button>
            </div>
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <tr key={day.getTime()}>{days}</tr>
      );
    }
  
    return (
      <tbody>{rows}</tbody>
    );
  };
  

  const handleNoteChange = (dateKey, note) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [dateKey]: note,
    }));
    setSelectedNote(note); // Update selectedNote immediately on change
  };

  const prevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
    setSelectedDate(null); // Reset selectedDate when changing months
    setSelectedNote(''); // Clear selectedNote when changing months
  };

  const nextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
    setSelectedDate(null); // Reset selectedDate when changing months
    setSelectedNote(''); // Clear selectedNote when changing months
  };

  return (
    <div className="cal">
    <div className="calendar-page">
      <div className="calendar-container">
        <table className="calendar">
          {renderHeader()}
          {renderCells()}
        </table>
      </div>
      <div className="notes-container">
        <h2>Notes</h2>
        <div className="selected-note">
          {selectedDate ? (
            <>
              <p><strong>{format(selectedDate, 'MMMM d, yyyy')}</strong></p>
              <div className="note-container">
                <textarea
                  className="note-textarea"
                  placeholder="Add note..."
                  value={selectedNote}
                  onChange={(e) => handleNoteChange(format(selectedDate, 'yyyy-MM-dd'), e.target.value)}
                />
              </div>
            </>
          ) : (
            <p>Select a date to view or add notes.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Calendar;
