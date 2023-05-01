import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
        mensagem: 'Usuário criado com sucesso'
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

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO){
      const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

      return {
        usuario: usuarioAtualizado,
        mensagem: 'Usuário atualizado com sucesso',
      }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
      const usuarioRemovido = await this.usuarioRepository.remove(id);

      return {
        usuario: usuarioRemovido,
        mensagem: 'Usuário removido com sucesso.'
      }
    }
}