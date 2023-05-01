import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './../usuario.repository';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@Injectable()
@ValidatorConstraint({async: true})  //informando que é um validator assincrono
export class EmailIsUnicoValidator implements ValidatorConstraintInterface{

    constructor(private usuarioRepository: UsuarioRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value);
        return !usuarioComEmailExiste;
    }
}

export const EmailIsUnico = (opcaoDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoDeValidacao,
            constraints: [],
            validator: EmailIsUnicoValidator
        })
    }
}