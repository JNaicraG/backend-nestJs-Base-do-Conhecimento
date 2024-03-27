import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { EntityManager } from "typeorm";
import { IsUniqueConstraintInput } from "./is-unique";

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

    constructor(
        private entityManager: EntityManager
    ) { }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const { tableName, column }: IsUniqueConstraintInput = validationArguments.constraints[0];
        console.log(tableName);
        console.log(column);
        const exists = await this.entityManager.getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({ [column]: value })
            .getExists();
        console.log(exists);
        return exists ? false : true;
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        //throw new Error("Method not implemented.");
        const { tableName, column }: IsUniqueConstraintInput = validationArguments.constraints[0];
        return `${column} já foi cadastrado`;
    }

}