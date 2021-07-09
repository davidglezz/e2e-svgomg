import { BasePage } from 'pages/base.page'
import { svgomgGithubUrl } from 'data/routing.data'


export class SvgomgGithubPage extends BasePage {

    constructor() {
        super()
        this.page = {
            name: 'Svgomg Github Page',
            url: svgomgGithubUrl,
            title: 'jakearchibald/svgomg: Web GUI for SVGO'
        }
    }

}
