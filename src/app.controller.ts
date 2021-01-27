import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { DataResponseInterceptor } from './core/_interceptors/data-response.interceptors';
import { PostValidateRuleDto } from './dtos/post-validate-rule.dto';

@Controller()
@UseInterceptors(DataResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): any {
    return this.appService.getUser();
  }

  @Post('validate-rule')
  postValidateRule(@Body() postValidateRuleDto : PostValidateRuleDto){
    return this.appService.postValidateRule(postValidateRuleDto)
  }
}
