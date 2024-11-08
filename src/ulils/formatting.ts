import { format } from "date-fns"

export const formatMonth = (date:Date):string=>{
    return format(date,"yyyy-MM")
}

export const formatCurrency = (amont:number):string=>{
  return amont.toLocaleString("Ja-JP");
}