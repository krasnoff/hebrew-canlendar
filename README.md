# Getting Started with the React Hebrew Calendar component

This component is a simple calendar which displays the gergorian calendar and the hebrew calendar.
This component also shows the following:
1. Parashot Hashvua.
2. jewish Events

In order to install this component simply execute the following command:
```
npm i hebrewcalendar
```

Here is how you implement the component in your react code
```
import './App.css';
import Cal from 'hebrewcalendar/Cal';
import { DayObj } from 'hebrewcalendar/HebrewCalendar/interfaces/dayObj';
import { Language } from 'hebrewcalendar/HebrewCalendar/enums/language'; 

function App() {
  const selectDateHandler = (selectedDate) => {
    console.log('selectDateHandler', selectedDate);
  }

  return (
    <div className="App">
      <div className="celendarContainer"><Cal onSelectDate={(selectedDate) => selectDateHandler(selectedDate)} language={Language.Hebrew}></Cal></div>
    </div>
  );
}

export default App;
```

This new component has the following attributes:
1. `onSelectDate` - This is a mandatory attributes which is activated every time the user chooses a specific date. Its argument is a `DayObj` interface which looks like this:
```
export interface DayObj {
    internationalDate: number;
    HebrewDate: HDate;
    DayOfWeek: number;
    ButtonDate: Date;
    ParashaShavua?: string;
    EventObj?: Array<Event>;
}
```