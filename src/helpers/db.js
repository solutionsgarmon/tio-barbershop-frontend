import { updateUser } from "../api/updates";

export function addToCart(user,product) { 
    let resp
    let newShoppingCart= [...user.shopping_cart]
    newShoppingCart.push(product)
   const  values={shopping_cart:newShoppingCart}
    try{
       resp =  updateUser(values,user._id) 
     
      
    }catch(e){
        console.log("Error en addToCart:",e)
        resp.data.sucess = false
        resp.data.error=e
    }
   return resp
}

export function removeFromCart(user, product) {
    let resp;
    let newShoppingCart = user.shopping_cart.filter(productCart => productCart._id != product._id);
    const values = { shopping_cart: newShoppingCart };
    try {
        resp = updateUser(values, user._id);
    } catch (e) {
        console.log("Error en removeFromCart:", e);
        resp = { data: { success: false, error: e } };
    }
    return resp;
}
