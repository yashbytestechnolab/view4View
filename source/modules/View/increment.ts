
export enum ENV {
    dev, production
}
class increment {
    retryCount: number = 0
    retryDocument: any = {}
    toggleNextPrees: boolean = false
    configvalue = ""
    devicesPermission = false
    routesName: "" | undefined | string
    home_ads: boolean = false
    getInc() {
        this.retryCount += 1
    }
    emptyCount() {
        this.retryCount = 0
    }
    retryDoc(params: any) {
        this.retryDocument = params
    }
    increment3() {
        this.retryCount = 3
    }
    nextPress(params: boolean) {
        this.toggleNextPrees = params
    }
    getConfigValueFnc(params: any) {
        this.configvalue = params
    }
    getPermissionOfDevices(params: boolean) {
        this.devicesPermission = params
    }
    getRouteName(params: string | any) {
        this.routesName = params
    }
    environment() {
        return ENV.dev
    }
    getHomeConfigData(params: boolean | any) {
        return this.home_ads = params
    }
}

export const person = new increment();
