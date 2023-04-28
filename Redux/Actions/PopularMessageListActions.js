import { ADD_AS_POPULAR_MESSAGES } from "../constants";

export const addToPopularMessagesList = (payload) => {
    return {
        type: ADD_AS_POPULAR_MESSAGES,
        payload
    }
}