export interface updateModel {
    query: string,
    obj: propertyModel 
}

export interface propertyModel {
    [key: string]: any
}

// For updates and create operations
export interface generalResponse {
    success: boolean,
    message: string
}

export interface QueryResponse {
    success: boolean,
    response: any
}