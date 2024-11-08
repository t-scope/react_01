import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AddHomeIcon from '@mui/icons-material/AddHome';
import TrainIcon from '@mui/icons-material/Train';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import { ExpenseCategory, IncomeCategory, Transaction } from "../types";
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema, transactionSchema } from "../validations/schema";


interface TransactionFormProps{
  onCloseFrom:()=>void,
  isEntryDrwarOpen:boolean,
  currentDay:string,
  onSaveTransaction: (transaction: Schema) => Promise<void>,
  selectredTransaction:Transaction | null,
  onDeleteTransaction:(transactionId: string) => Promise<void>,
  setSelectredTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>,
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>
}

type IncomeExpence = "income" | "expense";

interface CategoryItem {
  label:IncomeCategory | ExpenseCategory;
  icon:JSX.Element; 
}

const TransactionForm = ({onCloseFrom,isEntryDrwarOpen,currentDay,onSaveTransaction,selectredTransaction,onDeleteTransaction,setSelectredTransaction,onUpdateTransaction}:TransactionFormProps) => {
  const formWidth = isEntryDrwarOpen ? 320 : "-2%";
  const {control,setValue,watch,formState:{errors},handleSubmit,reset} = useForm<Schema>({
    defaultValues:{
      type:"expense",
      date:currentDay,
      category:"",
      amount:0,
      content:"",
    },
    resolver:zodResolver(transactionSchema)
  });


  const expenseCategories:CategoryItem[] = [
    {label:"食費" , icon:<FastfoodIcon fontSize="small" />},
    {label:"日用品" , icon:<AccessAlarmsIcon fontSize="small" />},
    {label:"交際費" , icon:<AddHomeIcon fontSize="small" />},
    {label:"娯楽" , icon:<CelebrationIcon fontSize="small" />},
    {label:"交通費" , icon:<TrainIcon fontSize="small" />}
  ];

  const incomeCategories:CategoryItem[] = [
    {label:"給与" , icon:<HomeWorkIcon fontSize="small" />},
    {label:"副収入" , icon:<AttachMoneyIcon fontSize="small" />},
    {label:"お小遣い" , icon:<SavingsIcon fontSize="small" />}
  ]

  const incomeExpenseTogle = (type:IncomeExpence)=>{
     setValue("type",type);
     setValue("category","");
     
  }

  const [categories,setCategories] = useState(expenseCategories)

  const currentType = watch("type");

  useEffect(()=>{
    const newCategories = currentType == "income"  ? incomeCategories : expenseCategories;
    setCategories(newCategories);
  },[currentType])


useEffect(()=>{
  setValue("date",currentDay)
},[currentDay])

const onSubmit:SubmitHandler<Schema> = (data)=>{
  if(selectredTransaction){
    onUpdateTransaction(data,selectredTransaction.id)
    .then(()=> {
      console.log("更新しました")
      setSelectredTransaction(null)
    })
    .catch((error)=>{
        console.error("エラー！:",error)
    })
  }else{
    onSaveTransaction(data)
    .then(()=>console.log("保存しました"))
    .catch((error)=>{
      console.error("エラー！:",error)
  })

  }
 
  reset({
    type:"expense",
    date:currentDay,
    category:"",
    amount:0,
    content:"",
  })
}
useEffect(()=>{
  if(selectredTransaction){
   const categoryExsist =  categories.some((category)=>category.label === selectredTransaction.category)
   setValue("category",categoryExsist ? selectredTransaction.category: "")

  }

},[selectredTransaction,categories])

useEffect(()=>{
  if(selectredTransaction){
    setValue("type",selectredTransaction.type)
    setValue("date",selectredTransaction.date)
    setValue("amount",selectredTransaction.amount)
    setValue("content",selectredTransaction.content)
  } else {
    reset({
      type:"expense",
      date:currentDay,
      category:"",
      amount:0,
      content:"",
    })
  }

},[selectredTransaction])

const handleDelete =()=>{
  if(selectredTransaction){
    onDeleteTransaction(selectredTransaction.id);
    setSelectredTransaction(null)
  }
 
}

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: formWidth, // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
         onClick={onCloseFrom}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
         
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}

          <Controller
           name ="type"
           control={control}
           render={({field})=>(
            <ButtonGroup fullWidth>
            <Button variant={field.value=="expense" ? "contained" : "outlined"} color="error" onClick={()=>incomeExpenseTogle("expense")}>
              支出
            </Button>
            <Button variant={field.value=="income" ? "contained" : "outlined" } onClick={()=>incomeExpenseTogle("income")}>収入</Button>
            </ButtonGroup>
           )}
        />
        
          {/* 日付 */}
          <Controller
           name ="date"
           control={control}
           render={({field})=>(
            <TextField
            {...field}
            label="日付"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
           )}
        />

        
          {/* カテゴリ */}

            <Controller
           name ="category"
           control={control}
           render={({field})=>(
            <TextField  {...field}  id="カテゴリ" label="カテゴリ" select 
            error={!!errors.category}
            helperText={errors.category?.message}
            >
              {categories.map((category)=>(
                <MenuItem value={category.label} key={category.label}>
                <ListItemIcon>
                  {category.icon}
                </ListItemIcon>
                {category.label}
                </MenuItem>
              )
              )}
          </TextField>
        
           )}
        />
          {/* 金額 */}
          <Controller
           name ="amount"
           control={control}
           render={({field})=>(
            <TextField 
            error={!!errors.amount}
            helperText={errors.amount?.message}
            {...field}
            value={field.value === 0 ? "" : field.value} 
            onChange={(e)=>{
              const newValure = parseInt(e.target.value , 10) || 0;
              field.onChange(newValure);
            }}
            label="金額" 
            type="number" />
           )}
       
           
        />
          {/* 内容 */}
          <Controller
           name ="content"
           control={control}
           render={({field})=>(
            <TextField {...field} label="内容" type="text" 
            error={!!errors.content}
            helperText={errors.content?.message}
            />
           )}
        />
          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={currentType=="income" ? "primary" : "error"} fullWidth>
            { selectredTransaction ? "更新" :"保存"  }
          </Button>
          {/* 削除ボタン */}
          { selectredTransaction && (
          <Button  onClick={handleDelete} variant="outlined" color={"secondary"} fullWidth>
            削除
          </Button>
          )}
          
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
