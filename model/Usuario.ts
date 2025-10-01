import {object, string, ObjectSchema, InferType, number} from 'yup';

interface UsuarioErro {
    idUsuario?: string
    nome?: string
    senha?: string
    email?: string
    telefone?: string
}

const usuarioSchema : ObjectSchema<any, any> = object({
    idUsuario: string().nullable().default(null),
    nome: string().required("Insira seu nome"),
    senha: string().required("Escolha uma senha"),
    email : string()
        .required("Por favor insira o email")
        .email("Informe um email válido"),
    telefone : string()
        .required("Por favor insira o telefone")
        .min(8, "Informe um número de telefone válido")
})

const loginSchema : ObjectSchema<any, any> = object({
    email : string()
        .required("Por favor insira o email")
        .email("Informe um email válido"),
    senha: string().required("Escolha uma senha")
})

type Usuario = InferType<typeof usuarioSchema>;

// Interface específica para Login baseada no que o backend espera
interface Login {
    email: string;
    senha: string;
}

export {Usuario, UsuarioErro, usuarioSchema, loginSchema, Login};