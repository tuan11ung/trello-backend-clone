import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
    try {
        console.log('req.body:', req.body)
        res.status(StatusCodes.CREATED).json({ message: 'API creates new board from controller'})
    } catch (error) {
        console.log(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: error.message
            })
        
    }
}

export const boardController = {
    createNew
}

