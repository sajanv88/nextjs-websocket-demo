export interface StockDataResponse {
    afterHours: number;
    close:      number;
    from:       Date;
    high:       number;
    low:        number;
    open:       number;
    preMarket:  number;
    status:     string;
    symbol:     string;
    volume:     number;
}