"use client"
import React, {useEffect, useState} from "react";
import StockChart from "@/app/components/charts/stock-chart";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {StockDataResponse} from "@/app/interfaces/stock-data-response";


function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

export default function Home() {
    const [stocks, setStocks] = useState<StockDataResponse[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001'); // URL points to the WebSocket route

        ws.onopen = () => {
            setConnected(true);
            console.log('Connected');
        };

        ws.onmessage = (event) => {
            const data = event.data;
            if(isJsonString(data)) {
                const jsonData = JSON.parse(data);

                if (Array.isArray(jsonData)) {
                    console.log('Received stock data', jsonData);
                    setStocks(jsonData);
                    setMessage('');
                }
            }else {
                console.log('Received message: %s', data);
                setMessage(data);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected');
            setConnected(false);
            setStocks([]);
            setMessage('Disconnected from server. Please refresh the page to reconnect');
        };
        return () => {
            ws.close();
        };
    }, []);
  return (
      <div className="mx-auto container">
          {message && <h1 className="text-2xl text-center">{message}</h1>}
          {!connected && <h1 className="text-2xl text-center">Connecting...</h1>}
          {stocks.length > 0 && (
              <div className="w-full">
                  <h3 className="text-lg text-center font-bold pb-5 pl-5 pr-5 text-white">All Stocks Graph</h3>
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart width={800} height={450} data={stocks} margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                          <CartesianGrid strokeDasharray="3 3"/>
                          <XAxis dataKey="symbol"/>
                          <YAxis/>
                          <Line type="monotone" dataKey="open" stroke="#235789" activeDot={{r: 8}}/>
                          <Line type="monotone" dataKey="close" stroke="#DBC327"/>
                          <Line type="monotone" dataKey="high" stroke="#00B84D"/>
                          <Line type="monotone" dataKey="low" stroke="#ED1C24"/>
                          <Tooltip/>
                      </LineChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-5">
                      {stocks.map((stock) => (<StockChart data={stock} key={stock.symbol}/>))}
                  </div>
              </div>
          )}
      </div>
  );
}
