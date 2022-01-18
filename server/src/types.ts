export interface Config {
    port: number,
    buildPath: string,
    publicPath: string,
    databasePath: string,
    blobStorageDir: string
}

export interface ResponseMessage {
    errors?: { name: string, message?: string, code?: string }[],
    authorized?: boolean
}
