export interface Config {
    port: number,
    buildPath: string,
    publicPath: string,
    databasePath: string
}

export interface ResponseMessage {
    error?: string,
    authorized?: boolean
}