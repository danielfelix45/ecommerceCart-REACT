import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData{
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
}

interface CartProps{
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps{
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

// Aqui o provider
function CartProvider({children}: CartProviderProps){
  const [cart, setCart] = useState<CartProps[]>([]);

  // Função de adicionar item no cart.
  function addItemCart(newItem: ProductProps){
    //Se já existe um item igual no cart.
    const indexItem = cart.findIndex(item => item.id === newItem.id); // Se não existe devolve -1

    if(indexItem !== -1){
      // Se entrou aqui apenas somamos +1 na quantidade e calculamos o total do cart.
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount +1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

      return;
    }
    // Adicionar um item diferente no cart.
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data]);
  }

  return(
    <CartContext.Provider value={{
      cart,
      cartAmount: cart.length,  // Se refere a quantidade que aparece na bolinha do cart
      addItemCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider;