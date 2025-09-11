// backend/routes/market.js
import express from "express";
import yahooFinance from "yahoo-finance2";

const router = express.Router();

const cache = {
  data: null,
  timestamp: null,
  CACHE_DURATION_MS: 5 * 60 * 1000,
};

router.get("/market", async (req, res) => {
  console.log("Received request for /api/market");
  const now = Date.now();

  if (cache.data && cache.timestamp && now - cache.timestamp < cache.CACHE_DURATION_MS) {
    console.log("Serving /api/market from cache.");
    return res.json(cache.data);
  }

  try {
    // === Fetch Indices (Sensex & Nifty 50) ===
    const indexSymbols = ["^BSESN", "^NSEI"];
    const indices = await Promise.all(
      indexSymbols.map(async (symbol) => {
        const quote = await yahooFinance.quote(symbol);
        return {
          name: quote.shortName || symbol,
          symbol: quote.symbol,
          value: quote.regularMarketPrice,
          change: quote.regularMarketChange,
          changePercent: quote.regularMarketChangePercent,
          high: quote.regularMarketDayHigh,
          low: quote.regularMarketDayLow,
        };
      })
    );

    const result = { indices };

    cache.data = result;
    cache.timestamp = now;

    console.log("Successfully fetched market data.");
    res.json(result);
  } catch (err) {
    console.error("Error fetching market data:", err.message);
    if (cache.data) return res.json(cache.data);
    res.status(500).json({ error: "Failed to fetch market data", details: err.message });
  }
});

export default router;
