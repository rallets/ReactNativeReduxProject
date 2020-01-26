import { IFoodState, FoodActionTypes } from './food-types';
import { Action } from 'redux';

const initialState: IFoodState = {
    foods: [
        {
            id: '',
            name: ''
        }
    ],
    food:
    {
        id: '',
        name: ''
    }
    ,
    isLoading: false,
    error: ''
};

interface IAction extends Action {
    readonly payload?: any;
}

export const foodReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FoodActionTypes.FETCH_FOODS_REQUEST:
            return { ...state, isLoading: true };

        case FoodActionTypes.FETCH_FOODS_SUCCESS:
            return { ...state, isLoading: false, foods: action.payload };

        case FoodActionTypes.FETCH_FOODS_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        /* remove */
        case FoodActionTypes.REMOVE_FOOD_REQUEST:
            return { ...state, isLoading: true };

        case FoodActionTypes.REMOVE_FOOD_SUCCESS:
            return { ...state, isLoading: false, foods: state.foods.filter(f => f.id !== action.payload) };

        case FoodActionTypes.REMOVE_FOOD_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        /* add */
        case FoodActionTypes.ADD_FOOD_REQUEST:
            return { ...state, isLoading: true };
        case FoodActionTypes.ADD_FOOD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                foods: [...state.foods, action.payload],
            };
        case FoodActionTypes.ADD_FOOD_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        /* edit */
        case FoodActionTypes.EDIT_FOOD_REQUEST:
            return { ...state, isLoading: true };
        case FoodActionTypes.EDIT_FOOD_SUCCESS:
            const foods = [...state.foods];
            const idx = foods.findIndex(x => x.id === action.payload.id);
            foods[idx] = action.payload;
            return {
                ...state,
                isLoading: false,
                foods: foods,
            };
        case FoodActionTypes.ADD_FOOD_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
}
