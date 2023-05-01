import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnico } from "../validacao/email-is-unico.validator";

export class AtualizaUsuarioDTO{

    @IsNotEmpty({message:'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {message:'O e-mail informado é inválido'})
    @EmailIsUnico({message:'Já existe um usuário com este e-mail'})
    @IsOptional()
    email: string;

    @MinLength(6, {message:'A senha precisa ter pelo menos 6 caracteres'})
    @IsOptional()
    senha: string
}