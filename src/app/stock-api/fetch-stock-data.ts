import {StockDataResponse} from "@/app/interfaces/stock-data-response";

const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];

async function fetchStockData(symbol: string): Promise<StockDataResponse | null> {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 3);
    const date = previousDate.toISOString().split('T')[0];

    const API_KEY = process.env.POLYGON_API_KEY;

    if (!API_KEY) {
        console.error('Missing POLYGON_API_KEY environment variable');
        return null;
    }

    const url = `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=${API_KEY}`;
    console.log(`Fetching stock data for ${symbol} from ${url}`);
    const response = await fetch(
        url,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    if (!response.ok) {
        const error = await response.json() as { error: string };
        console.error(`Failed to fetch stock. Response: ${error.error}`);
        return null;
    }
    return await response.json() as StockDataResponse;

}

export async function fetchStockDataForSymbols(): Promise<StockDataResponse[]> {
    const response = STOCK_SYMBOLS.map((symbol) => fetchStockData(symbol));
    const nullableStockData = await Promise.all(response);
    return nullableStockData.filter((stock) => stock !== null);
}