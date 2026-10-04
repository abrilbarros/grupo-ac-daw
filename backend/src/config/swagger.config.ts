import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const estilos = `
.swagger-ui { font-family: "Segoe UI", Roboto, Arial, sans-serif; }
.swagger-ui .information-container { background: #0e7490; }
.swagger-ui .information-container .info { margin: 0; padding: 32px 32px; }
.swagger-ui .info .title, .swagger-ui .info p { color: #ffffff; }
.swagger-ui .info .title { font-weight: 700; font-size: 38px; }
.swagger-ui .info p { font-size: 17px; }
.swagger-ui .scheme-container { background: #f1f5f9; box-shadow: none; padding: 20px 0; }
.swagger-ui .btn.authorize { background-color: #0e7490 !important; color: #ffffff !important; border: 2px solid #0e7490 !important; border-radius: 8px; font-size: 18px; font-weight: 700; padding: 12px 32px; }
.swagger-ui .btn.authorize svg { fill: #ffffff !important; width: 24px; height: 24px; }
.swagger-ui .opblock-tag { font-size: 30px !important; font-weight: 800 !important; padding: 16px 8px; border-bottom: 3px solid #0e7490; }
.swagger-ui .opblock-tag span, .swagger-ui .opblock-tag a { font-size: 30px !important; font-weight: 800 !important; }
.swagger-ui .opblock { border-radius: 12px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18); margin-bottom: 14px; }
.swagger-ui .opblock .opblock-summary { padding: 16px 18px; }
.swagger-ui .opblock .opblock-summary-method { border-radius: 8px; min-width: 95px; font-size: 16px; padding: 9px 0; }
.swagger-ui .opblock .opblock-summary-path { font-size: 18px; font-weight: 600; }
.swagger-ui .opblock .opblock-summary-description { flex: 1 1 auto; text-align: right !important; padding-right: 18px; font-size: 15px; font-weight: 600; color: #334155; }
.swagger-ui .btn.execute { background-color: #0e7490; border-color: #0e7490; font-size: 16px; padding: 10px 28px; border-radius: 8px; }
`;

export function configurarSwagger(
  app: INestApplication,
  prefijo: string,
): void {
  const config = new DocumentBuilder()
    .setTitle('Sistema de Turnos - Clínica')
    .setDescription('API del sistema de gestión de turnos médicos')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(prefijo, app, document, {
    customSiteTitle: 'Clínica - API de turnos',
    customCss: estilos,
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
    },
  });
}
