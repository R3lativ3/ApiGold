export interface updateModel {
    query: string,
    obj: propertyModel 
}

export interface propertyModel {
    [key: string]: any
}

export interface generalResponse {
    success: boolean,
    message: string
}