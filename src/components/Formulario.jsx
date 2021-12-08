import React, {useState, useEffect}from 'react'
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect( () => {
        if(Object.keys(paciente).length > 0){
            const {nombre, propietario, email, fecha, sintomas,id} = paciente;
            setNombre(nombre);
            setPropietario(propietario);
            setEmail(email);
            setFecha(fecha);
            setSintomas(sintomas);
        }
    }, [paciente])
    
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const date = Date.now().toString(36);
        return random+date;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setError(true);
            return;
        }

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if(paciente.id){
            objetoPaciente.id = paciente.id;
            const pacienteActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
            setPacientes(pacienteActualizado);   
            setPaciente({});
        }else{
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        setError(false);

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 mb-10 text-center">Añade Pacientes y <span className="text-indigo-600 font-bold ">Administralos</span></p>

            <form 
                className="bg-white shadow-md rounded-xl py-10 px-5 mb-10 mx-5" 
                onSubmit={handleSubmit}
            >

                { error && <Error mensaje='Tolo los campos son requeridos'/> }

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
                    <input 
                        type="text"
                        id="mascota"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}
                     />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                    <input 
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e=>setPropietario(e.target.value)}
                     />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                     />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
                    <input 
                        type="date"
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e=>setFecha(e.target.value)}
                     />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        name="" 
                        id="sintomas" 
                        cols="30"
                        value={sintomas}
                        onChange={e=>setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
                    value={ paciente.id ? "guardar cambios" : "agregar paciente" } 
                />
            </form>
        </div>
    )
}

export default Formulario
