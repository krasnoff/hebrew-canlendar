import { useEffect, useState } from "react";
import { Language } from "../enums/language";
import { WeekdaysEnglish } from "../enums/WeekDaysEnglish";
import { WeekdaysHebrew } from "../enums/weekdaysHebrew";
import { DayObj } from "../interfaces/dayObj";
import styles from './Cal.module.scss'

interface Props {
    language?: Language,
    // selectedDate: Date
    // onSelectSymbol: (selectedSymbol: Item | null) => void
}

function Cal(props: Props) {
    const [SelectedEnum, setSelectedEnum] = useState<Array<WeekdaysHebrew | WeekdaysEnglish>>()
    const [MonthDates, setMonthDates] = useState<Array<DayObj>>();
    let arr = [];
    
    useEffect(() => {
        // console.log('useEffect')
        setDatesNames();
        if (arr.length === 0) {
            arr = buildDateObj(new Date());
        }
        
    }, []);

    const buildMonthObj = (buildDateObj: Array<DayObj>) => {
        const weeksArr = [];
        const dayIndex = 0;
        do {
            for (let index = 0; index < 7; index++) {
                
            }
        } while (dayIndex < buildDateObj.length)
    }

    const buildDateObj = (today: Date): Array<DayObj> => {
        console.log('buildDateObj');
        const numberOfDays = getNumbersPerDay(today.getMonth(), today.getFullYear());
        const arr: Array<DayObj> = [];
        for (let i = 0; i < numberOfDays; i++) {
            const ButtonDate = new Date(today.getFullYear(), today.getMonth(), i + 1);
            const el: DayObj = {
                internationalDate: i + 1,
                ButtonDate: ButtonDate,
                DayOfWeek: ButtonDate.getDay(),
                HebrewDate: ''
            }
            arr.push(el);
        }
        return arr;
    };

    const getNumbersPerDay = (monthIndex: number, year: number) => {
        monthIndex++;
        if (monthIndex === 1 || monthIndex === 3 || monthIndex === 5 || monthIndex === 7 ||  monthIndex === 8 ||  monthIndex === 10 ||  monthIndex === 12) {
            return 31;
        } else if (monthIndex === 4 || monthIndex === 6 || monthIndex === 9 || monthIndex === 11) {
            return 30;
        } else if (monthIndex == 2) {
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

    const setDatesNames = () => {
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
    }
    
    return (
        <div className={styles.calWrapper}>
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
                <tbody>

                </tbody>
            </table>
        </div>
    );
}

export default Cal;
