const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/gold-price', async (req, res) => {
  console.log(`[${new Date().toLocaleString()}] API '/gold-price' accessed by: ${req.ip}`);

  try {
    const browser = await puppeteer.launch({
      headless: 'new', // ใช้โหมด headless ใหม่
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();
    await page.goto('https://th.investing.com/currencies/xau-usd', {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    await page.waitForSelector('div[data-test="instrument-price-last"]');

    const data = await page.evaluate(() => {
      const lastPrice = document.querySelector('div[data-test="instrument-price-last"]')?.innerText;

      const spans = document.querySelectorAll('div.mb-3.flex.justify-between.font-bold span');
      const lowPrice = spans[0]?.innerText;
      const highPrice = spans[1]?.innerText;

      const openPrice = document.querySelector('dd[data-test="open"]')?.innerText;

      return { lastPrice, lowPrice, highPrice, openPrice };
    });

    await browser.close();

    res.json({ "gold price XAU/USD": data });

  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
