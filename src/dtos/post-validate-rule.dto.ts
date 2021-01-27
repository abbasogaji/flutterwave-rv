import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, ValidateNested } from "class-validator"
import { RulesDto } from "./rules.dto";

export class PostValidateRuleDto{

    @Type(() => RulesDto)
    @IsObject({ message : "rule should be an object"})
    @ValidateNested({ each: true })
    @IsNotEmpty({message : "rule is required"})
    rule : RulesDto;
    @IsNotEmpty({message : "data is required"})
    data : any
}