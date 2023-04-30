import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

import { motorcyclesArray, validMotorcycleWithStatus,
  validMotorcycle, id, updatedMotorcycle } from './Mocks/motorcycle.mocks.service';
import { HttpException } from '../../../src/Middlewares/HttpException';

describe('Testa a rota "/motorcycles"', function () {
  describe('Testa o post', function () {
    it('Verifica se é possível cadastrar um carro com sucesso', async function () {
      const carOutput: Motorcycle = new Motorcycle(validMotorcycleWithStatus);
      sinon.stub(Model, 'create').resolves(carOutput);
  
      const service = new MotorcycleService();
      const result = await service.create(validMotorcycleWithStatus);
  
      expect(result).to.be.deep.equal(carOutput);
    });
    
    it(
      'Verifica se é possível cadastrar um carro com sucesso mesmo sem o status',
      async function () {
        const motorcycleOutput: Motorcycle = new Motorcycle(validMotorcycle);
        sinon.stub(Model, 'create').resolves(motorcycleOutput);

        const service = new MotorcycleService();
        const result = await service.create(validMotorcycle);

        expect(result).to.be.deep.equal(motorcycleOutput);
        expect(result).to.haveOwnProperty('status');
      },
    );
  });

  describe('Testa o get de todos os carros', function () {
    it('Verifica se é possível receber todos os carros cadastrados com sucesso', async function () {
      sinon.stub(Model, 'find').resolves(motorcyclesArray);

      const service = new MotorcycleService();
      const result = await service.getAll();

      expect(result).to.be.deep.equal(motorcyclesArray);
    });

    it('Verifica se é possível receber um carro específico com sucesso', async function () {
      const carOutput: Motorcycle = new Motorcycle(validMotorcycle);
      sinon.stub(Model, 'findById').resolves(carOutput);

      const service = new MotorcycleService();
      const result = await service.getById(id);

      expect(result).to.be.deep.equal(carOutput);
    });

    it('Deve retornar um erro caso não encontre o carro', async function () {
      sinon.stub(Model, 'findById').resolves(null);
      const service = new MotorcycleService();

      try {
        await service.getById(id);
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Motorcycle not found');
      }
    });

    it('Deve retornar um erro caso não receba um id correto', async function () {
      sinon.stub(Model, 'findById').resolves(null);
      const service = new MotorcycleService();

      try {
        await service.getById('12121212');
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Invalid mongo id');
      }
    });
  });

  describe('Testa o update de um carro', function () {
    it('Deve ser possível atualizar um carro', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotorcycle);

      const service = new MotorcycleService();
      const result = await service.update(id, updatedMotorcycle);

      expect(result).to.be.deep.equal(updatedMotorcycle);
    });

    it('Deve retornar um erro ao tentar atualizar com um id inválido', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const service = new MotorcycleService();
      try {
        await service.update('12121212', updatedMotorcycle);
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Invalid mongo id');
      }
    });

    it('Deve retornar um erro ao tentar atualizar com um carro inexistente', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const service = new MotorcycleService();
      try {
        await service.update(id, updatedMotorcycle);
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Motorcycle not found');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});