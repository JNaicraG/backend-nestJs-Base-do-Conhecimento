import { ValidationOptions, registerDecorator } from "class-validator";
import { IsUniqueConstraint } from "./is-unique-constraint";

export type IsUniqueConstraintInput = {
    tableName:string,
    column:string
};

export const IsUnique = (
    options:IsUniqueConstraintInput,
    validationOptions:ValidationOptions
) => {
    return (object:Object, property:string) =>{
        registerDecorator({
            name:'is-unique',
            target:object.constructor,
            propertyName:property,
            options:validationOptions,
            constraints:[options],
            validator:IsUniqueConstraint
        })

    }
}