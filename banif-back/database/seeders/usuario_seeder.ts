import Usuario from '#models/usuario'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'


export default class extends BaseSeeder {
  public async run() {
    await Usuario.createMany([
      {
        username: 'Asafe',
        email: 'elias@banif.com',
        password: await hash.make('senha123'),
        cpf: '123.123.123-12',
        endereco: 'Francisco Machado, 1451, Paranaguá - PR',
        tipo: true
      },
      {
        username: 'Daniel',
        email: 'garbeto@banif.com',
        password: await hash.make('senha456'),
        cpf: '456.456.456-45',
        endereco: 'Rua das Flores, 789, Paranaguá - PR',
        tipo: true
      },
      {
        username: 'Marques',
        email: 'pecine@banif.com',
        password: await hash.make('senha789'),
        cpf: '789.789.789-78',
        endereco: 'Avenida Central, 101, Paranaguá - PR',
        tipo: false
      },               
      {
        username: 'Bananildo Silva',
        email: 'amobananasdeliciosas@banif.com',
        password: await hash.make('eatmorebananas'),
        cpf: '401.167.891-21',
        endereco: 'Av. das Bananas, 1000, Banana City - BCs',
        tipo: false
      }
    ])
  }
}
