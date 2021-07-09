import { Element } from 'components'


export class MarkupTextInput extends Element {


    public async fillValue(textValue: string, delay?: number, stateAfter?: { hidden?: true, disabled?: true }): Promise<void> {
        const element = await this.getElement()
        if (delay) {
            await element.type(textValue, { delay: delay })
        } else {
            await element.fill(textValue)
        }
        await this.exists(stateAfter)
        const propertyValue = await this.getElementProperty<string>([this.valueProperty])
        expect(propertyValue.toLowerCase()).toContain('')
    }

}
