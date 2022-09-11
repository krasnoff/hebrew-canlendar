import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Language } from "../enums/language";
import { WeekdaysEnglish } from "../enums/WeekDaysEnglish";
import { WeekdaysHebrew } from "../enums/weekdaysHebrew";
import { DayObj } from "../interfaces/dayObj";
import { WeekDateArray } from "../types/WeekDateArray";
import styles from './Cal.module.scss';
import {gematriya, HDate} from '@hebcal/core';
import { MonthsArr } from "../enums/months";


interface Props {
    language?: Language,
    // selectedDate: Date
    // onSelectSymbol: (selectedSymbol: Item | null) => void
}

function Cal(props: Props) {
    const [SelectedEnum, setSelectedEnum] = useState<Array<WeekdaysHebrew | WeekdaysEnglish>>()
    const [MonthDates, setMonthDates] = useState<Array<WeekDateArray>>([]);
    const [FirstDayMonth, setFirstDayMonth] = useState<DayObj>();
    const [LastDayMonth, setLastDayMonth] = useState<DayObj>();
    const [selectedYear, setSelectedYear] = useState<number>((new Date()).getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>((new Date()).getMonth());
    const selectedYearContainer = useRef<HTMLInputElement>(null);
    const selectedMonthContainer = useRef<HTMLSelectElement>(null);
    
    // build the whole calendar object
    const buildMonthObj = (buildDateObj: Array<DayObj>): Array<WeekDateArray> => {
        let weeksArr: WeekDateArray = [];
        const monthArr: Array<WeekDateArray> = [];
        let buildDateObjIndex = 0;
        
        // first week of the month
        const firstDayOfWeek = buildDateObj[0].DayOfWeek;
        for (let index = 0; index < 7; index++) {
            if (index < firstDayOfWeek) {
                weeksArr.push(undefined);
            } else {
                weeksArr.push(buildDateObj[buildDateObjIndex]);
                buildDateObjIndex++;
            }
        }
        monthArr.push(weeksArr);
        
        do {
            weeksArr = [];

            for (let index = 0; index < 7; index++) {
                weeksArr.push(buildDateObj[buildDateObjIndex]);
                buildDateObjIndex++;
            }
            monthArr.push(weeksArr);
        } while (buildDateObjIndex < buildDateObj.length);

        return monthArr;
    }

    const buildDateObj = useCallback((today: Date): Array<DayObj> => {
        const numberOfDays = getNumbersPerDay(today.getMonth(), today.getFullYear());
        const arr: Array<DayObj> = [];
        for (let i = 0; i < numberOfDays; i++) {
            const ButtonDate = new Date(today.getFullYear(), today.getMonth(), i + 1);
            const el: DayObj = {
                internationalDate: i + 1,
                ButtonDate: ButtonDate,
                DayOfWeek: ButtonDate.getDay(),
                HebrewDate: new HDate(ButtonDate)
            }
            arr.push(el);
        }
        setFirstDayMonth(arr[0]);
        setLastDayMonth(arr[arr.length - 1]);
        return arr;
    }, []);

    const getNumbersPerDay = (monthIndex: number, year: number) => {
        monthIndex++;
        if (monthIndex === 1 || monthIndex === 3 || monthIndex === 5 || monthIndex === 7 ||  monthIndex === 8 ||  monthIndex === 10 ||  monthIndex === 12) {
            return 31;
        } else if (monthIndex === 4 || monthIndex === 6 || monthIndex === 9 || monthIndex === 11) {
            return 30;
        } else if (monthIndex === 2) {
            if (year % 4 === 0) {
                if (year % 400 === 0) {
                    return 29;
                } else if (year % 100 === 0) {
                    return 28;
                } else {
                    return 29;
                }
            } else {
                return 28;
            }
        } else {
            return 0;
        }
    }

    const setDatesNames = useCallback(() => {
        if (props.language && props.language === Language.Hebrew) {
            const weekday: Array<WeekdaysHebrew> = [];
            weekday.push(WeekdaysHebrew.Sunday);
            weekday.push(WeekdaysHebrew.Monday);
            weekday.push(WeekdaysHebrew.Tuesday);
            weekday.push(WeekdaysHebrew.Wednesday);
            weekday.push(WeekdaysHebrew.Thursday);
            weekday.push(WeekdaysHebrew.Friday);
            weekday.push(WeekdaysHebrew.Saturday);
            setSelectedEnum(weekday);
        } else {
            const weekday: Array<WeekdaysEnglish> = [];
            weekday.push(WeekdaysEnglish.Sunday);
            weekday.push(WeekdaysEnglish.Monday);
            weekday.push(WeekdaysEnglish.Tuesday);
            weekday.push(WeekdaysEnglish.Wednesday);
            weekday.push(WeekdaysEnglish.Thursday);
            weekday.push(WeekdaysEnglish.Friday);
            weekday.push(WeekdaysEnglish.Saturday);
            setSelectedEnum(weekday);
        }
    }, [props.language]);

    const buildComponent = useCallback((dateObj: Date) => {
        setDatesNames();
        // if (MonthDates.length === 0) {
            const res = buildMonthObj(buildDateObj(dateObj));
            setMonthDates(res);
            // setSelectedYear(dateObj.getFullYear());
            // setSelectedMonth(dateObj.getMonth());
        // }
    }, [buildDateObj, setDatesNames]);

    



    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>, obj: DayObj) => {
        if (evt.key === 'Enter') {
            console.log('handleKeyDown', evt, obj)
        }
    }

    const handleClick = (obj: DayObj) => {
        console.log('handleClick', obj)
    }

    const getHebMonthName = (hd: HDate | undefined): string => {
        if (hd) {
            switch (hd.getMonth()) {
                case 1:
                    return MonthsArr.NISAN;
                case 2:
                    return MonthsArr.IYYAR;
                case 3:
                    return MonthsArr.SIVAN;
                case 4:
                    return MonthsArr.TAMUZ;
                case 5:
                    return MonthsArr.AV;
                case 6:
                    return MonthsArr.ELUL;
                case 7:
                    return MonthsArr.TISHREI;
                case 8:
                    return MonthsArr.CHESHVAN;
                case 9:
                    return MonthsArr.KISLEV;
                case 10:
                    return MonthsArr.TEVET;
                case 11:
                    return MonthsArr.SHVAT;
                case 12:
                    return MonthsArr.ADAR_I;
                case 13:
                    return MonthsArr.ADAR_II;
                default:
                    return '';
            }
        }
        return '';
    }

    const handleSelectedYearChange = (evt: ChangeEvent) => {
        console.log('selectedYearContainer.current?.value', selectedYearContainer.current?.value);
        setSelectedYear(parseInt(selectedYearContainer.current?.value as string));
    }

    const handleSelectedMonthChange = (evt: ChangeEvent) => {
        setSelectedMonth(parseInt(selectedMonthContainer.current?.value as string));
    }

    useEffect(() => {
        const newDate = new Date(selectedYear, selectedMonth, 1);
        console.log('set New Month', newDate)
        buildComponent(newDate);
        
    }, [selectedYear, selectedMonth, buildComponent]);
    
    return (
        <div className={styles.calWrapper}>
            <div className={styles.controllers}>
                <div><input 
                    type="text" 
                    maxLength={4}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    value={selectedYear}
                    onChange={(evt: ChangeEvent) => handleSelectedYearChange(evt)}
                    ref={selectedYearContainer}>
                    </input></div>
                <div><select 
                            ref={selectedMonthContainer}
                            value={selectedMonth}
                            onChange={(evt: ChangeEvent) => handleSelectedMonthChange(evt)}>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select></div>
            </div>
            <div className={styles.hebTitle}>
                {FirstDayMonth?.HebrewDate ? <span>{getHebMonthName(FirstDayMonth?.HebrewDate)} {gematriya((FirstDayMonth as DayObj).HebrewDate.getFullYear())} -</span> : null}
                {LastDayMonth?.HebrewDate ? <span>{getHebMonthName(LastDayMonth?.HebrewDate)} {gematriya((LastDayMonth as DayObj).HebrewDate.getFullYear())}</span> : null}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>{SelectedEnum ? SelectedEnum[0] : ''}</th>
                        <th>{SelectedEnum ? SelectedEnum[1] : ''}</th>
                        <th>{SelectedEnum ? SelectedEnum[2] : ''}</th>
                        <th>{SelectedEnum ? SelectedEnum[3] : ''}</th>
                        <th>{SelectedEnum ? SelectedEnum[4] : ''}</th>
                        <th>{SelectedEnum ? SelectedEnum[5] : ''}</th>
                        <th>{SelectedEnum ? SelectedEnum[6] : ''}</th>
                    </tr>
                </thead>
                {MonthDates ? <tbody>
                    { MonthDates.map((el, index) => <tr key={index}>
                        {el.map((el, index) => <td key={index}>
                            {el ?
                                <div tabIndex={0} onKeyDown={(evt) => handleKeyDown(evt, el)} onClick={() => handleClick(el)}>
                                    <div>{el?.ButtonDate.getDate()}</div>
                                    <div>{gematriya(el.HebrewDate.getDate())}</div>
                                </div>
                            : null}
                        </td>)}
                    </tr>) }
                </tbody> : null}
            </table>
        </div>
    );
}

export default Cal;
