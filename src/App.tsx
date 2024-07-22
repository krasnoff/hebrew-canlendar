import React, { useEffect, useState } from 'react';
import './App.scss';
import Cal from './@kobi.krasnoff/Cal';
import { DayObj } from './@kobi.krasnoff/HebrewCalendar/interfaces/dayObj';
import { Language } from './@kobi.krasnoff/HebrewCalendar/enums/language';
import { Format } from './@kobi.krasnoff/HebrewCalendar/enums/format';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const selectDateHandler = (sourceid: number, selectedDate: DayObj) => {
    console.log('selectDateHandler', sourceid, selectedDate);
  }

  const customCalWrapper: React.CSSProperties = {
    backgroundColor: '#faf7b6'
  }

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - 5);
    setSelectedDate(d);
  }, []);
  
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
          selectedDate={selectedDate}
        ></Cal>
      </div>
      <br></br>
      <br></br>
    </>
  );
}

export default App;
