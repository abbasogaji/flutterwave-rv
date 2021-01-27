import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ConditionTypes } from "src/core/_enums/condition-types.enum";

export class RulesDto{
    @IsString({ message : 'field is required'})
    @IsNotEmpty({ message : 'field is required'})
    field: string;
    @IsEnum(ConditionTypes, { message : 'condition is invalid'})
    @IsNotEmpty({ message : 'condition is required'})
    condition : string;
    @IsNotEmpty({ message : 'condition_value is required'})
    condition_value: number | string
}