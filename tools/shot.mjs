import { chromium } from 'playwright'
const url = process.argv[2], out = process.argv[3], wait = Number(process.argv[4] || 6000)
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1100, height: 850 } })
await page.goto(url, { waitUntil: 'load' })
await page.waitForTimeout(wait)
await page.screenshot({ path: out })
await browser.close()
console.log('shot saved:', out)
