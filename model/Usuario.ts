import {object, string, ObjectSchema, InferType, number} from 'yup';

interface UsuarioErro {
    idUsuario?: string
    nome?: string
    senha?: string
    email?: string
    telefone?: string
}

const usuarioSchema : ObjectSchema<any, any> = object({
    idUsuario: number().nullable().default(null),
    nome: string().required("Insira seu nome"),
    senha: string().required("Escolha uma senha"),
    email : string()
        .required("Por favor insira o email")
        .email("Informe um email válido"),
    telefone : string()
        .required("Por favor insira o telefone")
        .min(8, "Informe um número de telefone válido")
})

type Usuario = InferType<typeof usuarioSchema>;

export {Usuario, UsuarioErro, usuarioSchema};