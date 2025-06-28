import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}
    async criar(dados: CreateProductDto): Promise<Product>{
        const nova = this.productRepository.create(dados);
        return await this.productRepository.save(nova);
    }

    async listar(): Promise<Product[]>{
        return this.productRepository.find();
    }

    async buscarPorId(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    }
    async atualizar(id: number, dados: CreateProductDto): Promise<Product> {
        await this.buscarPorId(id);      // Verifica se o produto existe
        await this.productRepository.update(id, dados);
        return this.buscarPorId(id);
    }
    async remover(id: number): Promise<void> {
        const product = await this.buscarPorId(id);   // Verifica se o produto existe
        await this.productRepository.remove(product);
    }

}
