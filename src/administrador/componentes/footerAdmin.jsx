
export default function FooterAdmin() {


  const fecha = new Date();
  const year = fecha.getFullYear();

  return (
    <> 
    <div className='bg-[#0a0a0a] text-orange-200 absolute bottom-0 flex w-full justify-between items-center drop-shadow h-24 px-6 z-30'>
        <footer className='w-full flex justify-between pb-5'>
            <h2 className="uppercase text-[#AEA9A9]">{`© ${year} HYLLS.`}</h2>
            <h2 className="text-[#AEA9A9]">Todos los derechos reservados</h2>
        </footer>
    </div>
    </>
  )
}
