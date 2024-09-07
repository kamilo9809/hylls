import { useState } from "react";
import axios from "axios";
import {PropTypes} from 'prop-types'

const useTranslate = (text) => {
  const [translate, setTranslate] = useState([]);
  console.log(text);

  const config = {
    headers:{
        'content-type': 'application/json',
    }
};

  const data = {
    
      text, 
      "source_lang":'es',
      "target_lang":'en'
    
  };

  const traducirTexto = async () => {

    const traducir = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/language", data, config);
        setTranslate(response.data); 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error en la solicitud de traducción (Axios Error):", error);
        } else {
          console.error("Error en la solicitud de traducción:", error);
        }
      }
    };

    traducir();
    
  };

  console.log(translate);
  return {translate, traducirTexto}; 
};

useTranslate.propTypes={
  text:PropTypes.string
}

export default useTranslate;
