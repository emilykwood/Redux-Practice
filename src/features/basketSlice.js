import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: {},
    totalItems: 0,
    totalCost: 0,
  },
  reducers: {
    addToBasket: (state, action) => {
      const { sku, name, price, basketLimit } = action.payload;
      if (state.items[sku]) {
        if (state.items[sku].currentQuantity < basketLimit) {
          state.items[sku].currentQuantity += 1;
          state.totalItems += 1;
          state.totalCost += price;
        }
      } else {
        state.items[sku] = { currentQuantity: 1, price, name, basketLimit };
        state.totalItems += 1;
        state.totalCost += price;
      }
    },
    removeFromBasket: (state, action) => {
      const { sku, price } = action.payload;
      if (state.items[sku] && state.items[sku].currentQuantity > 0) {
        state.items[sku].currentQuantity -= 1;
        state.totalItems -= 1;
        state.totalCost -= price;

        // get rid of the item once it's currentQuantity is 0.
        if (state.items[sku].currentQuantity === 0) {
          delete state.items[sku];
        }
      }
    },
    // For when we want to remove all items with specific SKU from the basket
    removeAllFromBasket: (state, action) => {
      const { sku } = action.payload;
      const item = state.items[sku];
      if (item) {
        state.totalItems -= item.currentQuantity;
        state.totalCost -= item.currentQuantity * item.price;
        delete state.items[sku];
      }
    },
    // For when the user changes the amount in the basket on the checkout page
    updateItemQuantity: (state, action) => {
      const { sku, quantity } = action.payload; 
      if (state.items[sku]) {
        const itemPrice = state.items[sku].price; 
        const oldQuantity = state.items[sku].currentQuantity; 

        state.totalItems += quantity - oldQuantity;
        state.totalCost += (quantity - oldQuantity) * itemPrice;
        state.items[sku].currentQuantity = quantity; 
      }
    }
  },
});

export const {
  addToBasket,
  removeFromBasket,
  removeAllFromBasket,
  updateItemQuantity,
} = basketSlice.actions;
export default basketSlice.reducer;
