import React from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks"

const authController = new Auth();

export function LoginForm() {
    const {login} = useAuth();
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const response = await authController.login(formValue);
                
                authController.setAccessToken(response.access);
                authController.setRefreshToken(response.refresh);
                
                console.log(response.access);
                console.log(response.refresh);
                
                login(response.access);
            } catch (error) {
                console.error(error);
            }
        },
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
            name="email" 
            placeholder="Correo Electrónico" 
            onChange={formik.handleChange} 
            value={formik.values.email}
            error={formik.errors.email} 
        />
        <Form.Input 
            name="password" 
            placeholder="Contraseña" 
            type="password" 
            onChange={formik.handleChange} 
            value={formik.values.password}
            error={formik.errors.password} />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
            Entrar
        </Form.Button> 
    </Form>
  )
}