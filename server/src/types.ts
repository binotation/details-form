export interface Config {
    port: number,
    buildPath: string,
    publicPath: string,
    registeredClients: { id: string, token: string }[]
}

export interface ResponseMessage {
    error?: string,
    authorized?: boolean
}