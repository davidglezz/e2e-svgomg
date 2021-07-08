import { SvgomgPage } from 'modules/svgomg/pages/svgomg.page'
import { SvgomgGithubReadmePage } from 'pages/svgomg-github-readme.page'
import { ComponentsStatusData } from 'modules/svgomg/model'
import { docsPath, svgImageName, svgImageMarkup } from 'docs'


const initialComponentsStatusData: ComponentsStatusData = {
    activeToolBar: false,
    hiddenMenu: false,
    activeOutput: false,
    activeSettings: false,
    typeOfOutput: 'svg'
}

const svgLoadedComponentsStatusData: ComponentsStatusData = {
    activeToolBar: true,
    hiddenMenu: true,
    activeOutput: true,
    activeSettings: true,
    typeOfOutput: 'svg'
}

const svgLoadedAndMenuOpenComponentsStatusData: ComponentsStatusData = {
    activeToolBar: true,
    hiddenMenu: false,
    activeOutput: true,
    activeSettings: true,
    typeOfOutput: 'svg'
}

const codeLoadedComponentsStatusData: ComponentsStatusData = {
    activeToolBar: true,
    hiddenMenu: true,
    activeOutput: true,
    activeSettings: true,
    typeOfOutput: 'code'
}

const codeLoadedAndMenuOpenComponentsStatusData: ComponentsStatusData = {
    activeToolBar: true,
    hiddenMenu: false,
    activeOutput: true,
    activeSettings: true,
    typeOfOutput: 'code'
}


// beforeAll(async () => {
//     await svgomgPage.addCookies()
// })


describe('SVGOMG Page Test', () => {

    const svgomgPage = new SvgomgPage()

    test(`Navigate to ${svgomgPage.page.name}`, async () => {
        await svgomgPage.navigateTo()
    })
    test(`Load ${svgomgPage.page.name}`, async () => { // CHECK LAYOUT ?
        await svgomgPage.check()
        await svgomgPage.loadComponents(initialComponentsStatusData)
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
        await svgomgPage.loadComponents(initialComponentsStatusData)
    })
    test(`Upload SVG - ${svgomgPage.page.name}`, async () => { // Wait for request ?
        await svgomgPage.openSvg(docsPath, svgImageName)
    })
    test(`Check correctly uploaded SVG - ${svgomgPage.page.name}`, async () => {
        // ContentFrame NULL in firefox ?
        await svgomgPage.loadSvg(svgLoadedComponentsStatusData) // XMLNS Selector ?
    })

    test(`Open Menu - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents(svgLoadedAndMenuOpenComponentsStatusData)
    })
    test(`Paste Markup - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.fillMarkup(svgImageMarkup)
    })
    test(`Check correctly pasted Markup SVG - ${svgomgPage.page.name}`, async () => {
        // ContentFrame NULL in firefox ?
        await svgomgPage.loadSvg(svgLoadedComponentsStatusData) // XMLNS Selector ?
    })

    test(`Reset Settings - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.resetSettings()
    })
    test(`Check Decrease File Diff Percentage - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.checkDiffPercentage('decrease')
    })
    test(`Download SVG - ${svgomgPage.page.name}`, async () => { // How to check
        await svgomgPage.downloadSvg()
        // Verify downloaded SVG file contents eg. by checking SVG markup or specific attributes. // DOUBT
        // How to get the text from the file
    })

    test(`Get & Check SVG markup - ${svgomgPage.page.name}`, async () => { // How to check
        const url = await svgomgPage.getHrefSvg()
        const svgInnerHtml = await svgomgPage.getSvgInnerHtml(url) // DOUBT best way ? best written ?
        console.log(svgInnerHtml)
        // Verify downloaded SVG file contents eg. by checking SVG markup or specific attributes. // DOUBT
        // What to check fromt the HTML
    })


    test(`Open Menu - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickMenuButton()
        await svgomgPage.loadComponents(svgLoadedAndMenuOpenComponentsStatusData)
    })
    test(`Click Demo - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.clickDemo()
    })
    test(`Switch to Markup Output - ${svgomgPage.page.name}`, async () => {
        await svgomgPage.switchOutput('code')
        await svgomgPage.loadComponents(codeLoadedComponentsStatusData)
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
