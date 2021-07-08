import { Frame } from 'playwright-core'
import { readFileSync } from 'fs'
import { cookiesPath } from 'modules/login/cookies'
import waitForExpect from 'wait-for-expect'


export class BasePage {

    public page: {
        readonly name: string
        url: string
        readonly title: string
    }

    protected readonly timeoutBasePage = 30000


    public async navigateTo(): Promise<void> {
        await page.goto(this.page.url, { timeout: this.timeoutBasePage })
    }


    public async check(): Promise<void> {
        await Promise.all([
            page.waitForURL(page.url(), { timeout: this.timeoutBasePage }),
            waitForExpect(async () => {
                expect((await page.title()).toLowerCase()).toContain(this.page.title.toLowerCase())
            }, this.timeoutBasePage)
        ])
    }


    public async navigationReload(): Promise<void> {
        await page.reload({ timeout: this.timeoutBasePage })
    }


    public async navigateBack(): Promise<void> {
        await page.goBack({ timeout: this.timeoutBasePage })
    }

    public async navigateForward(): Promise<void> {
        await page.goForward({ timeout: this.timeoutBasePage })
    }


    public async takeScreenshot(testName: string): Promise<void> {
        await page.screenshot({ path: `screenshots/${browserName}_${testName}.png`, fullPage: true, timeout: 7500 })
    }


    public async addCookies(): Promise<void> {
        const cookies = readFileSync(cookiesPath, 'utf8')
        const deserializedCookies = JSON.parse(cookies)
        await context.addCookies(deserializedCookies)
    }


    public async getIFrame(frameSelector: string): Promise<Frame> {
        const elementHandle = await page.waitForSelector(frameSelector)
        const iFrame = await elementHandle.contentFrame()
        return iFrame
    }


}
