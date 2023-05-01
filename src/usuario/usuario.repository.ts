import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository{

    usuarios = [];

    async inserir(usuario){
        this.usuarios.push(usuario);
    }

    async listarUsuarios(){
        return this.usuarios;
    }

    async existeComEmail(email:string){
        const possivelUsuario = this.usuarios.find( 
            usuario => usuario.email === email
        );
        return possivelUsuario !== undefined;
    }

}