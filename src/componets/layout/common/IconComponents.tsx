import React from 'react'
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { ExpenseCategory, IncomeCategory } from '../../../types';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AddHomeIcon from '@mui/icons-material/AddHome';
import TrainIcon from '@mui/icons-material/Train';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';

const IconComponents:Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
        食費 : <FastfoodIcon fontSize="small" />,
        日用品 : <AccessAlarmsIcon fontSize="small" />,
        交際費 : <AddHomeIcon fontSize="small" />,
        娯楽 : <CelebrationIcon fontSize="small" />,
        交通費 : <TrainIcon fontSize="small" />,
        給与 : <HomeWorkIcon fontSize="small" />,
        副収入 : <AttachMoneyIcon fontSize="small" />,
        お小遣い : <SavingsIcon fontSize="small" />,
        }

export default IconComponents
