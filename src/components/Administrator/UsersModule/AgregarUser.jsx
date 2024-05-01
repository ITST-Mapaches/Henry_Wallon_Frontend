import { Button, Label, Modal, TextInput, Datepicker, Select, ToggleSwitch, Tooltip} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UsersContext } from "../../../context/UsersContext";
import axios from "axios";
import { useForm, useFetch } from "../../../hooks";

const AgregarUser = () => {
  // obtencion de metodo cargar usuarios
  const { loadUsers } = useContext(UsersContext);

  // manejo de estado de formulario con custom hook
  const {  form,  nombre,  ap_paterno,  ap_materno,  nacimiento,  telefono,  nombre_usuario,  contrasena,  activo,  id_sexo,  id_rol,  num_control, id_usuario_tutor, id_periodo, id_grupo,  cedula_prof,  onInputChange,  onResetForm,
  } = useForm({ nombre: "", ap_paterno: "", ap_materno: "", nacimiento: "", telefono: "", nombre_usuario: "", contrasena: "", activo: true, id_sexo: null, id_rol: null, num_control: "", id_usuario_tutor: "", id_periodo:"", id_grupo:"" , cedula_prof: ""});

  // estado de modal
  const [openModal, setOpenModal] = useState(false);

  //estado para manejar nuevos inputs segun el rol de usuario a agregar
  const [inputRole, setInputRole] = useState({ Alumno: false, Docente: false });

  // estado para manejar estatus de usuario
  const [active, setActive] = useState(true);

  // fetching de data a endpoint roles
  const { data: roles, isLoading: isLoadingRoles } = useFetch("roles");

  //  fetching de data a endpoint sexos
  const { data: sexos, isLoading: isLoadingSexos } = useFetch("sexos");

  // fetching de data a endpoint periodos
  const { data: periodos, isLoading: isLoadingPeriodos } = useFetch("periodos");

  // fetching de data a endpoint grupos
  const { data: grupos, isLoading: isLoadingGrupos } = useFetch("grupos");

  const { data: tutores, isLoading: isLoadingTutores, reFetch: reFetchTutores } = useFetch("getUsuarios/tutores");

  //efecto secundario ante el cambio de estado de usuario
  useEffect(() => {
    onInputChange({ target: { name: "activo", value: active } });
  }, [active]);

  //funcion que encuentra el nombre de rol de acuerdo al id_rol
  const encontrarRol = () => {
    if(isLoadingRoles || !roles){
      return null;
    }
    const rolEncontrado = roles.find((rol) => rol.id == id_rol);
    return rolEncontrado ? rolEncontrado.rol : null;
  };

  // efecto secundario al cambiar el valor del rol
  useEffect(() => {
    if (!!roles) {
      const rol = encontrarRol();
      setInputRole((prevInputRole) => ({
        ...prevInputRole,
        Alumno: rol === "Alumno" ? !prevInputRole.Alumno : false,
        Docente: rol === "Docente" ? !prevInputRole.Docente : false,
      }));
    }
  }, [id_rol]);

  // manejo de formulario al enviar
  const onSubmit = async (event) => {
    // previene comportamiento por default de un form
    event.preventDefault();

    // cierra el modal
    setOpenModal(false);

    //busca el rol
    const roll = encontrarRol();
    
    // evalua el rol
    const rol = (roll === 'Docente' || roll === 'Alumno') ? roll : 'usuario';

    try {
      // define endpoint a usar
      const endpoint = import.meta.env.VITE_BASE_URL + rol.toLowerCase() + "s";

      // envia el formulario al endpoint
      await axios.post(endpoint, form);
      
      //mensaje
      toast.success("Usuario agregado con éxito!");
      
      // vuelve a cargar los usuarios
      loadUsers();
      
      //si el tipo de usuario a agregar es un usuario se recargan los tutores
      if (rol == 'usuario') {reFetchTutores()};

      // limpia el formulario
      onResetForm();
    } catch (error) {
      console.log(error)
      toast.error("Error al intentar agregar usuario!");
    }
  };

  // manejo de fecha
  const handleDateChange = (date) => {
    // console.log(date)
    const fecha = new Date(date);
    const año = fecha.getFullYear();
    // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const fechaFormateada = `${año}-${mes}-${dia}`;
    // console.log(fechaFormateada); // "2023-11-13"

    onInputChange({ target: { name: "nacimiento", value: fechaFormateada } });
  };

  return (
      <>
        {/* button add  */}
        <button className='flex items-center w-fit m-auto p-2 bg-primary text-white rounded-lg group active:scale-95 hover:scale-105 active:rounded-r-lg mb-12'
            onClick={() => { setOpenModal(true) }}>
            <svg className="w-6 h-6  transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
            <span className="ms-3 font-bold">Agregar usuario</span>
        </button>

        {/* modal */}
        <Modal show={openModal} size="4xl" className="bg-primary" popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Agregar usuario</h3>
              <form onSubmit={onSubmit}>
                <div className="flex gap-4">
                  {/* mitad */}
                  <div className="basis-6/12 flex flex-col gap-4" >
                    {/* nombre */}
                    <div>
                        <div className="mb-2 block">
                          <Label htmlFor="nombre" value="Nombre (s)" />
                        </div>
                        <TextInput name="nombre" id="nombre" value={nombre} onChange={onInputChange} placeholder="Ingresa el nombre" maxLength={40} required addon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}/>
                    </div>
                    {/* ap paterno  */}
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="ap_paterno" value="Apellido Paterno" />
                      </div>
                      <TextInput name="ap_paterno" id="ap_paterno" value={ap_paterno} onChange={onInputChange} placeholder="Ingresa el apellido paterno" maxLength={40} required addon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>}/>
                    </div>
                    {/* ap materno  */}
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="ap_materno" value="Apellido Materno" />
                      </div>
                      <TextInput name="ap_materno" id="ap_materno" value={ap_materno} onChange={onInputChange} placeholder="Ingresa el apellido materno" maxLength={40} required addon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>}/>
                    </div>
                    {/* nacimiento */}
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="nacimiento" value="Fecha de nacimiento" />
                      </div>
                      {/* todo: manejar onChange */}
                      <Datepicker id="nacimiento" name="nacimiento" onSelectedDateChanged={handleDateChange} language="es-MX" labelTodayButton="Hoy" icon="" labelClearButton="Limpiar" required addon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>}/>
                    </div>
                    {/*  numero telefonico */}
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Número teléfono" />
                      </div>
                      <TextInput type="tel" id="telefono" name="telefono" value={telefono} onChange={onInputChange} placeholder="Ingresa el número telefónico" maxLength={12} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>}/>
                    </div>
                    {/* nombre usuario */}
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="nombre_usuario" value="Nombre de usuario" />
                      </div>
                      <TextInput name="nombre_usuario" id="nombre_usuario" value={nombre_usuario} onChange={onInputChange} placeholder="Ingresa nombre de usuario" maxLength={40} required addon="@" />
                    </div>
                    {/* contrasena  */}
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="contrasena" value="Contraseña" />
                      </div>
                      <TextInput type="password" name="contrasena" id="contrasena" value={contrasena} onChange={onInputChange} placeholder="Ingresa la contraseña" maxLength={200} required  addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>}/>
                    </div>
                  </div>
                  {/* mitad 2*/}
                  <div className="basis-6/12 flex flex-col gap-4" >
                    {/* sexos */}
                    <div>
                        <div className="mb-2 block">
                          <Label htmlFor="id_sexo" value="Sexo" />
                        </div>
                        <Select id="id_sexo" name="id_sexo" value={id_sexo} onChange={onInputChange} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>}>
                        <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                          {
                          isLoadingSexos && 'loading' || sexos.map( sexo => (
                            <option id={sexo.id} key={sexo.id} value={sexo.id}>{sexo.nombre}</option>
                          ) )}
                        </Select>
                    </div>
                    {/* rol */}
                    <div>
                        <div className="mb-2 block">
                          <Label htmlFor="id_rol" value="Rol" />
                        </div>
                        <Select id="id_rol" name="id_rol" onChange={onInputChange} required addon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>}>
                        <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                          {
                          isLoadingRoles && 'loading' || roles.map( rol => (
                            <option id={rol.id} key={rol.id} value={rol.id}>{rol.rol}</option>
                          ) )}
                        </Select>
                    </div>
                    {/* input rol */}
                    { inputRole.Alumno &&
                    <>
                      {/* alumno numero control  */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="num_control" value="Número de control" />
                        </div>
                        <TextInput name="num_control" id="num_control" value={num_control} onChange={onInputChange} placeholder="Ingresa el número de control" maxLength={15} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>} />
                      </div>
                        {/* alumno tutor */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="id_usuario_tutor" value="Tutor" />
                        </div>
                        <Select id="id_usuario_tutor" name="id_usuario_tutor" onChange={onInputChange} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>}>
                          <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                          { isLoadingTutores && 'loading' || tutores.map( tutor => (
                            <option id={tutor.id} key={tutor.id} value={tutor.id}>{tutor.id + " - " + tutor.name}</option>
                          ) )}
                        </Select>
                      </div>
                      {/* alumno periodo */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="id_periodo" value="Periodo" />
                        </div>
                        <Select id="id_periodo" name="id_periodo" onChange={onInputChange} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>}>
                          <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                          { isLoadingPeriodos && 'loading' || periodos.map( periodo => (
                            <option id={periodo.id} key={periodo.id} value={periodo.id}>{periodo.id + " " + periodo.nombre_tipo}</option>
                          ) )}
                        </Select>
                      </div>
                      {/* alumno grupo */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="id_grupo" value="Grupo" />
                        </div>
                        <Select id="id_grupo" name="id_grupo" onChange={onInputChange} required addon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                          </svg>}>
                          <option value="" key={new Date().getDate()}>Selecciona una opción</option>
                          { isLoadingGrupos && 'loading' || grupos.map( grupo => (
                            <option id={grupo.id} key={grupo.id} value={grupo.id}>"{grupo.prefijo}"</option>
                          ) )}
                        </Select>
                      </div>
                    </>
                    ||
                    inputRole.Docente &&
                    // docente cedula prof
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="cedula_prof" value="Cédula profesional" />
                      </div>
                      <TextInput name="cedula_prof" id="cedula_prof" value={cedula_prof} onChange={onInputChange} placeholder="Ingresa la cédula profesional" maxLength={20} required addon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                      </svg>} />
                    </div>}
                    {/* activo */}
                    <div>
                      <div className="mb-2 mt-4 block text-center">
                        <Label htmlFor="activo" value={`Cuenta activa: ${active && 'Sí' || 'No'}`}/>
                        <ToggleSwitch color="blue" className="mx-auto" size="lg" id="activo" name="activo" checked={active} onChange={setActive} value='si' />
                      </div>
                    </div>
                  </div>
                </div>
                {/* buttons */}
                <div className="w-6/12 mx-auto mt-4 flex justify-around">
                  <Tooltip content="Cancelar y cerrar" placement="bottom" style="dark">
                      <Button color="" className="hover:scale-105 active:scale-95 px-2  text-white inline-block bg-red-600 hover:bg-red-800 font-bold" onClick={() => { setOpenModal(false) }}>Cancelar</Button>
                  </Tooltip>
                  <Tooltip content="Limpiar todo el formulario" placement="bottom" style="dark">
                    <Button color="" type="submit" className="hover:scale-105 active:scale-95 px-2 text-white  inline-block bg-yellow-300 hover:bg-yellow-400 font-bold" onClick={() => { onResetForm() }} >Limpiar</Button>
                  </Tooltip>
                  <Tooltip content="Agregar usuario y cerrar" placement="bottom" style="dark">
                    <Button type="submit" className="hover:scale-105 active:scale-95 px-2 inline-block bg-sky-600 font-bold">Agregar</Button>
                  </Tooltip>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        <Toaster position="bottom-right" reverseOrder={false} />
      </>
    )
};

export default AgregarUser;
