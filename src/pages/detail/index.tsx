import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ProductProps } from "../home";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export function ProductDetail(){
  const {id} = useParams();
  const {addItemCart} = useContext(CartContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProps>();

  useEffect(() => {
    async function getProduct(){
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    }

    getProduct();
  }, [id]);

  function handleAddItem(product: ProductProps){
    toast.success('Produto adicionado no carrinho!', {
      style: {
        borderRadius: 10,
        backgroundColor: 'green',
        color: '#fff'
      }
    })
    addItemCart(product);
    navigate('/cart');
  }

  return(
    <>
      <main className="w-full flex max-w-7xl p-4 mx-auto my-6">
        {product && (
          <section className="w-full">
            <div className="flex flex-col lg:flex-row">
              <img
                className="flex-1 w-full max-h-72 object-contain"
                src={product?.cover}
                alt={product?.title} 
              />

              <div className="flex-1">
                <p className='font-bold text-2xl mb-2'>{product?.title}</p>
                <p className='my-4'>{product?.description}</p>

                <strong className='text-zinc-700/90 text-xl'>{product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</strong>
                <button onClick={() => handleAddItem(product)} className='bg-zinc-900 p-1 rounded ml-3'>
                <BsCartPlus size={20} color='#fff' />
                </button>
              </div>
            </div>
        </section>
        )}
      </main>
    </>
  )
}