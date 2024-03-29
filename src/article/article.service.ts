import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ListArticleDto } from './dto/list-article.dto';
import { Category } from 'src/category/entities/category.entity';

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

  async findOne(id: number) {
    const dadoSalvo = await this.articleRepository.findOneBy({id});
    const article = new ListArticleDto(
      dadoSalvo.id,
      dadoSalvo.userId,
      dadoSalvo.categoryId,
      dadoSalvo.name,
      dadoSalvo.content,
      dadoSalvo.description,
      dadoSalvo.url
    );

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = new Article({ ...updateArticleDto});
    await this.articleRepository.update(id,article);
  }

  async remove(id: number) {
      const articleDeletado = await this.articleRepository.delete(id);

      if (!articleDeletado.affected) {
        //this.Error('Usuário não encontrado');
      }
  
      const resultado = {
        message: 'Artigo removido com sucesso'
      };

      return resultado;
  }
}
