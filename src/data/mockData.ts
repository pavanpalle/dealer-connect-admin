import { Dealer, Product, BulkTier, Order, FleetVehicle, DealerNet } from '../types';

export const STOCKIST = {
  name: 'SSR Enterprises',
  owner: 'Sailaja Yashwanth',
  gstin: '36AABCS1234F1Z5',
  phone: '+91 93965 22666',
};

export const DEALERS: Dealer[] = [
  { id: 'RS-HYD-0001', name: 'Ramesh Stores', lid: 'RS-HYD-0001', loc: 'Ameerpet', ini: 'RS', credit: 50000, outstanding: 1666 },
  { id: 'LK-HYD-0002', name: 'Lakshmi Kirana', lid: 'LK-HYD-0002', loc: 'Kukatpally', ini: 'LK', credit: 75000, outstanding: 0 },
  { id: 'SB-HYD-0003', name: 'Sri Balaji Mart', lid: 'SB-HYD-0003', loc: 'Madhapur', ini: 'SB', credit: 100000, outstanding: 3200 },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Nandini Milk 500ml', sku: 'NM-500', cat: 'milk', icon: 'milk', bg: '#EBF0FE', price: 25, mrp: 28, unit: 'pcs', type: 'Dairy', hsn: '0401', gst: 5, qty: 500, min: 48 },
  { id: 'p2', name: 'Nandini Milk 1L', sku: 'NM-1000', cat: 'milk', icon: 'milk', bg: '#E8F5F0', price: 48, mrp: 54, unit: 'pcs', type: 'Dairy', hsn: '0401', gst: 5, qty: 300, min: 24 },
  { id: 'p3', name: 'Nandini Ghee 500ml', sku: 'NG-500', cat: 'ghee', icon: 'ghee', bg: '#FEF3E2', price: 280, mrp: 320, unit: 'pcs', type: 'Dairy', hsn: '0405', gst: 12, qty: 80, min: 12 },
  { id: 'p4', name: 'Nandini Curd 400g', sku: 'NC-400', cat: 'curd', icon: 'curd', bg: '#F0EBFE', price: 30, mrp: 35, unit: 'pcs', type: 'Dairy', hsn: '0403', gst: 5, qty: 200, min: 24 },
  { id: 'p5', name: 'Nandini Butter 100g', sku: 'NB-100', cat: 'butter', icon: 'butter', bg: '#FEF3E2', price: 52, mrp: 58, unit: 'pcs', type: 'Dairy', hsn: '0405', gst: 12, qty: 150, min: 24 },
  { id: 'p6', name: 'Flavored Milk 200ml', sku: 'FM-200', cat: 'drink', icon: 'drink', bg: '#FDECEB', price: 20, mrp: 25, unit: 'pcs', type: 'Beverage', hsn: '2202', gst: 12, qty: 400, min: 48 },
];

export const BULK_TIERS: Record<string, BulkTier[]> = {
  p1: [{ lbl: 'Single', min: 1, disc: 0 }, { lbl: 'Half Case', min: 12, disc: 3 }, { lbl: 'Full Case', min: 24, disc: 6 }, { lbl: 'Bulk', min: 48, disc: 10 }],
  p2: [{ lbl: 'Single', min: 1, disc: 0 }, { lbl: 'Half Case', min: 6, disc: 3 }, { lbl: 'Full Case', min: 12, disc: 6 }, { lbl: 'Bulk', min: 24, disc: 10 }],
  p3: [{ lbl: 'Single', min: 1, disc: 0 }, { lbl: 'Half Case', min: 3, disc: 4 }, { lbl: 'Full Case', min: 6, disc: 7 }, { lbl: 'Bulk', min: 12, disc: 11 }],
  p4: [{ lbl: 'Single', min: 1, disc: 0 }, { lbl: 'Half Case', min: 6, disc: 3 }, { lbl: 'Full Case', min: 12, disc: 5 }, { lbl: 'Bulk', min: 24, disc: 10 }],
  p5: [{ lbl: 'Single', min: 1, disc: 0 }, { lbl: 'Half Case', min: 6, disc: 4 }, { lbl: 'Full Case', min: 12, disc: 7 }, { lbl: 'Bulk', min: 24, disc: 12 }],
  p6: [{ lbl: 'Single', min: 1, disc: 0 }, { lbl: 'Half Case', min: 12, disc: 5 }, { lbl: 'Full Case', min: 24, disc: 8 }, { lbl: 'Bulk', min: 48, disc: 12 }],
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-4821', did: 'RS-HYD-0001', dname: 'Ramesh Stores', dloc: 'Ameerpet', dini: 'RS',
    date: '29 Mar 2026', time: '10:30 AM',
    items: [
      { pid: 'p1', name: 'Nandini Milk 500ml', qty: 48, price: 25, eff: 22.5, tier: 'Bulk', gst: 5, hsn: '0401' },
      { pid: 'p3', name: 'Nandini Ghee 500ml', qty: 6, price: 280, eff: 260.4, tier: 'Full Case', gst: 12, hsn: '0405' },
    ],
    sub: 2642.4, tax: 241.49, grand: 2883.89, status: 'pending', inv: 'INV-2026-0421', paid: false,
  },
  {
    id: 'ORD-4820', did: 'LK-HYD-0002', dname: 'Lakshmi Kirana', dloc: 'Kukatpally', dini: 'LK',
    date: '29 Mar 2026', time: '09:15 AM',
    items: [
      { pid: 'p2', name: 'Nandini Milk 1L', qty: 24, price: 48, eff: 43.2, tier: 'Bulk', gst: 5, hsn: '0401' },
      { pid: 'p4', name: 'Nandini Curd 400g', qty: 12, price: 30, eff: 28.5, tier: 'Full Case', gst: 5, hsn: '0403' },
    ],
    sub: 1378.8, tax: 68.94, grand: 1447.74, status: 'processing', inv: 'INV-2026-0420', paid: false,
  },
  {
    id: 'ORD-4819', did: 'SB-HYD-0003', dname: 'Sri Balaji Mart', dloc: 'Madhapur', dini: 'SB',
    date: '28 Mar 2026', time: '02:45 PM',
    items: [
      { pid: 'p1', name: 'Nandini Milk 500ml', qty: 96, price: 25, eff: 22.5, tier: 'Bulk', gst: 5, hsn: '0401' },
      { pid: 'p5', name: 'Nandini Butter 100g', qty: 24, price: 52, eff: 45.76, tier: 'Bulk', gst: 12, hsn: '0405' },
    ],
    sub: 3258.24, tax: 239.71, grand: 3497.95, status: 'delivered', inv: 'INV-2026-0419', paid: true,
  },
  {
    id: 'ORD-4818', did: 'RS-HYD-0001', dname: 'Ramesh Stores', dloc: 'Ameerpet', dini: 'RS',
    date: '27 Mar 2026', time: '11:00 AM',
    items: [
      { pid: 'p6', name: 'Flavored Milk 200ml', qty: 48, price: 20, eff: 17.6, tier: 'Bulk', gst: 12, hsn: '2202' },
    ],
    sub: 844.8, tax: 101.38, grand: 946.18, status: 'delivered', inv: 'INV-2026-0418', paid: true,
  },
];

export const FLEET: FleetVehicle[] = [
  { id: 'V-001', name: 'Tata Ace (KA-01-1234)', driver: 'Rajesh Kumar', status: 'en_route', deliveries: 3, total: 5, progress: 60 },
  { id: 'V-002', name: 'Mahindra Bolero (KA-01-5678)', driver: 'Suresh Yadav', status: 'loading', deliveries: 0, total: 4, progress: 0 },
  { id: 'V-003', name: 'Ashok Leyland (KA-01-9012)', driver: 'Venkat Reddy', status: 'available', deliveries: 6, total: 6, progress: 100 },
];

export const DEALER_NETWORK: DealerNet[] = [
  { id: 'RS-HYD-0001', name: 'Ramesh Stores', lid: 'RS-HYD-0001', loc: 'Ameerpet', ini: 'RS', orders: 156, revenue: 234500, outstanding: 1666, rating: 4.5 },
  { id: 'LK-HYD-0002', name: 'Lakshmi Kirana', lid: 'LK-HYD-0002', loc: 'Kukatpally', ini: 'LK', orders: 203, revenue: 389200, outstanding: 0, rating: 4.8 },
  { id: 'SB-HYD-0003', name: 'Sri Balaji Mart', lid: 'SB-HYD-0003', loc: 'Madhapur', ini: 'SB', orders: 178, revenue: 312000, outstanding: 3200, rating: 4.3 },
];

export function formatCurrency(v: number): string {
  return '\u20b9' + v.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
