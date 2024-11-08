import { useEffect, useState } from 'react'

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report'
import NoMatch from './pages/NoMatch'
import AppLayout from './componets/layout/AppLayout'
import {theme} from './theme/theme';
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Transaction } from './types'
import { collection, getDocs,addDoc, deleteDoc, doc,updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { formatMonth } from './ulils/formatting'
import { Schema } from './validations/schema'

function App() {

  // firestoreのエラーか判定
  function isFireStoneError (error: unknown):error is {code:string,message:string}{
    return typeof error === "object" && error !== null && "code" in error

  }

  const [transactions,setTransactions] = useState<Transaction[]>([]);

  const [currentMonth,setcurrentMonth] = useState(new Date());


 
  useEffect(()=>{
    const fetchTransactions = async ()=>{
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const fetchTransactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id:doc.id
          }  as Transaction
        });
        setTransactions(fetchTransactionsData)
        // console.log(transactions)
       
       
      } catch (error) {
        if(isFireStoneError(error)){
          console.error("firebaseエラー：",error.message)
        }else{
          console.error("一般のエラー:",error)
        }
       
        
      }
    }
    fetchTransactions()

  },[])

  const monthlyTransactions = transactions.filter((transaction)=>transaction.date.startsWith(formatMonth(currentMonth)))

  const handleSaveTransaction = async(transaction:Schema) =>{
      try {
        const docRef = await addDoc(collection(db, "Transactions"),transaction);
        const  newTransaction = {
          id:docRef.id,
          ...transaction
        }
        setTransactions((prev)=>[...prev,newTransaction])
      } catch (error) {
        if(isFireStoneError(error)){
          console.error("firebaseエラー：",error.message)
        }else{
          console.error("一般のエラー:",error)
        }
      }
  }

  const handleDeleteTransaction = async(transactionId:string) =>{
    try {
       await deleteDoc(doc(db, "Transactions",transactionId));
       const filtedDeleteTransaction = monthlyTransactions.filter((transaction)=>transaction.id !== transactionId);
       setTransactions(filtedDeleteTransaction)

     
    } catch (error) {
      if(isFireStoneError(error)){
        console.error("firebaseエラー：",error.message)
      }else{
        console.error("一般のエラー:",error)
      }
    }
  } 


  const handleUpdateTransaction = async(transaction:Schema,transactionId:string)=>{
    // onUpdateTransaction
    try {
      const docRef = doc(db, "Transactions",transactionId);
      await updateDoc(docRef,transaction);
      const updateTransactions = transactions.map((t)=> t.id === transactionId ? {...t,...transaction} : t )
      setTransactions(updateTransactions)

    
   } catch (error) {
     if(isFireStoneError(error)){
       console.error("firebaseエラー：",error.message)
     }else{
       console.error("一般のエラー:",error)
     }
   }

  }
  
  return (
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route  path="/" element={<AppLayout/>}>
          <Route index element={
            <Home 
              monthlyTransactions={monthlyTransactions}
              setcurrentMonth={setcurrentMonth}
              onSaveTransaction={handleSaveTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              onUpdateTransaction={handleUpdateTransaction}
  
              />
              
              }/>
          <Route path="/report" 
            element={
              <Report 
                  currentMonth={currentMonth} 
                  setcurrentMonth={setcurrentMonth}
                  monthlyTransactions={monthlyTransactions}
                  />
                  }
                  />
          <Route path="/*" element={<NoMatch/>}/>
        </Route>
        
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
