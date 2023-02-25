import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import "./Bag.css";

const  Bag= () => {
  const { cart, setCart, handleChange }=useContext(AuthContext)
  const [price, setPrice] = useState(0);
   
  

  const handleQty=(val,id)=>{
   const updatedata= cart.map((item)=>item.id==id?{...item,quantity:item.quantity+val}:item)

   setCart(updatedata)
  }
  function total(){ 
    let sum=0;
    console.log(cart.price)
    for(let x=0;x<cart.length;x++){
     
     sum+= (cart[x].price*cart[x].quantity); 
    
    }
      return sum;
    
    
  
  }


  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };
 console.log("cart",cart)
  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item?.images?.image1} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() =>handleQty(1,item.id)}>+</button>
            <button>{item.quantity}</button>
            <button onClick={() => handleQty(-1,item.id)}disabled={item.quantity==0}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button onClick={() => handleRemove(item.id)}  >Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>₹{total()}</span>
      </div>
      <button style={{border:"1px solid blue"}}>Proceed</button>
  
    </article>
  );
};

export default Bag;