import { ReactNode } from "react";
import { Category } from "./category";

export interface LayoutProps {
  children: ReactNode
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: string
  description: string
  category: Category
  createdAt: string
  updatedAt: string
}
