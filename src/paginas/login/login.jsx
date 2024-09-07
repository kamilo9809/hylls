import { useState } from "react";
import "./../../index.css";

function Login() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validarDatos = async () => {
    if (text === "" || password === "") {
      alert("Por favor, rellene ambos campos.");
    } else {
      try {
        const response = await fetch(
          "http://localhost:3001/usuarios/validation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usuario: text,
              clave: password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        //ayudate con esta linea de codigo te va a servir
        const data = await response.json();
        const expirationTime = Date.now() + 30000;

        localStorage.setItem(
          "nombreDeClave",
          JSON.stringify({
            datos: data.usuario["Usuario"],
            rol: data.usuario["Rol"],
            expiracion: expirationTime,
            token: data.token,
          })
        );

        const info = localStorage.getItem("nombreDeClave");

        if (data.mensaje) {
          console.error(data.mensaje);
        } else {
          console.log("usuario valido", data);
          window.location.href = "../administrador/admin";
        }
      } catch (error) {
        console.error("Error en la solicitud", error.mensaje);
      }

      setPassword("");
      setText("");
    }
  };

  return (
    <>
      <div className="bg-neutral-950 min-h-screen flex justify-center items-center imagen bg-cover">
        <div className="bg-neutral-500 border border-neutral-300/[0.3] rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative max-w-[90%] md:max-w-[40rem] p-12">
          <div className="text-orange-200 font-akshar">
            <h1 className="text-4xl text-center mb-6">Iniciar sesión</h1>
            <form action="">
              <div className="relative my-4 ">
                <label className="block font-semibold mb-2" placeholder=" ">
                  Correo{" "}
                </label>
                {/* <input type="email" className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-orange-200" /> */}
                <input
                  type="text"
                  value={text}
                  onChange={handleTextChange}
                  className="block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-orange-200 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-200 "
                />
              </div>
              <div className="relative my-4 ">
                <label className="block font-semibold mb-2" placeholder=" ">
                  Contraseña
                </label>
                {/* <input className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-orange-200" type="password" /> */}
                <input
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                  className="block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-orange-200 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-200 "
                />
              </div>
              <button
                onClick={validarDatos}
                className="accion w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-300 hover:bg-orange-300 hover:text-white py-2 transition-colors duration-300"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
