
# Gold Price API

โปรเจคนี้เป็น API ที่สร้างขึ้นด้วย Node.js และ Selenium WebDriver สำหรับดึงข้อมูลราคาทองคำล่าสุด (XAU/USD) จากเว็บไซต์ Investing.com API นี้จะให้ข้อมูลเกี่ยวกับราคาทองคำ เช่น ราคาล่าสุด, ช่วงราคาต่ำสุด/สูงสุดของวัน และราคาเปิดตลาด

## ข้อกำหนดเบื้องต้น

โปรดตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งซอฟต์แวร์เหล่านี้ในเครื่องของคุณแล้ว:

- **Node.js** (v14 หรือเวอร์ชันที่ใหม่กว่า)
- **npm** (Node Package Manager)
- **Google Chrome** (เวอร์ชันล่าสุด)
- **ChromeDriver** (เวอร์ชันที่รองรับกับ Chrome ของคุณ)

## การติดตั้ง

1. โคลนโปรเจคนี้ไปยังเครื่องของคุณ:
    ```bash
    git clone https://github.com/yourusername/gold-price-api.git
    cd gold-price-api
    ```

2. ติดตั้ง dependencies:
    ```bash
    npm install
    ```

3. ติดตั้ง **ChromeDriver** ผ่าน npm (มันจะถูกติดตั้งโดยอัตโนมัติเมื่อคุณติดตั้ง `selenium-webdriver`):
    ```bash
    npm install chromedriver@latest selenium-webdriver@latest
    ```

## การรันเซิร์ฟเวอร์

หลังจากติดตั้งแล้ว คุณสามารถเริ่มต้นเซิร์ฟเวอร์ได้โดยใช้คำสั่งนี้:

```bash
npm start
```

เซิร์ฟเวอร์จะรันบนพอร์ตเริ่มต้นที่ `3000` คุณสามารถเข้าถึง API ได้ที่:

```
http://localhost:3000/gold-price
```

จุดสิ้นสุดนี้จะส่งข้อมูลในรูปแบบ JSON ที่มีข้อมูลดังต่อไปนี้เกี่ยวกับราคาทองคำ:

- `lastPrice`: ราคาทองคำล่าสุด (XAU/USD)
- `lowPrice`: ราคาต่ำสุดของวัน
- `highPrice`: ราคาสูงสุดของวัน
- `openPrice`: ราคาตลาดเปิด

### ตัวอย่างการตอบกลับ:

```json
{
  "gold price XAU/USD": {
    "lastPrice": "1,980.15",
    "lowPrice": "1,970.00",
    "highPrice": "1,990.00",
    "openPrice": "1,975.00"
  }
}
```

## การแก้ปัญหาที่พบ

หากคุณพบปัญหาเกี่ยวกับ `chromedriver` หรือ `selenium-webdriver` โปรดตรวจสอบว่า:

1. คุณได้ติดตั้ง **ChromeDriver** ที่รองรับกับเวอร์ชันของ **Google Chrome** ที่คุณใช้อยู่
2. หากจำเป็น คุณสามารถดาวน์โหลด **ChromeDriver** ที่ตรงกับเวอร์ชันของ Chrome ได้จาก [ที่นี่](https://sites.google.com/a/chromium.org/chromedriver/downloads)
3. หากพบข้อผิดพลาดเกี่ยวกับการตั้งค่า `headless` โปรดตรวจสอบว่าใช้การตั้งค่า `chrome.Options().addArguments('headless')` สำหรับ Selenium WebDriver อย่างถูกต้อง

## License

โปรเจคนี้เป็นโครงการที่ใช้ **MIT License** - ดูรายละเอียดได้ที่ไฟล์ [LICENSE](LICENSE)

## คำขอบคุณ

- [Selenium WebDriver](https://www.selenium.dev/webdriver/)
- [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/)
- [Investing.com](https://www.investing.com/) สำหรับข้อมูลราคาทองคำ
