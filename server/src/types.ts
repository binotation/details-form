export interface Config {
    port: number,
    buildPath: string,
    publicPath: string,
    databasePath: string
}

export interface ResponseMessage {
    error?: { name: string, message?: string, code?: string },
    authorized?: boolean
}