import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

interface OrderCtx {
  orders: Order[];
  updateStatus: (orderId: string, status: OrderStatus) => void;
  markPaid: (orderId: string) => void;
}

const Ctx = createContext<OrderCtx | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const markPaid = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paid: true } : o));
  };

  return <Ctx.Provider value={{ orders, updateStatus, markPaid }}>{children}</Ctx.Provider>;
}

export function useOrders() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useOrders must be inside OrderProvider');
  return ctx;
}
