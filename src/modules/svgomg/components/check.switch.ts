import { CheckInput } from 'components/form'
import { checkedProperty, classNameProperty, disabledProperty } from 'components/data'
import waitForExpect from 'wait-for-expect'


export class CheckSwitchInput extends CheckInput {

    private readonly spanSelector = 'span.material-switch'


    public async checkOption(checkValues?: string[], stateAfter?: { hidden?: true, disabled?: true }): Promise<void> {
        const spanSelector = await this.getSpanElement(checkValues)
        await spanSelector.check()
        await this.checkState(stateAfter)
        expect(await this.getElementProperty<boolean>([checkedProperty])).toBeTruthy()
    }


    public async uncheckOption(checkValues?: string[], stateAfter?: { hidden?: true, disabled?: true }): Promise<void> {
        const spanSelector = await this.getSpanElement(checkValues)
        await spanSelector.uncheck()
        await this.checkState(stateAfter)
        expect(await this.getElementProperty<boolean>([checkedProperty])).toBeFalsy()
    }


    private async getSpanElement(checkValues?: string[]) {
        this.setCheckValues(checkValues)
        if (checkValues) {
            return await this.getElementByValue(checkValues)
        } else {
            return await page.waitForSelector(
                `${this.parentSelector} ${this.spanSelector}`, { state: 'attached', timeout: this.timeoutElement }
            )
        }
    }


    // protected async checkHiddenState(hidden?: true): Promise<void> {
    //     const element = await this.getSpanElement()
    //     try {
    //         if (hidden) {
    //             if (await element.isVisible()) {
    //                 await waitForExpect(async () => {
    //                     expect(await this.getElementProperty<string>([classNameProperty])).toContain(hiddenProperty)
    //                 }, this.timeoutElement)
    //                 return
    //             }
    //             await waitForExpect(async () => {
    //                 expect(await element.isHidden()).toBeTruthy()
    //             }, this.timeoutElement)
    //         } else {
    //             await waitForExpect(async () => {
    //                 expect(await element.isVisible()).toBeTruthy()
    //             }, this.timeoutElement)
    //         }
    //     } catch (error) {
    //         error.message = error.message + ' > ' + this.selector
    //         throw error
    //     }
    // }

    // protected async checkDisabledState(disabled?: true): Promise<void> {
    //     const element = await this.getSpanElement()
    //     const isEnabled = await element.isEnabled()
    //     const isEditable = await element.isEditable()
    //     try {
    //         if (disabled) {
    //             if (isEnabled && isEditable) {
    //                 await waitForExpect(async () => {
    //                     expect(await this.getElementProperty<boolean>([classNameProperty])).toContain(disabledProperty)
    //                 }, this.timeoutElement)
    //                 return
    //             }
    //             await waitForExpect(async () => {
    //                 expect(await element.isDisabled() || !await element.isEditable()).toBeTruthy()
    //             }, this.timeoutElement)
    //             return
    //         }
    //         await waitForExpect(async () => {
    //             expect(await element.isEnabled()).toBeTruthy()
    //         }, this.timeoutElement)
    //         await waitForExpect(async () => {
    //             expect(await this.getElementProperty<boolean>([classNameProperty])).not.toContain(disabledProperty)
    //         }, this.timeoutElement)
    //     } catch (error) {
    //         error.message = error.message + ' > ' + this.selector
    //         throw error
    //     }
    // }

}
