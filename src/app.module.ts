import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { IsUniqueConstraint } from './api/shared/validation/is-unique-constraint';
import { CategoryModule } from './api/category/category.module';
import { ArticleModule } from './api/article/article.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './api/auth/auth.module';
import { JwtAuthGuard } from './api/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthGuard } from './api/auth/guards/admin-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseConfigService } from './config/mongoose.config.service';
import { StatModule } from './api/stat/stat.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRootAsync({
      useClass:PostgresConfigService,
      inject:[PostgresConfigService]
    }),
    MongooseModule.forRootAsync({
      useClass:MongooseConfigService,
      inject:[MongooseConfigService]
    }),
    ScheduleModule.forRoot(),
    CategoryModule,
    ArticleModule,
    AuthModule,
    StatModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint, JwtService,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard,
    },{
      provide:APP_GUARD,
      useClass:AdminAuthGuard,
    }
  ],
})
export class AppModule {}
