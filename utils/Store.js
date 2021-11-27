import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    favorite: {
        favoriteItems: Cookies.get('favoriteItems')
        ? JSON.parse(Cookies.get('favoriteItems')) 
        : [],
    },
    userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
 };

function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return {...state, darkMode: true};
        case 'DARK_MODE_OFF':
            return {...state, darkMode: false};
        case 'FAVORITE_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.favorite.favoriteItems.find(
                (item) => item._id === newItem._id
            );
            const favoriteItems = existItem 
            ? state.favorite.favoriteItems.map((item) => 
               item.name === existItem.name ? newItem : item
               )
            : [...state.favorite.favoriteItems, newItem];
            Cookies.set('favoriteItems', JSON.stringify(favoriteItems));
            return { ...state, favorite: { ...state.favorite, favoriteItems } };
        }
        case 'FAVORITE_REMOVE_ITEM': {
            const favoriteItems = state.favorite.favoriteItems.filter(
                (item) => item._id !== action.payload._id
            );
            Cookies.set('favoriteItems', JSON.stringify(favoriteItems));
            return { ...state, favorite: { ...state.favorite, favoriteItems } };
        }

        case 'USER_LOGIN':
            return {...state, userInfo: action.payload };
        case 'USER_LOGOUT':
            return {...state, userInfo: null, favorite: { favoriteItems: [] } };

        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}