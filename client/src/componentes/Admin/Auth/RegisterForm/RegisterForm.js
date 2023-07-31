import React, { useState } from 'react';
import "./RegisterForm.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValue, validationSchema } from "./RegisterForm.form";
import { Auth } from "../../../../api";

const authController = new Auth();

export function RegisterForm(props) {
    const { openLogin } = props;
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setError("");
                await authController.register(formValue);
                openLogin();

            } catch (error) {
                setError("Error al intentar registrar la cuenta");                
            }
        },
    })

  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
            name='email' 
            placeholder='Correo electronico' 
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
        />
        <Form.Input 
            name='password' 
            type='password'
            placeholder='Contraseña' 
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
        />
        <Form.Input 
            name='repeatPassword' 
            type='password'
            placeholder='Repetir Contraseña'
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
        />
        <Form.Checkbox 
            name="conditionsAccepted" 
            label="He leído ya cepto las políticas de privacidad"
            onChange={ (_,data) => 
                formik.setFieldValue("conditionsAccepted", data.checked)
            }
            checked={formik.values.conditionsAccepted}
            error={formik.errors.conditionsAccepted}
        />
    
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}> 
            Crear Cuenta
        </Form.Button>

        <p className='register-form__error '>{error}</p>
    </Form>

  )
}
