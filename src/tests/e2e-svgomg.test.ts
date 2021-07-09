import { SvgomgPage, SvgomgGithubReadmePage } from 'pages'
import { docsPath, svgImageName, svgImageMarkup } from 'docs'


const svgomgPage = new SvgomgPage()
const svgomgGithubReadmePage = new SvgomgGithubReadmePage()

const downloadedSvgName = 'downloadImage.svg'
const svgAttributeToCheck = 'fill-rule="evenodd"'


describe('SVGOMG Page Test', () => {

    test('Navigate to SVGOMG', async () => {
        await svgomgPage.navigateTo()
    })
    test('Load & Check Page', async () => {
        await svgomgPage.check()
        await svgomgPage.loadComponents({
            activeToolBar: false,
            hiddenMenu: false,
            activeOutput: false,
            activeSettings: false,
            typeOfOutput: 'svg'
        })
    })

    test('Click About Button', async () => {
        await svgomgPage.clickAbout()
    })
    test('Check GitHub SVGOMG Readme Page', async () => {
        await svgomgGithubReadmePage.check()
    })
    test('Navigate back to SVGOMG Page', async () => {
        await svgomgGithubReadmePage.navigateBack()
        await svgomgPage.check()
        await svgomgPage.loadComponents({
            activeToolBar: false,
            hiddenMenu: false,
            activeOutput: false,
            activeSettings: false,
            typeOfOutput: 'svg'
        })
    })

    test('Upload SVG', async () => {
        await svgomgPage.openSvg(docsPath, svgImageName)
    })
    test('Check correctly uploaded SVG', async () => {
        await svgomgPage.loadSvg({
            activeToolBar: true,
            hiddenMenu: true,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })

    test('Open Menu & Check Page', async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: false,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })
    test('Paste Markup SVG', async () => {
        await svgomgPage.fillMarkup(svgImageMarkup)
    })
    test('Check correctly pasted Markup SVG', async () => {
        await svgomgPage.loadSvg({
            activeToolBar: true,
            hiddenMenu: true,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })

    test('Reset Settings', async () => {
        await svgomgPage.resetSettings()
    })
    test('Check Decrease File Diff Percentage', async () => {
        await svgomgPage.checkDiffPercentage('decrease')
    })

    test('Download & Check SVG', async () => {
        await svgomgPage.downloadSvg(downloadedSvgName)
        svgomgPage.checkDownloadedSvg(downloadedSvgName, svgAttributeToCheck)
    })

    test('Open Menu & Check Page', async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: false,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })
    test('Click Demo', async () => {
        await svgomgPage.clickDemo()
    })
    test('Switch to Markup Output & Check Page', async () => {
        await svgomgPage.clickCodeOption()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: true,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'code'
        })
    })
    test('Reset Settings', async () => {
        await svgomgPage.resetSettings()
    })
    test('Check "Remove XML Instructions" Switch', async () => {
        await svgomgPage.removeXmlInstructionsSwitchCheck()
    })
    test('Check "Remove Comments" Switch', async () => {
        await svgomgPage.removeCommentsSwitchCheck()
    })
    test('Check "Remove Metadata" Switch', async () => {
        await svgomgPage.removeMetadataSwitchCheck()
    })

})
