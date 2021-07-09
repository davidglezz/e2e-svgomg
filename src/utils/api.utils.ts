import { Response, Request } from 'playwright-core'


export type API = {
    readonly url: string
    readonly status: number
    readonly searchParams?: string[]
    readonly avoidParams?: string[]
}


export abstract class ApiInterception {

    private static readonly timeoutApi = 35000


    static async waitForResponse(api: API, timeout?: number): Promise<Response> {
        const allResponses = []
        try {
            return await page.waitForResponse(
                (response: Response) => {
                    if (ApiInterception.urlIncludes(response.url(), api.url, api.searchParams)
                        && ApiInterception.urlNotIncludes(response.url(), api.avoidParams)
                        && api.status === response.status() // || response.ok()
                    ) {
                        return true
                    }
                    if (ApiInterception.urlIncludes(response.url(), api.url)) {
                        allResponses.push(response.url() + ' Status:' + response.status())
                    }
                }, { timeout: timeout ? timeout : this.timeoutApi }
            )
        } catch (error) {
            throw new Error(
                `Failed RESPONSE> "${api.url}" & "${api.searchParams}", with Status> "${api.status}" & AvoidParams> "${api.avoidParams}""
                \nResponses list:\n${allResponses.join('\n')}`
            )
        }
    }


    static async waitForRequest(api: API, requestMethod?: string, timeout?: number): Promise<Request> {
        const allRequests = []
        try {
            return await page.waitForRequest(
                (request: Request) => {
                    if (ApiInterception.urlIncludes(request.url(), api.url, api.searchParams)
                        && ApiInterception.urlNotIncludes(request.url(), api.avoidParams)
                        && request.failure() === null
                    ) {
                        if (requestMethod) {
                            if (request.method() === requestMethod) return true
                        } else {
                            return true
                        }
                    }
                    if (ApiInterception.urlIncludes(request.url(), api.url)) {
                        allRequests.push(request.url() + ' Status:' + request.failure())
                    }
                }, { timeout: timeout ? timeout : this.timeoutApi }
            )
        } catch (error) {
            throw new Error(
                `Failed REQUEST> "${api.url}" & "${api.searchParams}", with Status> "${api.status}" & AvoidParams> "${api.avoidParams}"
                \nRequests list:\n${allRequests.join('\n')}`
            )
        }
    }


    private static urlIncludes(url: string, apiUrl: string, params?: string[]): boolean {
        url = url.toLowerCase()
        return (
            url.includes(apiUrl.toLowerCase())
            && (params ? params.every(param => url.includes(encodeURI(param).toLowerCase())) : true)
        )
    }

    private static urlNotIncludes(url: string, avoidParams?: string[]): boolean {
        url = url.toLowerCase()
        return (
            avoidParams ? avoidParams.every(avoidParam => !url.includes(encodeURI(avoidParam).toLowerCase())) : true
        )
    }

}
