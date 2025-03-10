import { useState } from 'react';

interface ActivityData {
    NEW_ITEMS: number;
    NEW_ORDERS: number;
    REFUNDS: number;
    MESSAGE: number;
    GROUPS: number;
}

interface SalesData {
    name: string;
    value: number;
}

interface StockData {
    lowStockItems: number;
    itemCategories: number;
    refundedItems: number;
}

interface StoreData {
    location: string;
    employees: number;
    items: number;
    orders: number;
}

export const useDashboardData = () => {
    const [activityData] = useState<ActivityData>({
        NEW_ITEMS: 72241,
        NEW_ORDERS: 123,
        REFUNDS: 12,
        MESSAGE: 1,
        GROUPS: 4
    });

    const [salesData] = useState<SalesData[]>([
        { name: 'Confirmed', value: 30 },
        { name: 'Packed', value: 45 },
        { name: 'Refunded', value: 15 },
        { name: 'Shipped', value: 60 }
    ]);

    const [stockData] = useState<StockData>({
        lowStockItems: 12,
        itemCategories: 6,
        refundedItems: 1
    });

    const [storesData] = useState<StoreData[]>([
        { location: 'Manchester, UK', employees: 23, items: 308, orders: 2 },
        { location: 'Yorkshire, UK', employees: 11, items: 291, orders: 15 },
        { location: 'Hull, UK', employees: 5, items: 41, orders: 11 },
        { location: 'Leicester, UK', employees: 16, items: 261, orders: 8 }
    ]);

    return {
        activityData,
        salesData,
        stockData,
        storesData
    };
};
