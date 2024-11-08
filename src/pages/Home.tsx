import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../componets/MonthlySummary'
import Caledar from '../componets/Caledar'
import TransactionMenu from '../componets/TransactionMenu'
import TransactionForm from '../componets/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'


interface HomeProps{
  monthlyTransactions:Transaction[],
  setcurrentMonth:React.Dispatch<React.SetStateAction<Date>>,
  onSaveTransaction: (transaction: Schema) => Promise<void>,
  selectredTransaction:Transaction | null,
  onDeleteTransaction:(transactionId: string) => Promise<void>,
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>
}




const Home = ({monthlyTransactions,setcurrentMonth,onSaveTransaction,onDeleteTransaction,onUpdateTransaction}:HomeProps) => {
  const today =format(new Date(),"yyyy-MM-dd");

  const [currentDay,setCurrentDay] = useState(today)

  const [selectredTransaction,setSelectredTransaction] = useState<Transaction | null>(null);

  const [isEntryDrwarOpen,setIsEntryDrwarOpen] = useState(false)

  const onCloseFrom = ()=>{
    setIsEntryDrwarOpen(!isEntryDrwarOpen)
    setSelectredTransaction(null)
  }

  const handleAddTransactionForm = ()=>{
    if(selectredTransaction){
      setSelectredTransaction(null)
    
    }else{
      setIsEntryDrwarOpen(!isEntryDrwarOpen)
    }
   
  }

  const handleSelectTransaction = (transaction:Transaction)=>{
      setIsEntryDrwarOpen(true)
      setSelectredTransaction(transaction)
  }

 const dailyTransactions = monthlyTransactions.filter((transaction) => transaction.date == currentDay);
  return (
   <Box sx={{display:"flex"}}>
      {/* 右コンテンツ */}
      <Box sx={{flexGrow:1}}>
      <MonthlySummary monthlyTransactions={monthlyTransactions}  />
      <Caledar monthlyTransactions={monthlyTransactions} setcurrentMonth={setcurrentMonth} setCurrentDay={setCurrentDay} currentDay={currentDay}
      today={today}
      />
    </Box>
      {/* 左コンテンツ */}
      <Box>
        <TransactionMenu 
          dailyTransactions={dailyTransactions} 
          currentDay={currentDay} 
          onAddTransactionForm={handleAddTransactionForm} 
          isEntryDrwarOpen={isEntryDrwarOpen}
          onSelectTransaction={handleSelectTransaction}
          />
        <TransactionForm 
          onCloseFrom={onCloseFrom} 
          isEntryDrwarOpen={isEntryDrwarOpen}  
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectredTransaction={selectredTransaction}
          onDeleteTransaction={onDeleteTransaction}
          setSelectredTransaction={setSelectredTransaction}
          onUpdateTransaction={onUpdateTransaction}
          />

      </Box>
   </Box>
  )
}

export default Home
