import { SvgomgPage, SvgomgGithubReadmePage } from 'pages'
import { docsPath, svgImageName, svgImageMarkup } from 'docs'


const svgomgPage = new SvgomgPage()
const svgomgGithubReadmePage = new SvgomgGithubReadmePage()

const downloadedSvgName = 'downloadImage.svg'
const svgAttributeToCheck = 'fill-rule="evenodd"'


describe('SVGOMG Page Test', () => {

    test(`Navigate to - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.navigateTo()
    })
    test(`Load & Check - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.check()
        await svgomgPage.loadComponents({
            activeToolBar: false,
            hiddenMenu: false,
            activeOutput: false,
            activeSettings: false,
            typeOfOutput: 'svg'
        })
    })

    test(`Click About Button - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickAbout()
    })
    test(`Check - ${svgomgGithubReadmePage.page.name}`, async () => {
        await svgomgGithubReadmePage.check()
    })
    test(`Navigate back to - ${svgomgPage.page.name}`, async () => {
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

    test(`Upload SVG - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.openSvg(docsPath, svgImageName)
    })
    test(`Check correctly uploaded SVG - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.loadSvg({
            activeToolBar: true,
            hiddenMenu: true,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })

    test(`Open Menu & Check - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: false,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })
    test(`Paste Markup SVG - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.fillMarkup(svgImageMarkup)
    })
    test(`Check correctly pasted Markup SVG - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.loadSvg({
            activeToolBar: true,
            hiddenMenu: true,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })

    test(`Reset Settings - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.resetSettings()
    })
    test(`Check Decrease File Diff Percentage - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.checkDiffPercentage('decrease')
    })

    test(`Download & Check SVG - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.downloadSvg(downloadedSvgName)
        svgomgPage.checkDownloadedSvg(downloadedSvgName, svgAttributeToCheck)
    })

    test(`Open Menu & Check - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: false,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })
    test(`Click Demo - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickDemo()
    })
    test(`Switch to Markup Output & Check - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickCodeOption()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: true,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'code'
        })
    })
    test(`Reset Settings - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.resetSettings()
    })
    test(`Check "Remove XML Instructions" Switch - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.removeXmlInstructionsSwitchCheck()
    })
    test(`Check "Remove Comments" Switch - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.removeCommentsSwitchCheck()
    })
    test(`Check "Remove Metadata" Switch - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.removeMetadataSwitchCheck()
    })

})
