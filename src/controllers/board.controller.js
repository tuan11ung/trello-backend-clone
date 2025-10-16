import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/board.service"
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
    try {
        //Dieu huong du lieu sang tang Service
        const createdBoard = await boardService.creatNew(req.body)

        // throw new ApiError(StatusCodes.BAD_GATEWAY, 'co loi nha')

        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) {
        next(error)
    }
}

export const boardController = {
    createNew
}

