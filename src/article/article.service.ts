import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private articleRepository:Repository<Article>
  ){}

  create(createArticleDto: CreateArticleDto) {
    const article = new Article({ ...createArticleDto});

    const dadosSalvos = this.articleRepository.save(article);

    const resultado = {
      data: dadosSalvos,
      message: 'Usuário salvo com sucesso!'
    };

    return resultado;
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
