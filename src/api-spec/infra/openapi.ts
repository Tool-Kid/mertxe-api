import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_SPEC } from '../domain/api-spec';

export function setupOpenApi(app: INestApplication) {
  const { name, description } = API_SPEC;
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

export const OPEN_API_TAG = {
  AUTH: 'Auth',
  TIME_CLOCK: 'Time clock',
  USER_PROFILE: 'User Profile',
  SCORING: 'Scoring',
  CONTRIBUTIONS: 'Contributions',
};
