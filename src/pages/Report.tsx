
import { Grid, Paper } from '@mui/material'
import React from 'react'
import BarChart from '../componets/BarChart'
import MonthSelector from '../componets/MonthSelector'
import CategoryChart from '../componets/CategoryChart'
import TransactionTable from '../componets/TransactionTable'
import { Transaction } from '../types'

interface ReportProps{
  currentMonth:Date,
  setcurrentMonth:React.Dispatch<React.SetStateAction<Date>>,
  monthlyTransactions:Transaction[],
}

const Report = ({currentMonth,setcurrentMonth}:ReportProps) => {

 const commonPaperStyle = {
  height:{xs:"auto",md:"400px"},
  display:"flex",
  flexDirection:"column",
  p:2
 }
  return (
   <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setcurrentMonth={setcurrentMonth}/>
      </Grid>
      <Grid item xs={12} md={4} >
        <Paper sx={commonPaperStyle}>
            <CategoryChart />
        </Paper>


      </Grid>
      <Grid item xs={12} md={8} >
          <Paper sx={commonPaperStyle}>
              <BarChart monthlyTransactions={monthlyTransactions}/>
          </Paper>
        </Grid>
      <Grid item xs={12}>
        <TransactionTable />
      </Grid>
   </Grid>
  )
}

export default Report
