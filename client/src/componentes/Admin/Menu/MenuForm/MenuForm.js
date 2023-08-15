import React from 'react';
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./MenuForm.form";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";

const menuController = new Menu();

export function MenuForm(props) {
    const { accessToken } = useAuth();
    const { onClose, onReload, menu } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    title: formValue.title,
                    oreder: formValue.order,
                    path: `${formValue.protocol}${formValue.path}`,
                    active: formValue.active,
                } 

                if(menu)
                    console.log("update menu");
                else{
                    const response = await menuController.createMenu(accessToken, formValue);
                }

                onClose();
                onReload();

            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths={'equal'}>
                <Form.Input
                    name="title"
                    placeholder="Titulo"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <Form.Input
                    name="order"
                    type="number"
                    placeholder="Order"
                    onChange={formik.handleChange}
                    value={formik.values.order}
                    error={formik.errors.order}
                />
            </Form.Group>
            <Input
                name='path'
                placeholder="URL"
                fluid
                label={!menu ?
                    <Dropdown
                        options={options}
                        onChange={(_, data) => {
                            formik.setFieldValue("protocol", data.value);
                        }}
                        value={formik.values.protocol}
                        error={formik.errors.protocol}
                    />
                    : null}
                onChange={formik.handleChange}
                value={formik.values.path}
                error={formik.errors.path}
            />

            <Form.Group></Form.Group>

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {!menu ? "Crear menu" : "Actualizar menu"}
            </Form.Button>
        </Form>
    )
}

const options = [
    { key: 'https://', text: "https://", value: "https://" },
    { key: 'http://', text: "http://", value: "http://" },
    { key: '/', text: "/", value: "/" },
]
