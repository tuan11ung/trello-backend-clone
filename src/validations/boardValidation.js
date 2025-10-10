import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = 
    async (req, res, next) => {
        const correctCondition = Joi.object({
            title: Joi.string().required().min(3).max(50).trim().strict(),
            description: Joi.string().required().min(3).max(256).trim().strict(),
        })
        try {
            console.log('req.body:', req.body)

            await correctCondition.validateAsync(req.body, {abortEarly: false })

            // next()
            res.status(StatusCodes.CREATED).json({ message: 'API creates new board'})
        } catch (error) {
            console.log(error)
            // console.log(new Error(error))
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                errors: new Error(error).message
            })
        }
    }

export const boardValidation = {
    createNew
}