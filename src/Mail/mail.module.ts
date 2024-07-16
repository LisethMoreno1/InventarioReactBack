// src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';

@Module({
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService], // Exporta el servicio para usarlo en otros módulos
})
export class MailModule {}
