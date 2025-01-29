import { EmailNotification } from '@mertxe/core';
import { TimeClockSessionReportNotification } from '@modules/time-clock/domain/notifications';
import { template } from '@modules/shared';

export class TimeClockSessionReportEmailNotification extends EmailNotification {
  constructor(notification: TimeClockSessionReportNotification) {
    super({
      to: notification.data.email,
      subject: 'Session report',
      data: notification.data,
      content: template({
        title: 'Reporte de Fichaje',
        content: `
<h2>✨ Hola, {{username}},</h2>
<p>🕛 Resumen de tu estancia en La Mertxe 🏠:</p>
<div class="details">
  <p><strong>⏰ Entraste a las:</strong> 08:00 AM</p>
  <p><strong>⏰ Saliste a las:</strong> 05:00 PM</p>
  <p><strong>⏳ Estuviste un total de:</strong> 9 horas</p>
  <p><strong>⚡ Puntos consumidos:</strong> 45 puntos</p>
</div>
<p>🙏 Si tienes alguna pregunta, no dudes en contactarnos.</p>
`,
        styles: `
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
`,
      }),
    });
  }
}
