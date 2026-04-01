export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';

export interface Dealer {
  id: string;
  name: string;
  lid: string;
  loc: string;
  ini: string;
  credit: number;
  outstanding: number;
}

export interface BulkTier {
  lbl: string;
  min: number;
  disc: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  cat: string;
  icon: string;
  bg: string;
  price: number;
  mrp: number;
  unit: string;
  type: string;
  hsn: string;
  gst: number;
  qty: number;
  min: number;
}

export interface OrderItem {
  pid: string;
  name: string;
  qty: number;
  price: number;
  eff: number;
  tier: string;
  gst: number;
  hsn: string;
}

export interface Order {
  id: string;
  did: string;
  dname: string;
  dloc: string;
  dini: string;
  date: string;
  time: string;
  items: OrderItem[];
  sub: number;
  tax: number;
  grand: number;
  status: OrderStatus;
  inv: string;
  paid: boolean;
}

export interface FleetVehicle {
  id: string;
  name: string;
  driver: string;
  status: string;
  deliveries: number;
  total: number;
  progress: number;
}

export interface DealerNet {
  id: string;
  name: string;
  lid: string;
  loc: string;
  ini: string;
  orders: number;
  revenue: number;
  outstanding: number;
  rating: number;
}

export type RootStackParamList = {
  MainTabs: undefined;
  OrderDetail: { orderId: string };
  InvoiceView: { orderId: string };
  DealerDetail: { dealerId: string };
  Notifications: undefined;
};
