import { useState } from "react";

export const useForm = (initialValues = {}) => {
  //estado
    const [form, setForm] = useState(initialValues);

    //funcion en cambio de un input del form
    const onInputChange = ({ target }) => {
      //desestructuramos el target
      const { name, value } = target;

      //nuevo estado, cambiando el atributo segun sea el caso
      setForm({ ...form, [name]: value });
    };

  //funcion para resetear el form
  const onResetForm = () => {
    setForm(initialValues);
  };

  return {
    form,
    ...form,
    onInputChange,
    onResetForm,
  };
};
