import { TemplateEngine } from '../../../../../../modules/core/src/lib/template-engine/domain/template-engine';

interface TemplateParams {
  title: string;
  content: string;
  styles: string;
}

export function template(params: TemplateParams): string {
  const engine = new TemplateEngine();
  const template = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-family: 'Arial', sans-serif;
        }
        .header {
            background-color: mediumpurple;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background-color: white;
            border-radius: 2px;
        }
        .header span {
            font-size: 18px;
            font-weight: normal;
            margin-top: 5px;
        }
        .separator {
            display: none;
        }
        .content {
            padding: 30px;
            line-height: 1.8;
        }
        .content h2 {
            font-size: 22px;
            margin-bottom: 15px;
            color: mediumpurple;
        }
        .details {
            margin: 20px 0;
            padding: 20px;
            background: #f9f9fc;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .details p {
            margin: 8px 0;
            font-size: 16px;
            color: #555;
        }
        .footer {
            background-color: #f4f4f6;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #ddd;
        }
        .footer span {
            color: mediumpurple;
            font-weight: bold;
        }
        {{styles}}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            ✉️ {{title}}
            <span>💜 La Mertxe</span>
        </div>
        <div class="content">
            {{content}}
        </div>
        <div class="footer">
            &copy; 2025 <span>💜 La Mertxe</span>. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>
`;
  return engine.render(template, params);
}
