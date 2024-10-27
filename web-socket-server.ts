import  { WebSocketServer } from 'ws';
import {StockDataResponse} from "@/app/interfaces/stock-data-response";
import {fetchStockDataForSymbols} from "./src/app/stock-api/fetch-stock-data";

// Temporary store. In real world, we would use a database to store this data and fetch it from there, Periodically update the database via background job.
let results: Array<StockDataResponse> = [];

export default async function initWebSocketServer(port: number, dev: boolean = true) {
    const wss = new WebSocketServer({ port: port + 1 });
    wss.on('connection', (ws) => {
        ws.send("Fetching Data...");
        async function sendToClient() {
            if(results.length === 0) {
                results = await fetchStockDataForSymbols();
                if (results && results.length > 0) {
                    console.log('Sending stock data to client');
                    ws.send(JSON.stringify(results));
                    return;
                }
                ws.send("No data available");
                return;
            }
            console.log('Sending stock data cached version to client');
            results.forEach((data) => {
                data.open = parseFloat((Math.random() * 1000).toFixed(2));
                data.close = parseFloat((Math.random() * 1000).toFixed(2));
                data.high = parseFloat((Math.random() * 1000).toFixed(2));
                data.low = parseFloat((Math.random() * 1000).toFixed(2));
            });
            ws.send(JSON.stringify(results));
        }

        // Send stock data to client every 5 seconds
        const stockDataInterval = setInterval(async () => {
            await sendToClient();
        }, 5000);

        ws.on('close', () => {
            clearInterval(stockDataInterval);
        });
    });

    console.log(
        `> Web Socket Server listening at ws://localhost:${port+1} as ${
            dev ? "development" : process.env.NODE_ENV
        }`,
    );
}