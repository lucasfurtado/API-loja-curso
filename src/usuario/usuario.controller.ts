import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from "@nestjs/common";
import { v4 as uuid } from 'uuid'

@Controller('/usuarios')
export class UsuarioController{

  constructor(private usuarioRepository: UsuarioRepository){}

    @Post()
    async criarUsuario(@Body() usuario: CriaUsuarioDTO){
      const usuarioEntity = new UsuarioEntity();
      usuarioEntity.id = uuid();
      usuarioEntity.nome = usuario.nome;
      usuarioEntity.email = usuario.email;
      usuarioEntity.senha = usuario.senha;

      this.usuarioRepository.salvar(usuarioEntity);
      return {
        usuario: new ListaUsuarioDTO(usuarioEntity.nome, usuarioEntity.id),
        message: 'Usuário criado com sucesso'
      };
    }

    @Get()
    async listarUsuarios(){
      const usuariosSalvos = await this.usuarioRepository.listarUsuarios();
      const usuariosLista = usuariosSalvos.map(
        usuario => new ListaUsuarioDTO(usuario.id,usuario.nome)
      );
      return usuariosLista;
    }
}