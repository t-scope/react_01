import { Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from 'date-fns/locale'
import { addMonths } from 'date-fns';

interface MonthSelector{
  currentMonth:Date
  setcurrentMonth:React.Dispatch<React.SetStateAction<Date>>
}

const MonthSelector = ({currentMonth,setcurrentMonth}:MonthSelector) => {


  const handlePrevMonth = ()=>{
     const prevMonth = addMonths(currentMonth,-1)
     setcurrentMonth(prevMonth)
  }
  const handleNextMonth = ()=>{
    const nextMonth = addMonths(currentMonth,+1)
    setcurrentMonth(nextMonth)
  }

  const handleChaneMonth = (newDate:Date|null)=>{
      if(newDate){
        setcurrentMonth(newDate)
      }
  }
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Button onClick={handlePrevMonth} color={"error"} variant='contained'>先月</Button>
        <LocalizationProvider
         dateAdapter={AdapterDateFns} 
         adapterLocale={ja}
         >
           <DatePicker 
           onChange={handleChaneMonth}
           value={currentMonth}
           label="年月を選択"
           sx={{mx:2,backgroundColor:"white"}} 
           views={["year","month"]} 
           format="yyyy/MM"
           slotProps={{
            toolbar: { 
                toolbarFormat: 'yyyy年MM月', hidden: false },
                calendarHeader: { format: 'yyyy年MM月' }
          }}
           />
        </LocalizationProvider>
        <Button  onClick={handleNextMonth} color={"primary"} variant='contained'>翌月</Button>
    </Box>
  )
}

export default MonthSelector
