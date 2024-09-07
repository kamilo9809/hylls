
const cards_disc = ({ foto, nombre, linktree }) => {
  return (
    <div className="w-screen h-screen bg-[#0A0A0A] pt-10 pl-10  gap-10">
      <div className="w-screen h-1/4 flex gap-10" id="fila 1">
        <div className="w-1/6 h-full bg-white">
          <img loading="lazy" src={`../public/${foto}`} alt="" />
        </div>
        <div className="w-1/6 h-full bg-white"></div>
        <div className="w-1/6 h-full bg-white"></div>
      </div>
      <div className="w-screen h-1/12 text-white">HOLA</div>
    </div>
  );
};

export default cards_disc;
