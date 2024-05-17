import axios from "axios";
import { Loader, NavbarCentered } from "../../components/commons";
import { useContext, useEffect } from "react";
import { TitleContext } from "../../context/TitleContextProvider";
import { Button, Accordion, Table } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks";

const Tutor = ({ user }) => {

    // accediento al modificador de titulo del contexto para cambiarlo según sea el caso
    const { setTitle } = useContext(TitleContext);
    
    // objeto que representa la url actual en el navegador
    const location = useLocation();

    // fetching de data
    const {data, isLoading}  = useFetch("getSeguimientos/" + user.id);
    
    useEffect(
        () => { setTitle("Bienvenido") }
        ,[location.pathname, setTitle]);

    const descargarPDF = async (id) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/getPDF/" + id , {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            });
    
            // Crear una URL para el blob recibido
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
    
            // Abrir el PDF en una nueva ventana
            window.open(url, "_blank");
        } catch (error) {
            console.error(error);
        }
        };

    return (
        <>
            <NavbarCentered />


            <div className="p-4">
                <div className="p-4 rounded-lg mt-14 w-screen">
                    <h2 className="mb-8">A continuación verás a tus tutorados.</h2>

                    {isLoading ? < Loader /> : (

                        data.map(alumno => {
                            
                            const seguimientos = JSON.parse(alumno.seguimientos);

                            return(
                            <Accordion className="w-9/12 mx-auto" collapseAll key={alumno.nombre_alumno}>
                                <Accordion.Panel>
                                    <Accordion.Title className="font-semibold">{alumno.nombre_alumno}</Accordion.Title>
                                    <Accordion.Content>
                                    
                                    {seguimientos[0].asignatura && seguimientos[0].detalle 
                                            ?
                                            (
                                                <Table className="mb-5 text-center">
                                                    <Table.Head>
                                                        <Table.HeadCell>Materia</Table.HeadCell>
                                                        <Table.HeadCell>Seguimiento</Table.HeadCell>
                                                    </Table.Head>
                                                    <Table.Body className="divide-y">
                                                        {seguimientos.map(seguimiento => 
                                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                    {seguimiento.asignatura}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {seguimiento.detalle}
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        )}
                                                    </Table.Body>
                                                </Table>
                                            )
                                            :
                                            <h1 className="text-center mb-5"> No tiene seguimientos. </h1>
                                    }
                                    
                                    <Button color="" className="mx-auto bg-sky-600 font-semibold p-0 text-white hover:scale-105 active:scale-95 hover:bg-sky-700" onClick={() => { descargarPDF(alumno.id_usuario) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg>
                                        <span className='ms-3 text-base'>Descargar boleta</span> 
                                    </Button>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>);
                        }
                    )

                    )}
                </div>
            </div>
        </>
    )
}

export default Tutor
