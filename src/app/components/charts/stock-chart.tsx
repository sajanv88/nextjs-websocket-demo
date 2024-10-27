"use client";
import React from 'react';
import {StockDataResponse} from "@/app/interfaces/stock-data-response";


interface Props {
    data: StockDataResponse;
}
export default function StockChart ({data}: Props) {
    return (
        <div className="border rounded-lg shadow-md  text-gray-800">
            <h2 className="text-lg text-white font-bold p-5">{data.symbol}</h2>
            <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                <div>
                    <p className="text-sm font-bold" style={{
                        color: "#235789"
                    }}>Open: {data.open}</p>
                    <p className="text-sm font-bold" style={{
                        color: "#DBC327"
                    }}>Close: {data.close}</p>
                </div>
                <div>
                    <p className="text-sm font-bold" style={{
                        color: "#00B84D"
                    }}>High: {data.high}</p>
                    <p className="text-sm font-bold" style={{color: "#ED1C24"}}>Low: {data.low}</p>
                </div>
            </div>
        </div>
    );
};

