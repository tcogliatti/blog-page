import React, { useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { image } from "../../../../assets";
import { Course } from "../../../../api";
import { ENV } from "../../../../utils";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./CourseForm.form";
import "./CourseForm.scss";
import { isEqualWith } from 'lodash';

const courseController = new Course();

export function CourseForm(props) {
    const { onClose, onReload } = props;
    const { accessToken } = useAuth();

    // manejo de validaciones de formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
            //     if (!user)
                    await courseController.createCourse(accessToken, formValue);
                // else
                //     await userController.updateUser(accessToken, user._id, formValue);
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

    // manejo de carga de imagen miniatura 
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    }, [formik]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    })
    const getMiniature = () => {
        if(formik.values.file)
            return formik.values.miniature;
        // else if(formik.values.minitaure)
        //     return formik.values.minitaure;
        // else
        return null;

    };

    return (
        <Form className='course-form' onSubmit={formik.handleSubmit}>
            {/* 
                Operador ... : "propagación de propiedades" o "prop spreading"
                Se utiliza para propagar las propiedades de un objeto en un componente
            */}
            <div className='course-form__miniature' {...getRootProps()}>
                <input {...getInputProps()} />
                {getMiniature() ? (
                    <Image size='small' src={getMiniature()} />
                ) : (
                    <div>
                        <span>Arrastra tu minuatura</span>
                    </div>
                )}
            </div>
            <Form.Input
                name="title"
                placeholder="Nombre del curso"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />
            <Form.Input
                name="url"
                placeholder="Link del curso"
                onChange={formik.handleChange}
                value={formik.values.url}
                error={formik.errors.url}
            />
            <Form.TextArea
                name="description"
                placeholder="Breve descipción del curso"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.errors.description}
            />
            <Form.Group widths="equal">
                <Form.Input
                    type='number'
                    name="price"
                    placeholder="Precio del curso"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    error={formik.errors.price}
                />
                <Form.Input
                    type='number'
                    name="score"
                    placeholder="Puntaje del curso"
                    onChange={formik.handleChange}
                    value={formik.values.score}
                    error={formik.errors.score}
                />
            </Form.Group>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                Crear curso
            </Form.Button>
        </Form>
    )
}
