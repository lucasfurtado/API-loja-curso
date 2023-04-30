import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('/usuarios')
export class UsuarioController{

  constructor(private usuarioRepository: UsuarioRepository){}

    @Post()
    async criarUsuario(@Body() usuario: CriaUsuarioDTO){
      this.usuarioRepository.inserir(usuario);
      return usuario;
    }

    @Get()
    async listarUsuarios(){
      return this.usuarioRepository.listarUsuarios();
    }
}