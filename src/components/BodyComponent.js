import React from "react";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Button } from "@mui/material";
import data from "../data/products_sample.json";
import { useDispatch} from "react-redux";
import { addToBasket, removeFromBasket } from "../features/basketSlice";
import { useNavigate } from "react-router-dom";

function Body() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleAddClick = (sku, name,price, basketLimit) => {
    dispatch(addToBasket({ sku, name, price, basketLimit }));
  };

  const handleRemoveClick = (sku, name, price) => {
    dispatch(removeFromBasket({ sku, name, price }));
  };

  const handleProceedToCheckout = () => {
    navigation("/checkout"); 
  };

  return (
    <div>
      <TableContainer style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>
                  <strong>Name</strong>
                </Typography>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>
                  <Typography
                    variant="h6"
                    component="span"
                    style={{ fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>£{product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddClick(product.sku, product.name, product.price, product.basketLimit)}
                  >
                    Add to Basket
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      handleRemoveClick(product.sku, product.name, product.price)
                    }
                    style={{ marginLeft: theme.spacing(1) }}
                  >
                    Remove from Basket
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: theme.spacing(2),
          right: 0,
        }}
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default Body;
