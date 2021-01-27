import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService : AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide : AppService,
        useFactory : () => ({
          getUser : jest.fn(() => ({
            message : "My Rule-Validation API",
            data :{
              name : "Abbas Ogaji",
              github: "@abbasogaji",
              email: "abbasogaji@gmail.com",
              mobile: "09066240219",
              twitter: "@sudo_abbas"
          }})),
          postValidateRule : jest.fn()
        })
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('getUser() should return correct response', () => {
      expect(appController.getUser()).toMatchObject({
        message : "My Rule-Validation API",
        data :{
        name : "Abbas Ogaji",
        github: "@abbasogaji",
        email: "abbasogaji@gmail.com",
        mobile: "09066240219",
        twitter: "@sudo_abbas"
      }});
    });

    it('getUser() should call appService.getUser()', () => {
      appController.getUser()
      expect(appService.getUser).toHaveBeenCalled()
    });

    it('postValidateRule() should call appService.postValidateRule() with correct params', () => {
      const params : any = {rule : "any", data : "any"}
      appController.postValidateRule(params)
      expect(appService.postValidateRule).toHaveBeenCalledWith(params)
    })

  });
});
