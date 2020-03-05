const Employees = require('../employees.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');


describe('Employees', () => {
  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();
  
      const uri = await fakeDB.getConnectionString();
  
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    } catch(err) {
      console.log(err);
    }
  
  });

  describe('Reading data', () => {

    before(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
  
      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();

      const testEmpOne = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: testDepOne._id });
      await testEmpOne.save();
  
      const testEmpTwo = new Employees({ firstName: 'Linda', lastName: 'Gold', department: testDepTwo._id });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {

      const employees = await Employees.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

   it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employees = await Employees.findOne({ firstName: 'Amanda' });
      const expectedName = 'Amanda';
      expect(employees.firstName).to.be.equal(expectedName);
    });

    after(async () => {
      await Employees.deleteMany();
    });
    
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employees = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'IT'});
      await employees.save();
      expect(employees.isNew).to.be.false;
    });

    after(async () => {
      await Employees.deleteMany();
    });
  
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'It' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employees({ firstName: 'Linda', lastName: 'Gold', department: 'IT2' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employees.updateOne({ firstName: 'Amanda' }, { $set: { firstName: 'Clair' }});
      const updatedEmployees= await Employees.findOne({ firstName: 'Clair' });
      expect(updatedEmployees).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employees = await Employees.findOne({ firstName: 'Amanda' });
      employees.name = 'Clair';
      await employees.save();
    
      const updatedEmployees = await Employees.findOne({ firstName: 'Clair' });
      expect(updatedEmployees).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employees.updateMany({ }, { $set: { firstName: 'Updated!'}});
      const employees = await Employees.find();
      expect(employees[0].firstName).to.be.equal('Updated!');
      expect(employees[1].firstName).to.be.equal('Updated!');
    });

    afterEach(async () => {
      await Department.deleteMany();
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'It' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employees({ firstName: 'Linda', lastName: 'Gold', department: 'IT2' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employees.deleteOne({ firstName: 'Amanda' });
      const removeEmployees = await Employees.findOne({ firstName: 'Amanda'  });
      expect(removeEmployees).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employees = await Employees.findOne({ firstName: 'Amanda'  });
      await employees.remove();
      const removedEmployees = await Employees.findOne({ firstName: 'Amanda'  });
      expect(removedEmployees).to.be.null;
    });
    
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employees.deleteMany();
      const employees = await Employees.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employees.deleteMany();
    });
  
  });

});