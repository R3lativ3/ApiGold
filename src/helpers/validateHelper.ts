const { validationResult } = require('express-validator')

const validateResult = (req: any, res: any, next: any) => {
    try{
        validationResult(req).throw()
        return next()
    }
    catch(err: any){
        res.status(403)
        res.send({ errors: err.array() })
    }
}

export default validateResult