import { createContext, useReducer } from "react";

export const AppContext = createContext()

export default function ContextProvider({children}) {

    const reducer = (state, action) => {

        switch(action.type) {

            case 'login':

            return {
                ...state,
                user: {...action.payload}
            }

            case 'loadUsers':

            return {
                ...state,
                users: [...action.payload]
            }

            case 'removeUser':

                // filter state (user) to remove the deleted user
                const oldUsers = [...state.users.filter(item => item._id !== action.payload)]

                return {
                    ...state,
                    users: [...oldUsers]
                }

            case 'loadProducts':

            return {
                ...state,
                products: [...action.payload]
            }

            case ('addProduct'):

            return {
                ...state,
                products: [...state.products, action.payload]
            }

            case ('removeProduct'):

            const oldProducts = [ ...state.products.filter(item => item._id !== action.payload)]

            return {
                ...state,
                products: [...oldProducts]

            }

            case 'editProduct':

                const editProducts = [...state.products]

                const idx = editProducts.findIndex(item => item._id === action.payload._id)

                editProducts[idx] = {...action.payload}
                console.log("🚀 ~ reducer ~ editProducts", editProducts[idx])

            return {
                ...state,
                products: [...editProducts]
            }

            case 'logoutAdmin':

                return {
                    user: {},
                    users: [],
                    products: []
                }

            case 'logoutUser':

                return {
                    user: {},
                    users: [],
                    products: [...state.products]

                }

            case 'addToCart':

            return {
                ...state,
                user: {
                    ...state.user,
                    cart: [...action.payload]
                }
            }

            case 'deleteFromCart':

                return {
                    ...state,
                    user: {
                        ...state.user,
                        cart: [...action.payload]
                    }
                }
                
            case 'addProducts':

            return {
                ...state,
                products: [...state.products, ...action.payload]
            }

            case 'addToWishlist':

            return {
                ...state,
                user: {
                    ...state.user,
                    wishlist: [...state.user.wishlist, action.payload]
                }
            }

            case 'deleteFromWishlist':

                return {
                    ...state,
                    user: {
                        ...state.user,
                        wishlist: [...action.payload]
                    }
                }

            default:
                
            return state
        }
    }

    const [state, dispatchState] = useReducer(reducer, {
        user: {},
        users: [],
        products: []
    })

    return <AppContext.Provider value={{state, dispatchState}}>
     {children}
    </AppContext.Provider>
}