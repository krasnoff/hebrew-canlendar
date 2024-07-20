import React from 'react';
import './App.scss';
import Cal from './@kobi.krasnoff/Cal';
import { DayObj } from './@kobi.krasnoff/HebrewCalendar/interfaces/dayObj';
import { Language } from './@kobi.krasnoff/HebrewCalendar/enums/language';
import { Format } from './@kobi.krasnoff/HebrewCalendar/enums/format';

function App() {
  const selectDateHandler = (sourceid: number, selectedDate: DayObj) => {
    console.log('selectDateHandler', selectedDate);
  }
  
  return (
    <>
      <div className="wrapper">
        <Cal onSelectDate={(selectedDate) => selectDateHandler(1, selectedDate)} language={Language.Hebrew}></Cal>
      </div>
      <br></br>
      <br></br>
      <div className="wrapper">
        <Cal onSelectDate={(selectedDate) => selectDateHandler(2, selectedDate)} language={Language.Hebrew} format={Format.SMALL}></Cal>
      </div>
    </>
  );
}

export default App;
