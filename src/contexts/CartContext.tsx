import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData{
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
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
  const [total, setTotal] =useState('');

  function addItemCart(newItem: ProductProps){
    //Se já existe um item igual no cart.
    const indexItem = cart.findIndex(item => item.id === newItem.id); // Se não existe devolve -1

    if(indexItem !== -1){
      // Se entrou aqui apenas somamos +1 na quantidade e calculamos o total do cart.
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount +1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

      totalResultCart(cartList);
      return;
    }
    // Adicionar um item diferente no cart.
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data]);
    totalResultCart([...cart, data]);
  }

  function removeItemCart(product: CartProps){
    // Se o produto é igual o que está no cart
    const indexItem = cart.findIndex(item => item.id === product.id);

    if(cart[indexItem]?.amount > 1){
      // Diminuir apenas 1 amount do que vc tem
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount -1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    // Se tiver apenas 1 amount, fazer a remoção.
    const removeItem = cart.filter(item => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
  }

  function totalResultCart(items: CartProps[]){
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0);
    const resultFormated = result.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    setTotal(resultFormated);
  }

  return(
    <CartContext.Provider value={{
      cart,
      cartAmount: cart.length,  // Se refere a quantidade que aparece na bolinha do cart
      addItemCart,
      removeItemCart,
      total,
    }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider;