import React, {useReducer, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../reducers/AuthReducers';
import { setCurrentUser } from '../actions/AuthActions';
import AuthGlobal from './AuthGlobal';

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {},
    })

    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        if(AsyncStorage.jwt){
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : ''
            if(setShowChild){
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }

        return () => {
            setShowChild(false);
        }
    }, [])

    /*useEffect(() => {
        const fetchToken = async () => {
            setShowChild(true);
            try {
                const token = await AsyncStorage.getItem('jwt');
                if (token) {
                    const decoded = jwt_decode(token);
                    dispatch(setCurrentUser(decoded));
                }
            } catch (error) {
                console.error('Error fetching JWT token:', error);
            } finally {
                setShowChild(false);
            }
        };
    
        fetchToken();
    }, []);*/

    if(!showChild) {
        return null;
    }else {
        return (
            <AuthGlobal.Provider 
                value = {{stateUser, dispatch}}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
}

export default Auth;