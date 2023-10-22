import { SET_CURRENT_USER} from "../actions/AuthActions";
import { SET_LOADING } from "../actions/AuthActions";
import isEmpty from "../../assets/common/isEmpty";

export default function (state, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                userProfile: action.userProfile
            }
        case SET_LOADING:
            return {
                ...state,
                isAuthenticated: null,
                user: {},
                loading: action.payload
            }
        default:
            return state
    }
}