import * as Yup from "yup";

export function initialValue() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
        conditionalAccepted: false,
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("el mail no es válido")
            .required("El campo es obligatorio"),
        password: Yup.string()
            .required("El campo es obligatorio"),
        repeatPassword: Yup.string()
            .required("El campo es obligatorio")
            .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true),          
    })
}