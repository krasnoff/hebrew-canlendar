import React from 'react';
import './App.scss';
import Cal from './@kobi.krasnoff/Cal';
import { DayObj } from './@kobi.krasnoff/HebrewCalendar/interfaces/dayObj';
import { Language } from './@kobi.krasnoff/HebrewCalendar/enums/language';
import { Format } from './@kobi.krasnoff/HebrewCalendar/enums/format';

function App() {
  const selectDateHandler = (sourceid: number, selectedDate: DayObj) => {
    console.log('selectDateHandler', sourceid, selectedDate);
  }

  const customCalWrapper: React.CSSProperties = {
    backgroundColor: '#faf7b6'
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
      <br></br>
      <br></br>
      <div className="wrapper">
        <Cal 
          onSelectDate={(selectedDate) => selectDateHandler(3, selectedDate)} 
          language={Language.Hebrew} 
          format={Format.SMALL}
          customCalWrapper={customCalWrapper}
          selectedDate={new Date(2024, 6, 10)}
        ></Cal>
      </div>
      <br></br>
      <br></br>
    </>
  );
}

export default App;
