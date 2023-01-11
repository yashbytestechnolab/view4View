
class increment {
    retryCount: number = 0
    retryDocument: any = {}
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
}

export const person = new increment();
