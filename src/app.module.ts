import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRootAsync({
      useClass:PostgresConfigService,
      inject:[PostgresConfigService]
    }),
    CategoryModule,
    ArticleModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint, JwtService,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard,
    }
  ],
})
export class AppModule {}
