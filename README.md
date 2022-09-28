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

   - `internationalDate` - Day of the gregorian month
   - `HebrewDate` - An `HDate` object which describes the hebrew date object which consist the hebrew month, hebrew year, and hebrew day. more details about the `HDate` object can be found at: https://github.com/hebcal/hebcal-es6#hdate
   - `DayOfWeek` - Day of the week where Sunday is 0 and Saturday is 6.
   - `ButtonDate` - Gergorian javascript date object.
   - `ParashaShavua` - weekly "Parashat Hashvua" in a string object.
   - `EventObj` - Special event object in the Jewish year. More details can be found at: https://github.com/hebcal/hebcal-es6#Event

2. `selectedDate` - optional, This attribute specifies a selected date of the hebrew calendar component. if ommited then the curerent date is selected.
3. `language` - optional, language of the compoenent:
```
export enum Language {
    Hebrew = 'he',
    English = 'en'
}
```
If ommited then the default language is english.

## Final words
