import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CategoryModule } from '../category/category.module';
import { statsProvider } from './stats.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Stat, StatSchema } from './schemas/stat.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Stat.name, schema:StatSchema}]),
    UserModule,
    ArticleModule,
    CategoryModule],
  controllers: [StatController],
  providers: [StatService],//,...statsProvider], //utilizando o @nestjs/mongoose não é mais necessário o ...statsProvider
  exports:[StatService],
})
export class StatModule {}
