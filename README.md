# DealerConnect - Admin/Stockist Portal

React Native (Expo) TypeScript app for the B2B Admin/Stockist Portal.

## Features

- **Home** dashboard with revenue KPIs, new order alerts, incoming orders, quick actions
- **Orders** management with status filters (All, Pending, Processing, Delivered, Cancelled)
- **Order Detail** with timeline, status management (Confirm, Process, Deliver, Cancel), payment collection
- **Invoices** with collected/pending summary, tax invoice view with GST breakdown
- **Dispatch & Fleet** with pending dispatch, vehicle assignment, fleet status with progress bars
- **Dealer Network** with search, dealer cards, revenue stats, outstanding collection
- **Reports & Analytics** with revenue trends, daily bars, dealer performance, product revenue
- **Notifications** for order status updates across all dealers

## Setup

```bash
npm install
npx expo start
```

## Stockist Details

| Field | Value |
|-------|-------|
| Company | SSR Enterprises |
| Owner | Sailaja Yashwanth |
| GSTIN | 36AABCS1234F1Z5 |
| Phone | +91 93965 22666 |

## Dealer Network

| Dealer | ID | Location | Rating |
|--------|-----|----------|--------|
| Ramesh Stores | RS-HYD-0001 | Ameerpet | 4.5 |
| Lakshmi Kirana | LK-HYD-0002 | Kukatpally | 4.8 |
| Sri Balaji Mart | SB-HYD-0003 | Madhapur | 4.3 |

## Tech Stack

- React Native with Expo SDK 52
- TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- Context API for state management
