import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Newsletter as NewsletterController} from '../../../../api';
import { initialValues, validationSchema } from './Newsletter.form';
import './Newsletter.scss';

const newsletterController = new NewsletterController();

export function Newsletter() {
    const [success, setSuccess] = useState(false);

    const showHideMessage = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 5000)
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await newsletterController.registerEmail(formValue.email);
                formik.resetForm();
                showHideMessage();
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <div className='footer-newsletter'>
            <h4>¡Anotate y aprendé!</h4>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Input

                    name='email'
                    placeholder='Correo electrónico'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    Me suscribo!
                </Form.Button>
                {success && (
                    <p className='success'>¡Email registrado correctamente!</p>
                )}
            </Form>
        </div>
    )
}
