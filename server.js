const express = require('express');
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/gold-price', async (req, res) => {
  // เปิด Chrome แบบ headless (ไม่มี UI)
  const options = new chrome.Options();
  options.addArguments('headless'); // ใช้โหมด headless แทน .headless()

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://th.investing.com/currencies/xau-usd");
    await driver.sleep(5000); // รอให้เว็บโหลดข้อมูล

    // ดึงราคาทองล่าสุด
    const priceElement = await driver.findElement(By.css('div[data-test="instrument-price-last"]'));
    const lastPrice = await priceElement.getText();

    // ดึงช่วงราคาของวัน (low/high)
    const rangeDiv = await driver.findElement(By.css('div.mb-3.flex.justify-between.font-bold'));
    const spans = await rangeDiv.findElements(By.css('span'));
    const lowPrice = spans.length >= 1 ? await spans[0].getText() : null;
    const highPrice = spans.length >= 2 ? await spans[1].getText() : null;

    // ดึงราคาเปิดตลาด
    const openElement = await driver.findElement(By.css('dd[data-test="open"]'));
    const openPrice = await openElement.getText();

    // ส่งข้อมูลออกเป็น JSON
    res.json({
      "gold price XAU/USD": {
        lastPrice,
        lowPrice,
        highPrice,
        openPrice
      }
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
  } finally {
    await driver.quit();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
