import React from 'react';
import './App.scss';
import Cal from './@kobi.krasnoff/Cal';
import { DayObj } from './@kobi.krasnoff/HebrewCalendar/interfaces/dayObj';
import { Language } from './@kobi.krasnoff/HebrewCalendar/enums/language';

function App() {
  const selectDateHandler = (selectedDate: DayObj) => {
    console.log('selectDateHandler', selectedDate);
  }
  
  return (
    <div className="wrapper">
      <Cal onSelectDate={(selectedDate) => selectDateHandler(selectedDate)} language={Language.Hebrew}></Cal>
    </div>
  );
}

export default App;
