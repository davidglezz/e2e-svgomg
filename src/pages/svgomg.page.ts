import { BasePage } from 'pages/base.page'
import { Element, Button } from 'components'
import { MarkupTextInput, CheckSpanInput } from 'components/inputs'
import { ComponentsStatusData } from 'model'
import { svgomgUrl, svgomgGithubUrl, svgomgGithubReadmeUrl } from 'data/routing.data'
import { docsPath } from 'docs'
import { ApiInterception } from 'utils'
import { readFileSync } from 'fs'


export class SvgomgPage extends BasePage {

    constructor() {
        super()
        this.page = {
            name: 'SVGOMG Page',
            url: svgomgUrl,
            title: 'SVGOMG - SVGO\'s Missing GUI'
        }
    }

    private readonly toolbar = new Element('div.toolbar')

    private readonly menuButton = new Button('button.menu-btn')
    private readonly imageRadio = new CheckSpanInput('input[type=radio][value=image]')
    private readonly markupRadio = new CheckSpanInput('input[type=radio][value=code]')


    private readonly navMenu = new Element('nav.menu')

    private readonly openSVGButton = new Button('div[role=button].load-file')
    private readonly pasteMarkupButton = new Button('span.label-txt:has-text("Paste markup")')
    private readonly pasteMarkupText = new MarkupTextInput('textarea.paste-input')
    private readonly demoButton = new Button('div[role=button].load-demo')
    private readonly contributeButton = new Button(`a[href="${svgomgGithubUrl}"]`)
    private readonly aboutButton = new Button(`a[href="${svgomgGithubReadmeUrl}"]`)


    private readonly output = new Element('div.output')

    private readonly actionButtonContainer = new Element('div.action-button-container')
    private readonly previewVividBackgroundButton = new Button('div[role=button][title="Preview on vivid background"]')
    private readonly copyAsTextButton = new Button('div[role=button][title="Copy as text"]')
    private readonly diffResults = new Element('span.diff')
    private readonly downloadLinkButton = new Button('a[title="Download"]')

    private readonly svgOutput = new Element('div.svg-output')
    private readonly svgIFrameSelector = 'iframe.svg-frame'
    private readonly svgSelector = 'svg'

    private readonly codeOutput = new Element('div.code-output')
    private readonly xmlInstructionsCode = new Element('code span.prolog')
    private readonly commentCode = new Element('code span.comment')
    private readonly metadataCode = new Element('code span:has-text("metadata")')


    private readonly settings = new Element('div.settings')

    private readonly globalSection = new Element('section.global')
    private readonly pluginsSection = new Element('section.plugins')

    private readonly removeXmlInstructionsCheckbox =
        new CheckSpanInput('input[type=checkbox][name=removeXMLProcInst]', 'label.setting-item-toggle')
    private readonly removeCommentsCheckbox =
        new CheckSpanInput('input[type=checkbox][name=removeComments]', 'label.setting-item-toggle')
    private readonly removeMetadataCheckbox =
        new CheckSpanInput('input[type=checkbox][name=removeMetadata]', 'label.setting-item-toggle')
    private readonly settingsResetButton = new Button('button.setting-reset')


    public async loadComponents(componentsStatusData: ComponentsStatusData): Promise<void> {
        await Promise.all([
            this.loadToolBar({ active: componentsStatusData.activeToolBar }),
            this.loadMenu({ hidden: componentsStatusData.hiddenMenu }),
            componentsStatusData.typeOfOutput === 'svg' && this.loadSvgOutput({ active: componentsStatusData.activeOutput }),
            componentsStatusData.typeOfOutput === 'code' && this.loadCodeOutput({ active: componentsStatusData.activeOutput }),
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


    private async loadSvgOutput(isOutputActive: { active: boolean }): Promise<void> {
        await this.loadOutput(isOutputActive)
        await Promise.all([
            this.svgOutput.exists(),
            this.codeOutput.notExists()
        ])
    }

    private async loadCodeOutput(isOutputActive: { active: boolean }): Promise<void> {
        await this.loadOutput(isOutputActive)
        await Promise.all([
            this.codeOutput.exists(),
            this.svgOutput.notExists()
        ])
    }

    private async loadOutput(isOutputActive: { active: boolean }): Promise<void> {
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
        await this.pasteMarkupText.fillValue(markupText)
    }


    public async clickAbout(): Promise<void> {
        await this.aboutButton.click()
    }


    public async resetSettings(): Promise<void> {
        await this.settingsResetButton.click()
    }


    public async checkDiffPercentage(difference: 'increase' | 'decrease' | ''): Promise<void> {
        expect(await this.diffResults.getElementProperty(['className'])).toContain(difference)
    }


    public async downloadSvg(svgName: string): Promise<void> {
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            this.downloadLinkButton.click()
        ])
        await download.saveAs(docsPath + svgName)
    }

    public checkDownloadedSvg(svgName: string, attributeToCheck: string): void {
        expect(readFileSync(docsPath + svgName, 'utf-8')).toContain(attributeToCheck)
    }


    public async clickDemo(): Promise<void> {
        await Promise.all([
            ApiInterception.waitForRequest({ url: 'jakearchibald.github.io/svgomg', status: 200 }),
            this.demoButton.click()
        ])
    }


    public async clickSvgOption(): Promise<void> {
        await this.imageRadio.checkOption()
        await this.svgOutput.exists()
        await this.svgOutput.checkActive(true)

    }

    public async clickCodeOption(): Promise<void> {
        await this.markupRadio.checkOption()
        await this.codeOutput.exists()
        await this.codeOutput.checkActive(true)
    }


    public async removeXmlInstructionsSwitchCheck(): Promise<void> {
        await this.removeXmlInstructionsCheckbox.uncheckOption()
        await this.xmlInstructionsCode.exists()
        await this.removeXmlInstructionsCheckbox.checkOption()
        await this.xmlInstructionsCode.notExists()
    }

    public async removeCommentsSwitchCheck(): Promise<void> {
        await this.removeCommentsCheckbox.uncheckOption()
        await this.commentCode.exists()
        await this.removeCommentsCheckbox.checkOption()
        await this.commentCode.notExists()
    }

    public async removeMetadataSwitchCheck(): Promise<void> {
        await this.removeMetadataCheckbox.uncheckOption()
        await this.metadataCode.exists()
        await this.removeMetadataCheckbox.checkOption()
        await this.metadataCode.notExists()
    }

}
