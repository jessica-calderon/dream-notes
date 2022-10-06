import React, { useEffect } from 'react';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
//import { STATES } from 'mongoose';
import { useLazyQuery } from '@apollo/client';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, ([data]));


function submitCheckout() {
 const productIds = 'prod_MYl1b4gPre11OV';
 
 getCheckout({
    variables: { products: productIds }
  }, []); 
} 

return (

<div>
    <form action="/create-checkout-session" method="submitCheckout">
    <button type="submit" className="btn">Donate   ...</button>
  </form>

</div>

)
};

export default Cart;