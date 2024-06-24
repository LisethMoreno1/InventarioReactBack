import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
}
