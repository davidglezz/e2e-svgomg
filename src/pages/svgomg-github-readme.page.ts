import { BasePage } from 'pages/base.page'
import { svgomgGithubReadmeUrl } from 'data/routing.data'


export class SvgomgGithubReadmePage extends BasePage {

    constructor() {
        super()
        this.page = {
            name: 'Svgomg Github Readme Page',
            url: svgomgGithubReadmeUrl,
            title: 'svgomg/README.md at master · jakearchibald/svgomg'
        }
    }

}
