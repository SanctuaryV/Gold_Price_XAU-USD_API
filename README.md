# Gold Price API (XAU/USD)

API นี้จะดึงข้อมูลราคาทองคำ (XAU/USD) จากเว็บไซต์ [Investing.com](https://th.investing.com/currencies/xau-usd) โดยใช้ Puppeteer และ Express.js

## 🔧 วิธีใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. เริ่มต้นเซิร์ฟเวอร์

```bash
npm start
```

หากใช้ `nodemon` เพื่อให้รีโหลดอัตโนมัติ:

```bash
npx nodemon server.js
```

### 3. เรียกใช้งาน API

```http
GET /gold-price
```

📥 ตัวอย่าง Response:

```json
{
  "gold price XAU/USD": {
    "lastPrice": "2,345.67",
    "lowPrice": "2,310.00",
    "highPrice": "2,355.00",
    "openPrice": "2,320.00"
  }
}
```

## 🌐 Deploy บน Render

หากต้องการ deploy ไปยัง [Render](https://render.com):

- ใช้ `.render.yaml` เพื่อกำหนด build และ start command
- หรือใช้ `Procfile` ดังนี้:

```
web: node server.js
```

## 📦 ไฟล์ที่ควรมี

```
.
├── server.js
├── package.json
├── .render.yaml
├── Procfile
└── README.md
```

## 📋 หมายเหตุ

- ใช้ Puppeteer แทน Selenium เพื่อความเสถียรและง่ายต่อการรันบน Render
- หาก deploy บน Render ต้องใส่ args เพิ่มใน Puppeteer เช่น `--no-sandbox`, `--disable-setuid-sandbox`

## 👤 ผู้พัฒนา

Created with ❤️ โดยคุณ