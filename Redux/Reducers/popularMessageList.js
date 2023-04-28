import { ADD_AS_POPULAR_MESSAGES } from "../constants";

const popularMessagesList = (state=[], action) => {
    switch (action.type){
        case ADD_AS_POPULAR_MESSAGES:
             return [...state, action.payload]      
    }

    return state;
}

export default popularMessagesList;