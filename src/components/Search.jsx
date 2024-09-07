import Search from "./../assets/icons/search.png";
import Filter from "./../assets/icons/Filter.svg";
import Line from "./../assets/icons/line.svg";
import VerticalLine from "./../assets/icons/vertical-line.svg";
import { useLanguage } from "./../context/LanguageContext";



const Searchpage = () => {
  const { isEnglish } = useLanguage();

  return (
    <div className="w-full " id="global">
        <div className="w-full items-center justify-center h-fit bg-[#0A0A0A] ">
          <div className="items-center justify-center flex gap-4 pt-6">
            <button>
              <img loading="lazy" src={Search} alt="Search" />
            </button>
            <img loading="lazy" src={VerticalLine} alt="" />
            <input
              type="text"
              className="border-none bg-[#0A0A0A] text-white w-1/4"
              placeholder={isEnglish ? "Search for your album..." : "Busca tu álbum..."}
            />
            <button>
              <img loading="lazy" src={Filter} alt="Filter" />
            </button>
          </div>
          <div className="items-center justify-center bg-[#0A0A0A] pt-0 flex">
            <img loading="lazy" src={Line} alt="Filter" className="w-4/12 pr-14 pl-8" />
          </div>
        </div>
        <div
          className="w-full bg-[#0A0A0A] flex"
          id="Artistas"
        ></div>
      </div>
  )
}

export default Searchpage
