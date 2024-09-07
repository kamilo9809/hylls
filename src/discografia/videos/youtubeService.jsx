import axios from "axios";

/**
 * Función asincrónica para obtener información de un video de YouTube.
 *
 * @param {string} videoUrl - URL del video de YouTube.
 * @returns {Promise<Object>} - Promesa que se resuelve con la información del video.
 * @throws {Error} - Error en caso de que la solicitud falle.
 */
const obtenerInformacionVideo = async (videoUrl) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/videos/video-info?url=${videoUrl}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  obtenerInformacionVideo,
};
