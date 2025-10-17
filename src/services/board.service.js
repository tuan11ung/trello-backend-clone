import { slugify } from "~/utils/formatters"

/**
 * luon phai tra ve return trong service neu khong req se die
 */

const creatNew = async (reqBody) => {
    try {
        //xu ly logic du lieu tuy dac thu du an
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }

        return newBoard
    } catch (error) {
        throw error
    }
}

export const boardService = {
    creatNew
}