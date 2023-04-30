import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

import { carsArray, validCarWithStatus, validCar, id, updateCar } from './car.mock.service';
import { HttpException } from '../../../src/Middlewares/HttpException';

describe('Testa a rota "/cars"', function () {
  describe('Testa o post', function () {
    it('Verifica se é possível cadastrar um carro com sucesso', async function () {
      const carOutput: Car = new Car(validCarWithStatus);
      sinon.stub(Model, 'create').resolves(carOutput);
  
      const service = new CarService();
      const result = await service.create(validCarWithStatus);
  
      expect(result).to.be.deep.equal(carOutput);
    });

    it(
      'Verifica se é possível cadastrar um carro com sucesso mesmo sem o status',
      async function () {
        const carOutput: Car = new Car(validCar);
        sinon.stub(Model, 'create').resolves(carOutput);

        const service = new CarService();
        const result = await service.create(validCar);

        expect(result).to.be.deep.equal(carOutput);
        expect(result).to.haveOwnProperty('status');
      },
    );
  });

  describe('Testa o get de todos os carros', function () {
    it('Verifica se é possível receber todos os carros cadastrados com sucesso', async function () {
      sinon.stub(Model, 'find').resolves(carsArray);

      const service = new CarService();
      const result = await service.getAll();

      expect(result).to.be.deep.equal(carsArray);
    });

    it('Verifica se é possível receber um carro específico com sucesso', async function () {
      const carOutput: Car = new Car(validCar);
      sinon.stub(Model, 'findById').resolves(carOutput);

      const service = new CarService();
      const result = await service.getById(id);

      expect(result).to.be.deep.equal(carOutput);
    });

    it('Deve retornar um erro caso não encontre o carro', async function () {
      sinon.stub(Model, 'findById').resolves(null);
      const service = new CarService();

      try {
        await service.getById(id);
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Car not found');
      }
    });

    it('Deve retornar um erro caso não receba um id correto', async function () {
      sinon.stub(Model, 'findById').resolves(null);
      const service = new CarService();

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
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateCar);

      const service = new CarService();
      const result = await service.update(id, updateCar);

      expect(result).to.be.deep.equal(updateCar);
    });

    it('Deve retornar um erro ao tentar atualizar com um id inválido', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const service = new CarService();
      try {
        await service.update('12121212', updateCar);
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Invalid mongo id');
      }
    });

    it('Deve retornar um erro ao tentar atualizar com um carro inexistente', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const service = new CarService();
      try {
        await service.update(id, updateCar);
      } catch (error: any) {
        const httpError = error as HttpException;
        expect(httpError.message).to.equal('Car not found');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});