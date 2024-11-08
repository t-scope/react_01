import { Transaction,Balance } from "../types";


export const financeCalculations = (Transactions:Transaction[]):Balance=>{
    return Transactions.reduce((acc,transaction)=>{
        if(transaction.type == "income"){
            acc.income += transaction.amount
        }else{
            acc.expense += transaction.amount
        }
        acc.balance = acc.income - acc.expense
        return acc;
    },{income:0,expense:0,balance:0})


}

  // 1.日付ごとの収支を計算する

  export const calculateDailyBarances = (transactions:Transaction[]):Record<string,Balance>=>{
    return transactions.reduce<Record<string,Balance>>((acc,transaction)=>{
        const day = transaction.date;
        if(!acc[day]){
            acc[day] = {income:0,expense:0,balance:0}
        }
        if(transaction.type=="income"){
            acc[day].income += transaction.amount
        }
        if(transaction.type=="expense"){
            acc[day].expense += transaction.amount
        }
         acc[day].balance = acc[day].income - acc[day].expense;
         return acc;
    },{})

  } 
