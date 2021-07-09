import { ElementHandle } from 'playwright-core'
import { Element } from 'components'


export class CheckSpanInput extends Element {

    protected checkValues: string[]

    protected readonly checkedProperty = 'checked'


    protected setCheckValues(checkValues?: string[]): void {
        this.checkValues = checkValues
    }

    protected async getElement(): Promise<ElementHandle<SVGElement | HTMLElement>> {
        if (this.checkValues) {
            return await this.getElementByValue(this.checkValues)
        } else {
            return await page.waitForSelector(this.selector, { state: 'attached', timeout: this.timeoutElement })
        }
    }


    public async checkOption(checkValues?: string[], stateAfter?: { hidden?: true, disabled?: true }): Promise<void> {
        const spanSelector = await this.getSpanElement(checkValues)
        await spanSelector.check()
        await this.exists(stateAfter)
        expect(await this.getElementProperty<boolean>([this.checkedProperty])).toBeTruthy()
    }

    public async uncheckOption(checkValues?: string[], stateAfter?: { hidden?: true, disabled?: true }): Promise<void> {
        const spanSelector = await this.getSpanElement(checkValues)
        await spanSelector.uncheck()
        await this.exists(stateAfter)
        expect(await this.getElementProperty<boolean>([this.checkedProperty])).toBeFalsy()
    }


    private async getSpanElement(checkValues?: string[]) {
        this.setCheckValues(checkValues)
        if (checkValues) {
            return await this.getElementByValue(checkValues)
        } else {
            return await page.waitForSelector(
                `${this.selector} + span`, { state: 'attached', timeout: this.timeoutElement }
            )
        }
    }

}
