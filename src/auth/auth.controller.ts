import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';
import { IsPublic } from './decorators/is-public.decorator';

ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type:TokenDto
  })
  @Post('login')
  signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

}
