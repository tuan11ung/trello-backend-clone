import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
    try {
        // console.log('req.body:', req.body)
        // console.log('req.query:', req.query)
        // console.log('req.params:', req.params)
        // console.log('req.files:', req.filesy)
        // console.log('req.cookies:', req.cookies)
        // console.log('req.jwtDecoded:', req.jwtDecoded)
 
        //Dieu huong du lieu sang tang Service

        // throw new ApiError(StatusCodes.BAD_GATEWAY, 'co loi nha')

        res.status(StatusCodes.CREATED).json({ message: 'API creates new board from controller'})
    } catch (error) {
        next(error)
    }
}

export const boardController = {
    createNew
}

