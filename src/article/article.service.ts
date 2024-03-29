import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ListArticleDto } from './dto/list-article.dto';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) { }

  async create(createArticleDto: CreateArticleDto) {
    const article = new Article({ ...createArticleDto });

    const dadosSalvos = await this.articleRepository.save(article);

    const resultado = {
      data: dadosSalvos,
      message: 'Usuário salvo com sucesso!'
    };

    return resultado;
  }

  async findAll() {
    const dadosSalvos = await this.articleRepository.find({
      order: {
        id: 'ASC'
      }
    });
    const articles = dadosSalvos.map(article => new ListArticleDto(
      article.id,
      article.userId,
      article.categoryId,
      article.name,
      article.content,
      article.description,
      article.url)
    );

    return articles;
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
