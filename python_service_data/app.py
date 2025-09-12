from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

# --- Configuration ---
INDEX_SYMBOLS = ["^BSESN", "^NSEI"]
NIFTY_50_SYMBOLS = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS",
    "HINDUNILVR.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS", "LICI.NS",
    "BAJFINANCE.NS", "HCLTECH.NS", "KOTAKBANK.NS", "MARUTI.NS", "TATAMOTORS.NS",
    "SUNPHARMA.NS", "ONGC.NS", "NTPC.NS", "ADANIENT.NS", "WIPRO.NS",
]

@app.route("/api-market")
def get_market_data():
    try:
        # === 1. Fetch Index Data ===
        index_tickers = yf.Tickers(INDEX_SYMBOLS)
        indices_data = []
        for symbol in INDEX_SYMBOLS:
            quote = index_tickers.tickers[symbol].info or {}
            indices_data.append({
                'name': quote.get('shortName', symbol),
                'symbol': quote.get('symbol'),
                'value': quote.get('regularMarketPrice'),
                'change': quote.get('regularMarketChange'),
                'changePercent': quote.get('regularMarketChangePercent'),
                'high': quote.get('regularMarketDayHigh'),
                'low': quote.get('regularMarketDayLow'),
            })

        # === 2. Fetch Stock Data ===
        stock_tickers = yf.Tickers(NIFTY_50_SYMBOLS)
        all_stocks = []
        for symbol in NIFTY_50_SYMBOLS:
            quote = stock_tickers.tickers[symbol].info or {}
            if quote.get('regularMarketPrice') is not None:
                all_stocks.append({
                    'symbol': quote.get('symbol'),
                    'price': quote.get('regularMarketPrice'),
                    'change': quote.get('regularMarketChange'),
                    'changePercent': quote.get('regularMarketChangePercent', 0),
                    'volume': quote.get('regularMarketVolume'),
                    'high': quote.get('regularMarketDayHigh'),
                    'low': quote.get('regularMarketDayLow'),
                    'open': quote.get('regularMarketOpen'),
                    'previousClose': quote.get('regularMarketPreviousClose'),
                })

        # === 3. Process Gainers, Losers, Market Breadth ===
        valid_stocks = [s for s in all_stocks if s.get('change') is not None]
        advances = sum(1 for s in valid_stocks if s['change'] > 0)
        declines = sum(1 for s in valid_stocks if s['change'] < 0)
        unchanged = len(valid_stocks) - advances - declines
        ratio = advances / declines if declines > 0 else advances

        market_breadth = {
            "advances": advances,
            "declines": declines,
            "unchanged": unchanged,
            "ratio": round(ratio, 2)
        }

        top_gainers = sorted([s for s in valid_stocks if s['changePercent'] > 0],
key=lambda x: x['changePercent'], reverse=True)[:5]
        top_losers = sorted([s for s in valid_stocks if s['changePercent'] < 0],
                            key=lambda x: x['changePercent'])[:5]

        # === 4. Final payload ===
        final_data = {
            "indices": indices_data,
            "topGainers": top_gainers,
            "topLosers": top_losers,
            "topStocks": top_gainers + top_losers,
            "marketBreadth": market_breadth,
        }

        return jsonify(final_data)

    except Exception as e:
        print(f"Error in Python service: {e}")
        return jsonify({"error": "Failed to fetch data", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)
