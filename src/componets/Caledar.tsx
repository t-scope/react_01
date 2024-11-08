import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales'

import '../ulils/calendar.css'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js'
import { calculateDailyBarances } from '../ulils/financeCalculations'
import { Balance,  CalendarContent,  Transaction } from '../types'
import { formatCurrency } from '../ulils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { format } from 'date-fns/fp'
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'



interface CalendarProps{
  monthlyTransactions:Transaction[];
  setcurrentMonth:React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay:string;
  today:string;

}


const Caledar = ({monthlyTransactions,setcurrentMonth,setCurrentDay,currentDay,today}:CalendarProps) => {

const theme = useTheme()

const handleDateSet = (datesSetInfo:DatesSetArg):void=>{
  const currentMonth = datesSetInfo.view.currentStart
  setcurrentMonth(currentMonth) 
  if(isSameMonth(currentMonth,new Date())){
    setCurrentDay(today)
  }
 
}


  // 1.日付ごとの収支を計算する
  const dailyBarances =  calculateDailyBarances(monthlyTransactions);

  // const dailyBarances = {
  //      "2024-10-01":{income:100000,expense:0,balance:100000}, 
  //      "2024-10-06":{income:50000,expense:3000,balance:47000}, 
  //      "2024-10-25":{income:0,expense:300,balance:-300}, 
  // }



  const createCarendarEvents = (dailyBarances:Record<string,Balance>):CalendarContent[]=>{
      return  Object.keys(dailyBarances).map((date)=>{
          const {income,expense,balance} =   dailyBarances[date];
          return {
            start: date,
            income:formatCurrency(income),
            expense:formatCurrency(expense),
            balance:formatCurrency(balance)
          }
      })
  }
const calendarEvents = createCarendarEvents(dailyBarances);

const backgrondEvent = {
  start:currentDay,
  display:"background",
  backgroundColor:theme.palette.incomeColor.light,
}


const handlDateClick = (dateInfo: DateClickArg ):void=>{
    setCurrentDay(dateInfo.dateStr)
}



  const renderEventContent = (eventInfo:EventContentArg)=>{
      return (
        <div>
            <div className="money" id="event-income">
              {eventInfo.event.extendedProps.income}
            </div>
            <div className="money" id="event-expense">
              {eventInfo.event.extendedProps.expense}
            </div>
            <div className="money" id="event-balance">
              {eventInfo.event.extendedProps.balance}
            </div>
        </div>
      )
  }
  
  
  return (
 <FullCalendar 
 locale="jaLocale"
 plugins={[dayGridPlugin,interactionPlugin]}
 initialView='dayGridMonth'
 events={[...calendarEvents,backgrondEvent]}
 eventContent={renderEventContent}
 datesSet={handleDateSet}
 dateClick ={handlDateClick}
 />
  )
}

export default Caledar
