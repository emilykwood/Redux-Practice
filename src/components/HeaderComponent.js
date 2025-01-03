import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ isProductPage }) { 
  const theme = useTheme();
  const navigation = useNavigate();
  const totalItems = useSelector((state) => state.basket.totalItems);
  const totalCost = useSelector((state) => state.basket.totalCost);

  const handleProceedToCheckout = () => {
    navigation("/checkout"); 
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <Button
        color="primary"
        style={{
          marginBottom: theme.spacing(1),
          marginRight: theme.spacing(3),
        }}
        onClick={handleProceedToCheckout}
      >
        Total items: {totalItems}
      </Button>
      {isProductPage && ( // Couldnt quite get this conditional logic working. Intention was to only display totalCost on product page
        <Button
          color="primary"
          style={{
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(3),
          }}
          onClick={handleProceedToCheckout}
        >
          Total cost: £{totalCost.toFixed(2)}
        </Button>
      )}
    </div>
  );
}

export default Header;
