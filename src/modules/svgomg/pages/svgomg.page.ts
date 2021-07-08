import { BasePage } from 'pages/base.page'
import { Element, Button } from 'components'
import { CheckInput, TextInput } from 'components/form'
import { CheckSpanInput, CheckSwitchInput } from 'modules/svgomg/components'
import { classNameProperty } from 'components/data'
import { ComponentsStatusData } from 'modules/svgomg/model'
import { svgomgUrl, svgomgGithubUrl, svgomgGithubReadmeUrl } from 'data/routing.data'
import { svgImageName } from 'docs'
import { downloadsPath } from 'modules/svgomg/downloads'
import { ApiInterception } from 'utils'


export class SvgomgPage extends BasePage {

    constructor() {
        super()
        this.page = {
            name: 'Svgomg Page',
            url: svgomgUrl,
            title: 'SVGOMG - SVGO\'s Missing GUI'
        }
    }

    private readonly toolbar = new Element('div.toolbar') // Active

    private readonly menuButton = new Button('button.menu-btn')
    private readonly imageRadio = new CheckSpanInput('input[type=radio][value=image]')
    private readonly markupRadio = new CheckSpanInput('input[type=radio][value=code]')


    private readonly navMenu = new Element('nav.menu') // Hidden

    private readonly openSVGButton = new Button('div[role=button].load-file')
    private readonly pasteMarkupButton = new Button('span.label-txt:has-text("Paste markup")')
    private readonly pasteMarkupText = new TextInput('textarea.paste-input')
    // DOUBT with these 2
    private readonly demoButton = new Button('div[role=button].load-demo')
    private readonly contributeButton = new Button(`a[href="${svgomgGithubUrl}"]`)
    private readonly aboutButton = new Button(`a[href="${svgomgGithubReadmeUrl}"]`)


    private readonly output = new Element('div.output') // Where the SVG displays

    private readonly actionButtonContainer = new Element('div.action-button-container') // ACTIVE
    private readonly previewVividBackgroundButton = new Button('div[role=button][title="Preview on vivid background"]')
    private readonly copyAsTextButton = new Button('div[role=button][title="Copy as text"]')
    private readonly diffResults = new Element('span.diff')
    private readonly downloadLinkButton = new Button('a[title="Download"]')

    private readonly svgOutput = new Element('div.svg-output') // ACTIVE
    private readonly svgIFrameSelector = 'iframe.svg-frame'
    private readonly svgSelector = 'svg' // [xmlns="http://www.w3.org/2000/svg"] // DOUBT

    private readonly codeOutput = new Element('div.code-output') // ACTIVE
    private readonly xmlInstructionsCode = new Element('code span.prolog')
    private readonly commentCode = new Element('code span.comment')
    private readonly metadataCode = new Element('code span:has-text("metadata")')


    private readonly settings = new Element('div.settings') // Active

    private readonly globalSection = new Element('section.global')
    private readonly pluginsSection = new Element('section.plugins')

    private readonly removeXmlInstructionsCheckbox =
        new CheckSwitchInput('input[type=checkbox][name=removeXMLProcInst]', 'label.setting-item-toggle')
    private readonly removeCommentsCheckbox = new CheckSwitchInput('input[type=checkbox][name=removeComments]', 'label.setting-item-toggle')
    private readonly removeMetadataCheckbox = new CheckSwitchInput('input[type=checkbox][name=removeMetadata]', 'label.setting-item-toggle')
    private readonly settingsResetButton = new Button('button.setting-reset')


    public async loadComponents(componentsStatusData: ComponentsStatusData): Promise<void> {
        await Promise.all([
            this.loadToolBar({ active: componentsStatusData.activeToolBar }),
            this.loadMenu({ hidden: componentsStatusData.hiddenMenu }),
            this.loadOutput({ active: componentsStatusData.activeOutput }, componentsStatusData.typeOfOutput),
            this.loadSettings({ active: componentsStatusData.activeSettings })
        ])
    }

    private async loadToolBar(isToolbarActive: { active: boolean }): Promise<void> {
        await this.toolbar.exists()
        await this.toolbar.checkActive(isToolbarActive.active)
        await Promise.all([
            this.menuButton.exists(),
            this.imageRadio.exists(),
            this.markupRadio.exists()
        ])
    }

    private async loadMenu(isMenuHidden: { hidden: boolean }): Promise<void> {
        await this.navMenu.exists(isMenuHidden.hidden ? { hidden: true } : undefined)
        await Promise.all([
            this.openSVGButton.exists(),
            this.pasteMarkupButton.exists(),
            this.demoButton.exists(),
            this.contributeButton.exists(),
            this.aboutButton.exists()
        ])
    }

    private async loadOutput(isOutputActive: { active: boolean }, typeOfOutput: 'svg' | 'code'): Promise<void> {
        await this.output.exists()
        await Promise.all([
            this.actionButtonContainer.exists(),
            this.actionButtonContainer.checkActive(isOutputActive.active)
        ])
        await Promise.all([
            this.previewVividBackgroundButton.exists(),
            this.copyAsTextButton.exists(),
            this.diffResults.exists(isOutputActive.active ? undefined : { hidden: true }),
            this.downloadLinkButton.exists()
        ])
        switch (typeOfOutput) {
        case 'svg':
            await Promise.all([
                this.svgOutput.exists(),
                // this.svgOutput.checkActive(isOutputActive.active), // BUG ? always active
                this.codeOutput.notExists()
            ])
            break
        case 'code':
            await Promise.all([
                this.codeOutput.exists(),
                // this.codeOutput.checkActive(isOutputActive.active), // BUG ? always active
                this.svgOutput.notExists()
            ])
            break
        }
    }

    private async loadSettings(settingsIsActive: { active: boolean }): Promise<void> {
        await this.settings.exists()
        await this.settings.checkActive(settingsIsActive.active)
        await Promise.all([
            this.removeXmlInstructionsCheckbox.exists(),
            this.removeCommentsCheckbox.exists(),
            this.removeMetadataCheckbox.exists(),
            this.settingsResetButton.exists(),
            this.globalSection.exists(),
            this.pluginsSection.exists()
        ])
    }


    public async clickMenuButton(): Promise<void> {
        await this.toolbar.checkActive(true)
        await this.menuButton.click()
    }


    public async openSvg(docsPath: string, fileName: string): Promise<void> {
        // await Promise.all([
        //     ApiInterception.waitForRequest({ url: '', status: 200, searchParams: ['w3', 'org'] }), // request?
        //     this.uploadSvgDocument(docsPath, fileName)
        // ])
        // DOUBT
        await this.uploadSvgDocument(docsPath, fileName)
    }

    private async uploadSvgDocument(docsPath: string, fileName: string): Promise<void> {
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            this.openSVGButton.click()
        ])
        await fileChooser.setFiles(docsPath + fileName)
    }


    public async loadSvg(componentsStatusData: ComponentsStatusData): Promise<void> {
        await this.loadComponents(componentsStatusData)
        const iFrame = await this.getIFrame(this.svgIFrameSelector)
        await iFrame.waitForSelector(this.svgSelector)
    }


    public async fillMarkup(markupText: string): Promise<void> {
        await this.pasteMarkupButton.click()
        await this.pasteMarkupText.checkFocused(true)
        await this.pasteMarkupText.fillVolatileValue(markupText) // Volatile ? DOUBT
    }


    public async clickAbout(): Promise<void> {
        await this.aboutButton.click()
    }


    public async resetSettings(): Promise<void> {
        // await Promise.all([
        //     ApiInterception.waitForRequest({ url: '', status: 200, searchParams: ['w3', 'org'] }), // request?
        //     this.uploadSvgDocument(docsPath, fileName)
        // ])
        // DOUBT
        await this.settingsResetButton.click()
    }


    public async checkDiffPercentage(difference: 'increase' | 'decrease' | ''): Promise<void> {
        expect(await this.diffResults.getElementProperty([classNameProperty])).toContain(difference)
    }


    public async downloadSvg(): Promise<void> {
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            this.downloadLinkButton.click()
        ])
        await download.saveAs(downloadsPath + 'downloadImage.svg')
    }

    public async getHrefSvg(): Promise<string> {
        return await this.downloadLinkButton.getElementProperty(['href'])
    }

    public async getSvgInnerHtml(url: string): Promise<string> {
        const newTab = await context.newPage()
        await newTab.goto(url)
        const svgInnerHtml = await newTab.innerHTML('svg')
        await newTab.close()
        return svgInnerHtml
    }


    public async clickDemo(): Promise<void> {
        await Promise.all([
            ApiInterception.waitForRequest({ url: 'jakearchibald.github.io/svgomg', status: 200 }),
            this.demoButton.click()
        ])
    }


    public async switchOutput(output: 'svg' | 'code'): Promise<void> {
        switch (output) {
        case 'svg':
            // await Promise.all([
            //     ApiInterception.waitForRequest({ url: '', status: 200, searchParams: ['w3', 'org'] }), // request?
            //     this.imageRadio.checkOption()
            // ])
            // DOUBT
            await this.imageRadio.checkOption()
            await this.svgOutput.exists()
            await this.svgOutput.checkActive(true)
            break
        case 'code':
            await this.markupRadio.checkOption()
            await this.codeOutput.exists()
            await this.codeOutput.checkActive(true)
            break
        }
    }


    // private readonly commentCode = new Element('code span.comment')
    // private readonly metadataCode = new Element('code span:has-text("metadata")')
    // private readonly xmlInstructionsCode = new Element('code span.prolog')

    public async removeXmlInstructionsCheck(): Promise<void> {
        await this.removeXmlInstructionsCheckbox.uncheckOption() // check ?? type=checkbox
        await this.xmlInstructionsCode.exists()
        await this.removeXmlInstructionsCheckbox.checkOption() // check ?? type=checkbox
        await this.xmlInstructionsCode.notExists()
    }

    public async removeCommentsCheck(): Promise<void> {
        await this.removeCommentsCheckbox.uncheckOption() // check ?? type=checkbox
        await this.commentCode.exists()
        await this.removeCommentsCheckbox.checkOption() // check ?? type=checkbox
        await this.commentCode.notExists()
    }

    public async removeMetadataCheck(): Promise<void> {
        await this.removeMetadataCheckbox.uncheckOption() // check ?? type=checkbox
        await this.metadataCode.exists()
        await this.removeMetadataCheckbox.checkOption() // check ?? type=checkbox
        await this.metadataCode.notExists()
    }

}
