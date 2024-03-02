import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDbService } from './dynamo-db.service';

describe('DynamoDbService', () => {
  let service: DynamoDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamoDbService],
    }).compile();

    service = module.get<DynamoDbService>(DynamoDbService);
  });

  it('should be defined', async () => {
    await service.saveClientAuthorize({ audience: [], client_id: 'clientId', state: 'statedesu', code_challenge: 'cc', code_challenge_method: 'S256', prompt: 'prompt', redirect_uri: 'r', response_type: 'code', scope: 's' })
    expect(service).toBeDefined();
  });
});
