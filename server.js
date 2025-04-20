const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/gold-price', async (req, res) => {
  console.log(`[${new Date().toLocaleString()}] API '/gold-price' accessed by: ${req.ip}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new", // ใช้ headless แบบใหม่
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://th.investing.com/currencies/xau-usd', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    await page.waitForSelector('div[data-test="instrument-price-last"]', { timeout: 15000 });

    const lastPrice = await page.$eval('div[data-test="instrument-price-last"]', el => el.textContent.trim());

    const range = await page.$$eval('div.mb-3.flex.justify-between.font-bold span', spans =>
      spans.map(span => span.textContent.trim())
    );

    const openPrice = await page.$eval('dd[data-test="open"]', el => el.textContent.trim());

    res.json({
      "gold price XAU/USD": {
        lastPrice,
        lowPrice: range[0] || null,
        highPrice: range[1] || null,
        openPrice
      }
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
