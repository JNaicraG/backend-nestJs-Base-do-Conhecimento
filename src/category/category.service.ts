import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { ListCategoryDto } from './dto/list-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    //@InjectRepository(Category)
    //private categoryRepository:Repository<Category>,
    //private dataSource:DataSource,
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    let parent;
    if (createCategoryDto.parentId) {
      parent = await this.categoryRepository.findOne({
        where: {
          id: createCategoryDto.parentId
        }
      });
      console.log(parent);
    }

    const category = new Category({
      ...createCategoryDto,
      parent
    });
    const dadosSalvos = await this.categoryRepository.save(category);
    return dadosSalvos;
  }

  async findAll() {

    const categories = await this.categoryRepository.find();
    const categoriesWithPath = await this.withPath(categories);


    const categoriesDto = categoriesWithPath.map(category => {
      let categoryDto = new ListCategoryDto();
      categoryDto.id = category.id;
      categoryDto.name = category.name;
      categoryDto.path = category.path;
      return categoryDto;
    });

    return categoriesDto;
  }

  async findTrees() {
    const trees = await this.categoryRepository.findTrees({ depth: 3 });

    const categoriesWithPath = await this.withPath(trees);

    return categoriesWithPath;
  }


  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    const category = new Category({ ...updateCategoryDto });
    console.log(category)

    let resultado, error;
    await this.categoryRepository.update(id, category)
      .then(user => {
        resultado = {
          message: 'Categoria atualizada com sucesso'
        };
      })

    return { resultado, error };

  }

  async remove(id: number) {
    const categoryDeletada = await this.categoryRepository.delete(id);

    if (!categoryDeletada.affected) {
      //this.Error('Categoria não encontrado');
    }

    const resultado = {
      message: 'Categoria removida com sucesso'
    };
    return resultado;
  }



  private async withPath(categories: Category[]) {

    const categoriesWithPath = await Promise.all(categories.map(async (category) => {
      const ancestors = await this.categoryRepository.findAncestors(category);
      let path = category.name;
      ancestors.map(ancestor => {
        if (category.id != ancestor.id){
          path = `${ancestor.name} > ${path}`
        }
      });
      return { ...category, path };
    }))

    categoriesWithPath.sort((a, b) => {
      if (a.path > b.path) return -1;
      if (a.path < b.path) return 1;
      return 0;
    });
    console.log(categoriesWithPath)
    return categoriesWithPath;
    //const newCat = categories.map(category =>{
    //let parent;
    //if(category.parent){
    //  parent = categories.filter(cat => cat.id === category.parent.id)[0];
    //}
    //console.log('parents: ', parent)
    //let path = category.name;
    //if(parent){
    //  path = `${parent.name} > ${path}`;
    //}

    //let path = category.name;
    ////category.children.map(child => path = `${child.name} < ${path}`)
    //const length = category.children.length;
    //for(let i = 0; i < length; i--){

    //}

    //  let path = category.name;
    //  let parent = category.parent;

    //  while(parent){
    //    path = `${parent.name} > ${path}`;
    //    parent = parent.parent;
    //  }



    //  return { ...category, path}
    //})

    //return newCat;

    //const categoriesWithPath = categories.map(category => {
    //  let path = category.name;
    //  let parent;
    //  if(category.parent){
    //    parent = category.parent;
    //  }

    //  const getParent = (categories:Category[], parent:Category) => {
    //    const newParent = categories.filter( category => category.id === parent.id);
    //    return new Category(parent[0]);
    //  }

    //  while(parent){
    //    path = `${parent} > ${path}`;
    //    console.log('Parent:',parent);
    //    parent = getParent(categories, parent);
    //    console.log('Parent.parent',parent);
    //  }

    //  return { ...category, path};

    //});
    //  const withPath = categories.map(category => {
    //    let path = category.name;
    //    this.categoryRepository.findAncestors(category)
    //      .then(parents => {
    //        parents.map(parent => path = `${parent} > {${category}}`)
    //      });

    //    const categoryDto = new ListCategoryDto();
    //    categoryDto.id = category.id;
    //    categoryDto.name = category.name;
    //    categoryDto.path = path;

    //    return categoryDto;
    //  });

    ////console.log('categorias',categories);
    //const getParent = (categories, parent) => {
    //  const newParent = this.categoryRepository.findAncestors(parent);
    //  //const newParent = categories.filter(category=> category.id === parent.id);
    //  //console.log(`New Parent ${newParent} vindo do pai ${parent}`);
    //  return newParent;
    //}

    ////Coloca o caminho parent > parent > ..n > branch
    //const categoriesWithPath = categories.map(category => {
    //  let path = category.name;
    //  let parent;
    //  if (category.parent)
    //    parent = category.parent;
    //  //parent = getParent(categories, category.parent.id);
    //  console.log('category pré loop', category);
    //  console.log('parent pré loop', parent);

    //  while (parent) {
    //    path = `${parent.name} > ${path}`;
    //    //parent = getParent(categories, category.parent.id)//parent.parent;
    //    //parent = getParent(categories, category.parent.id);
    //    //const temp = parent;
    //    //if(parent.parent)
    //    parent = getParent(categories, parent.parent);
    //    //if(parent == temp)
    //    //  parent = null;
    //    console.log(parent);
    //  }

    //  return { ...category, path }
    //});

    //Order

    //categoriesWithPath.sort((a, b) => {
    //  if (a.path > b.path) return -1;
    //  if (a.path < b.path) return 1;
    //  return 0;
    //});
    //console.log(categoriesWithPath)
    //return categoriesWithPath;
  }

}
