import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  // imports: [UserService],

})
export class AuthModule {
}
