import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../Mail/services/mail.service';
import { User } from '../../users/entities/user.entity';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async login(loginDto: LoginDto) {
    const { identificationNumber, password } = loginDto;
    const user = await this.userService.findByIdentifier(identificationNumber);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    try {
      const passwordValid = await this.userService.validatePassword(
        user,
        password,
      );
      if (passwordValid) {
        const payload = {
          identificationNumber: user.identificationNumber,
          sub: user.id,
        };
        const accessToken = this.jwtService.sign(payload);

        // Asignar el token de acceso al usuario y actualizar en la base de datos
        user.accessToken = accessToken;
        await this.userService.updateAccessToken(user.id, accessToken);

        // Devolver el token de acceso
        return { accessToken };
      } else {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error al validar la contraseña');
    }
  }

  async requestPasswordReset(resetPasswordDto: ResetPasswordDto) {
    const { identificationNumber } = resetPasswordDto;
    const user = await this.userService.findByIdentifier(identificationNumber);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    try {
      // Genera un token para restablecer la contraseña
      const resetToken = this.generateResetToken(user);

      await this.sendPasswordResetEmail(user, resetToken);
      return {
        message:
          'Se ha enviado un correo electrónico para restablecer la contraseña',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al solicitar restablecimiento de contraseña',
      );
    }
  }

  private generateResetToken(user: User) {
    const payload = { sub: user.identificationNumber };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private async sendPasswordResetEmail(user: User, resetToken: string) {
    // Enlace de recuperacion
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const emailSubject = 'Restablecer Contraseña';
    const emailText = `Hola ${user.firstName} ${user.firstLastName}, \n\nPara restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}   !Atentamente el Equipo de Soprte!`;
    await this.mailService.sendMail(user.email, emailSubject, emailText);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, newPassword: string) {
    const { identificationNumber } = resetPasswordDto;

    try {
      const user =
        await this.userService.findByIdentifier(identificationNumber);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      await this.userService.updatePassword(user.id, newPassword);

      return { message: 'Contraseña restablecida exitosamente' };
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);

      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al restablecer la contraseña',
        );
      }
    }
  }
}
