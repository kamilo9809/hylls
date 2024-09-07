// ...

const Paginador = ({ paginasTotales, paginaActual, irAPagina, irAtras, irAdelante, irAtrasTres, irAdelanteTres }) => (
  <div className='w-full flex justify-center my-12 text-white'>
    <div className="relative z-50 flex">
      <button onClick={irAtrasTres} className="px-4 py-2">
        <img className='rotate-180' 
        loading="lazy"
          src="/src/assets/polygonos/next (1).svg" alt="" />
      </button>
      <button onClick={irAtras} className="px-4 py-2">
        <img loading="lazy" src="/src/assets/polygonos/Group 41.svg" alt="" />
      </button>
      {Array.from({ length: paginasTotales }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => irAPagina(index + 1)}
          className={`mx-2 px-2 py-2 ${paginaActual === index + 1 ? '' : 'opacity-30'}`}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={irAdelante} className="px-4 py-2">
        <img loading="lazy" src="/src/assets/polygonos/next.svg" alt="" />
      </button>
      <button onClick={irAdelanteTres} className="px-4 py-2">
        <img loading="lazy" src="/src/assets/polygonos/next (1).svg" alt="" />
      </button>
    </div>
  </div>
);

export default Paginador;

