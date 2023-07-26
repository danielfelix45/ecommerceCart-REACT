
export function Cart(){
  return(
    <div className="w-full max-w-7xl px-4 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Meu Carrinho</h1>

      <section className="flex items-center justify-between border-b-2 border-gray-300">
        <img 
          className="w-28"
          src="https://http2.mlstatic.com/D_NQ_NP_899099-MLB70580985750_072023-O.webp" 
          alt="Logo produto" 
        />
        <strong>Preço: R$ 1.000</strong>

        <div className="flex items-center justify-center gap-3">
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            -
          </button>
          1
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            +
          </button>
        </div>
        <strong className="float-right">SubTotal: R$ 1.000</strong>
      </section>
      <p className="font-bold mt-4">Total: R$ 1.000</p>
    </div>
  )
}