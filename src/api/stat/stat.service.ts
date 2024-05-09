import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
//import { STAT_MODEL } from 'src/utils/constants';
//import { Stat } from './interfaces/stat.model'; //Não usado no método @Nestjs/mongoose
import { UserService } from '../user/user.service';
import { ArticleService } from '../article/article.service';
import { CategoryService } from '../category/category.service';
import { InjectModel } from '@nestjs/mongoose';
import { Stat } from './schemas/stat.schema';

@Injectable()
export class StatService {
    constructor(
        //@Inject(STAT_MODEL)
        //private readonly statModel: Model<Stat>,
        @InjectModel(Stat.name) private readonly statModel:Model<Stat>,
        private readonly userService: UserService,
        private readonly articleService: ArticleService,
        private readonly categoryService: CategoryService,
    ) { }

    async create() {
        //Contagem de dados
        const usersCount = (await this.userService.findAll()).length;
        const articlesCount = (await this.articleService.findAll()).length;
        const categoriesCount = (await this.categoryService.findAll()).length;

        //Nova instância do mongoAtual com base nesse Schema
        const stat = new this.statModel({
            users: usersCount,
            articles: articlesCount,
            categories: categoriesCount,
            createdAt: new Date()
        });

        //Última atualização
        const lastStat = await this.statModel.findOne({}, {}, { sort: { 'createdAt': -1 } });

        //Comparar se a estatística mudou
        const changeUsers = !lastStat || stat.users !== lastStat.users; //testar se existe obj antes de tentar acessa-lo na validação
        const changeCategories = !lastStat || stat.categories !== lastStat.categories;
        const changeArticles = !lastStat || stat.articles !== lastStat.articles;

        //Inserir no MongoDB
        if (changeArticles || changeCategories || changeUsers) {
            return await stat.save().then(() => console.log('[Stats] Estatísticas atualizadas'))
        }
    }

    async getStats() {
        return await this.statModel.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    article: 0,
                    categories: 0
                }
                return stat || defaultStat;
            });
    }
}
