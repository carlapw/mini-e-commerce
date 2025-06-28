import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column( "numeric", {precision: 10, scale: 2})
    price: number;

    @Column( {nullable: true})
    image_url: string;

    @Column( {default: true})
    available: boolean;
}