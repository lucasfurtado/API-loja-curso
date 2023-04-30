export class UsuarioRepository{

    usuarios = [];

    async inserir(usuario){
        this.usuarios.push(usuario);
    }

    async listarUsuarios(){
        return this.usuarios;
    }

}