import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from '../dto/reset-password.dto';

ApiTags('Login');
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  requestPasswordReset(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.requestPasswordReset(resetPasswordDto);
  }
}
