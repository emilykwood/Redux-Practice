import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import data from "../data/products_sample.json";
import {
  removeAllFromBasket,
  updateItemQuantity,
} from "../features/basketSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const basketItems = useSelector((state) => state.basket.items);
  const totalCost = useSelector((state) => state.basket.totalCost);

  const products = {};
  data.forEach((product) => {
    products[product.sku] = {
      name: product.name,
      price: product.price,
      basketLimit: product.basketLimit,
    };
  });

  const handleRemoveAllClick = (sku) => {
    dispatch(removeAllFromBasket({ sku }));
  };

  const [cardNumber, setCardNumber] = useState("");

  const handleTyping = (e) => {
    const value = e.target.value;
    setCardNumber(value);
  };

  const handleContinueShopping = () => {
    navigation("/");
  };

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    setOrderConfirmed(true);
  };

  return (
    <div>
      <TableContainer style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>
                  <strong>Product name</strong>
                </Typography>
              </TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Total price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(basketItems).map(([sku, { currentQuantity }]) => {
              const product = products[sku];
              if (product) {
                return (
                  <TableRow key={sku}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Select
                        value={currentQuantity}
                        onChange={(e) =>
                          dispatch(
                            updateItemQuantity({
                              sku,
                              quantity: e.target.value,
                            })
                          )
                        }
                      >
                        {(() => {
                          const items = [];
                          for (let i = 1; i <= product.basketLimit; i++) {
                            items.push(
                              <MenuItem key={i} value={i}>
                                {i}
                              </MenuItem>
                            );
                          }
                          return items;
                        })()}
                      </Select>
                    </TableCell>
                    <TableCell>£{product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      £{(product.price * currentQuantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleRemoveAllClick(sku)}>
                        Remove All
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        color="primary"
        style={{
          marginTop: theme.spacing(4),
          display: "flex",
          justifyContent: "right",
          marginRight: "30px",
        }}
      >
        Basket Total Cost: £{totalCost.toFixed(2)}
      </Typography>
      <div
        id="cardDetailsDiv"
        style={{
          marginTop: theme.spacing(4),
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <Typography style={{ marginRight: "10px" }} color="primary">
          Please enter your 16 digit credit/debit card number:
        </Typography>
        <input
          type="text"
          style={{ marginRight: "30px", width: "300px", height: "30px" }}
          value={cardNumber}
          onChange={handleTyping}
        />
      </div>
      <div
        id="pageActionButtons"
        style={{
          marginTop: theme.spacing(4),
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Button variant="contained" onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={cardNumber.length !== 14}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
      {orderConfirmed && (
        <Typography
          variant="h6"
          color="success.main"
          style={{ textAlign: "center" }}
        >
          Thanks for your order!
        </Typography>
      )}
    </div>
  );
};

export default Checkout;
