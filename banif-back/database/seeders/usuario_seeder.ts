import Usuario from '#models/usuario'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    await Usuario.create({
      id: 1,
      username: 'Asafe',
      email: 'elias@banif.com',
      password: 'senha123', // será hasheado automaticamente
      cpf: '123.123.123-12',
      endereco: 'Francisco Machado, 1451, Paranaguá - PR',
      is_gerente: true
    })

    await Usuario.create({
      id: 2,
      username: 'Daniel',
      email: 'garbeto@banif.com',
      password: 'senha456', // hash automático
      cpf: '456.456.456-45',
      endereco: 'Rua das Flores, 789, Paranaguá - PR',
      is_gerente: true
    })

    await Usuario.create({
      id: 3,
      username: 'Marques',
      email: 'pecine@banif.com',
      password: 'senha789', // hash automático
      cpf: '789.789.789-78',
      endereco: 'Avenida Central, 101, Paranaguá - PR',
      is_gerente: false
    })

    await Usuario.create({
      id: 4,
      username: 'Bananildo Silva',
      email: 'amobananasdeliciosas@banif.com',
      password: 'eatmorebananas', // hash automático
      cpf: '401.167.891-21',
      endereco: 'Av. das Bananas, 1000, Banana City - BCs',
      is_gerente: false
    })
  }
}
