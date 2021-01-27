
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';



describe('AppService', () => {
  let service: AppService;
  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Survey Service - getUser()", () => {

    it('should return correct response', () => {
      expect(service.getUser()).toMatchObject({
        data :{
            name : "Abbas Ogaji",
            github: "@abbasogaji",
            email: "abbasogaji@gmail.com",
            mobile: "09066240219",
            twitter: "@sudo_abbas"
          }
      })
    });
  })

  describe("Survey Service - postValidateRule()", () => {

    it('should return success response for valid condition of a valid nested object', () => {
      const req = { 
         rule: {
            field: "missions.count",
            condition: "gte",
            condition_value: 30
          },
          data: {
            name: "James Holden",
            crew: "Rocinante",
            age: 34,
            position: "Captain",
            missions: {
              count: 45,
              successful: 44,
              failed: 1
            }
          }
      }

      const res = {
        message: "field missions.count successfully validated.",
        data: {
          validation: {
            error: false,
            field: "missions.count",
            field_value: 45,
            condition: "gte",
            condition_value: 30
          }
        }
      }
      expect(service.postValidateRule(req)).toEqual(res)
    });

  })
});
