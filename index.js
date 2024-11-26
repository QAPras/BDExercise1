const express = require('express');
const cors = require("cors")
const { resolve } = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.use(express.static('static'));

// Endpoint 1 : Calculate total price of items in cart
function calculateTotalPrice(newItemPrice, cartTotal) {
  let cartTotalPrice = newItemPrice + cartTotal;
  return cartTotalPrice.toString();
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalPrice(newItemPrice, cartTotal));
});

// Endpoint 2 : Apply a discount based on membership status
function membershipDiscount(cartTotal, isMember) {
  let discount = 10;
  if (isMember === 'false') {
    return cartTotal.toString();
  } else {
    let finalPrice = cartTotal - (cartTotal * discount) / 100;
    return finalPrice.toString();
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(membershipDiscount(cartTotal, isMember));
});

// Endpoint 3 : Calculate tax on the cart total
function calculateTaxAmount(cartTotal) {
  let taxPercent = 5;
  let taxAmount = cartTotal * (taxPercent / 100);
  return taxAmount.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTaxAmount(cartTotal));
});

// Endpoint 4 : Estimate delivery time based on shipping method
function calculateETA(shippingMethod, distance) {
  let perDayKmforExp = 100;
  let perDayKmforStd = 50;
  let EtanumOfDays = 0;
  if (shippingMethod === 'express') {
    EtanumOfDays = distance / perDayKmforExp;
  } else {
    EtanumOfDays = distance / perDayKmforStd;
  }
  return EtanumOfDays.toString();
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateETA(shippingMethod, distance));
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
function totalShippingCost(weight, distance){
  return (weight * distance * 0.1).toString();
}

app.get('/shipping-cost', (req, res) =>{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(totalShippingCost(weight, distance));
})

// Endpoint 6 : Calculate loyalty points earned from a purchase


app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * 2).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
