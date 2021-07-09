import { SvgomgPage } from 'svgomg/pages/svgomg.page'
import { SvgomgGithubReadmePage } from 'pages/svgomg-github-readme.page'
import { docsPath, svgImageName, svgImageMarkup } from 'docs'


describe('SVGOMG Page Test', () => {

    const svgomgPage = new SvgomgPage()

    test(`Navigate to ${svgomgPage.page.name}`, async () => {
        await svgomgPage.navigateTo()
    })
    test(`Load ${svgomgPage.page.name}`, async () => {
        await svgomgPage.check()
        await svgomgPage.loadComponents({
            activeToolBar: false,
            hiddenMenu: false,
            activeOutput: false,
            activeSettings: false,
            typeOfOutput: 'svg'
        })
    })

    const svgomgGithubReadmePage = new SvgomgGithubReadmePage()

    test(`Click About Button - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickAbout()
    })
    test(`Load ${svgomgGithubReadmePage.page.name}`, async () => {
        await svgomgGithubReadmePage.check()
    })
    test(`Navigate back to ${svgomgPage.page.name}`, async () => {
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

    test(`Open Menu - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents({
            activeToolBar: true,
            hiddenMenu: false,
            activeOutput: true,
            activeSettings: true,
            typeOfOutput: 'svg'
        })
    })
    test(`Paste Markup - ${svgomgPage.page.name}`, async () => {
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

    const downloadSvgName = 'downloadImage.svg'

    test(`Download & Check SVG - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.downloadSvg(downloadSvgName)
        svgomgPage.checkDownloadedSvg(downloadSvgName, 'fill-rule="evenodd"')
    })

    test(`Open Menu - ${svgomgPage.page.name}`, async () => {
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
    test(`Switch to Markup Output - ${svgomgPage.page.name}`, async () => {
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
    test(`Check "Remove XML Instructions" Option - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.removeXmlInstructionsCheck()
    })
    test(`Check "Remove Comments" Option - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.removeCommentsCheck()
    })
    test(`Check "Remove Metadata" Option - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.removeMetadataCheck()
    })

})
