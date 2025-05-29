const defaultHost: string = "digirepair.bouzouf.com"

export const environment = {
    production: false,
    hostName: 'localhost',
    serverUrl: `http://${defaultHost}`,
    publicHost: `http://${defaultHost}/api/storage/public`,
    uploadImageHost: `http://${defaultHost}/api/storage/public`,
    hostUrl: `http://${defaultHost}/api/`,
    authUrl: `http://${defaultHost}/api/auth/`,
    uploadPublicFiles: `http://${defaultHost}/api/storage/public`,
    uploadPrivateFiles: `http://${defaultHost}/api/files`,
};
