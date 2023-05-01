import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailIsUnicoValidator } from "./validacao/email-is-unico.validator";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailIsUnicoValidator]
})
export class UsuarioModule{

}