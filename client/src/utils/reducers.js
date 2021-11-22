import { 
  UPDATE_PRODUCTS, 
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from './actions';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: ''
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products]
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products]
      };
    case REMOVE_FROM_CART:
      let newCart = state.cart.filter(product =>  product._id !== action._id);
    
      return {
        ...state,
        cartOpen: newCart.length > 0,
        cart: newCart
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product =>{
          if (product._id === action._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
    default:
      return state;
  }
};

export default shopReducer;