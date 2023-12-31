import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre), setPropietario(paciente.propietario), setEmail(paciente.email), setFecha(paciente.fecha), setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)

    return fecha + random;
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del Formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay min 1 campo vacio");

      setError(true);
      return;
    }

    setError(false);

    // Objeto de Paciente
    // const objetoPaciente = {
    //   nombre,
    //   propietario,
    //   email,
    //   fecha,
    //   sintomas,
    //   id: generarId()
    // }
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      // Editanto el Registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      setPaciente({});

    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId();
      // console.log(objetoPaciente);
      setPacientes([...pacientes, objetoPaciente]);
      console.log("strict");
    }

    // Reiniciar el form
    setNombre(''), setPropietario(''), setEmail(''), setFecha(''), setSintomas('')
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="textl-lg mt-5 text-center mb-10">Añade Pacientes y <span className="text-rose-600 font-bold">Administralos</span></p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {/* {error && <Error mensaje='Todos los campos son obligatorios' />} */}
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input id="mascota" type="text" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input id="propietario" type="text" placeholder="Nombre del Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input id="email" type="email" placeholder="Email Contacto Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input id="alta" type="date" className="border-2 w-full p-2 mt-2 rounded-md" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea id="sintomas" placeholder="Describe los Síntomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={sintomas} onChange={(e) => setSintomas(e.target.value)} />
        </div>

        <button type="sumbit" className="bg-rose-600 w-full p-3 text-white text-center uppercase font-bold cursor-pointer hover:bg-rose-700 transition-colors">
          {paciente.id ? 'Editar paciente' : 'Agregar paciente'}
        </button>
      </form>
    </div>
  )
}

export default Formulario