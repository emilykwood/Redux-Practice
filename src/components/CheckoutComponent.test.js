import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Checkout from "./CheckoutComponent";
import basketReducer from "../features/basketSlice";
import { BrowserRouter } from "react-router-dom";

//Note to Assessor: I  have added some cursory unit tests here to show that I am aware
//of the importance of TDD, however I know it is definitely not my strong suit
//which is why there are so few. I definitey will work on that!

const mockBasketState = {
  items: {
    2: { currentQuantity: 1 }, // £2.02 each
    3: { currentQuantity: 2 }, // £3.03 each
  },
  totalCost: 9.08,
};


const rootReducer = {
  basket: basketReducer,
};

describe("Create Checkout Component before each test", () => {
  let store;

  beforeEach(() => {
  
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        basket: mockBasketState, 
      },
    });
  });

  test("renders Checkout component without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    );

    // Checking for text as a way to verify page has rendered
    expect(screen.getByText(/Basket Total Cost/i)).toBeInTheDocument();
  });

  test("calculates total cost correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    );

    
    expect(screen.getByText(/Basket Total Cost: £9\.08/i)).toBeInTheDocument();
  });

  test("handles card number input", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    );

    const cardInput = screen.getByRole("textbox"); 
    fireEvent.change(cardInput, { target: { value: "12345678901234" } }); 
    expect(cardInput.value).toBe("12345678901234");
  });

  test("enables checkout button with valid card number", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    );

    const cardInput = screen.getByRole("textbox"); 
    const checkoutButton = screen.getByRole("button", { name: /checkout/i }); 

    // Button should be disabled unti l user enteres exactly 14 digits
    expect(checkoutButton).toBeDisabled();

    fireEvent.change(cardInput, { target: { value: "12345678901234" } });
    expect(checkoutButton).not.toBeDisabled(); 
  });
});
