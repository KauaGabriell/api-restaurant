import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  
  await knex('products').del();
  await knex('products').insert([
    { name: 'Hamburguer Clássico', price: 25.50 },
    { name: 'Hamburguer Cheddar', price: 28.00 },
    { name: 'Batata Frita Simples', price: 12.00 },
    { name: 'Batata Frita com Bacon', price: 18.50 },
    { name: 'Refrigerante Lata', price: 6.00 },
    { name: 'Suco de Laranja 500ml', price: 9.00 },
    { name: 'Milkshake de Baunilha', price: 15.00 },
    { name: 'Anéis de Cebola', price: 14.00 },
    { name: 'Combo Casal', price: 65.00 },
    { name: 'Pudim de Leite', price: 10.00 },
  ]);
}
