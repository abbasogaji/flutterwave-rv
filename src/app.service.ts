import { HttpException, Injectable } from '@nestjs/common';
import { ConditionTypes } from './core/_enums/condition-types.enum';
import { PostValidateRuleDto } from './dtos/post-validate-rule.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(){
    return {
      data :{
        name : "Abbas Ogaji",
        github: "@abbasogaji",
        email: "abbasogaji@gmail.com",
        mobile: "09066240219",
        twitter: "@sudo_abbas"
      }
    }
  }

  postValidateRule(postValidateRule : PostValidateRuleDto){
      let validationPassed = false;
      /**
       * If the field specified in the rule object is missing from the data passed, your endpoint response (HTTP 400 status code) should be:
       * {
       *     "message": "field [name of field] is missing from data."
       *     "status": "error",
       *     "data": null
       *  }
       * 
       */
      if(this.index(postValidateRule.data, postValidateRule.rule.field) == undefined && typeof(postValidateRule.data) != "string"){
          throw new HttpException({message : `field ${postValidateRule.rule.field} is missing from data`}, 400)
      }
      // Process the Validation
      switch(postValidateRule.rule.condition){
        case ConditionTypes.EQ:
          validationPassed = (this.index(postValidateRule.data, postValidateRule.rule.field) == postValidateRule.rule.condition_value)
        break;
        case ConditionTypes.NEQ:
          validationPassed = (this.index(postValidateRule.data, postValidateRule.rule.field) != postValidateRule.rule.condition_value)
        break;

        case ConditionTypes.GTE:
          console.log(this.index(postValidateRule.data, postValidateRule.rule.field))
          validationPassed = (this.index(postValidateRule.data, postValidateRule.rule.field) >= postValidateRule.rule.condition_value)
        break;

        case ConditionTypes.GT:
          validationPassed = (this.index(postValidateRule.data, postValidateRule.rule.field) > postValidateRule.rule.condition_value)
        break;
        case ConditionTypes.CONTAINS:
          validationPassed = (this.index(postValidateRule.data, postValidateRule.rule.field).includes(postValidateRule.rule.condition_value))
        break
      }

      // Return Appropriate Reponse
      if(validationPassed){
        return {
          message : `field ${postValidateRule.rule.field} successfully validated.`,
          data : {
              validation : {
                error : false,
                field : postValidateRule.rule.field,
                field_value : this.index(postValidateRule.data, postValidateRule.rule.field),
                condition : postValidateRule.rule.condition,
                condition_value : postValidateRule.rule.condition_value
              }
          }
         }
      }else{
        throw new HttpException({
          message : `field ${postValidateRule.rule.field} failed validation`,
          data : {
              validation : {
                error : true,
                field : postValidateRule.rule.field,
                field_value : postValidateRule.data[postValidateRule.rule.field],
                condition : postValidateRule.rule.condition,
                condition_value : postValidateRule.rule.condition_value
              }
          }
         }, 400)
      }
     
    }


  private index(obj,is) {
      if(typeof is == 'string' && (is.match(/\./g) || []).length > 2){
        throw new HttpException({message : "field rule.condition object nesting should not be more than 2 levels"}, 400)
      }
      if(obj == null){
        return undefined
      }
      if (typeof obj == 'string' || typeof obj == 'number')
          return obj
      if (typeof is == 'string')
          return this.index(obj,is.split('.'));
      else if (is.length==0)
          return obj;
      else
          return this.index(obj[is[0]] || null,is.slice(1));
  }
}
