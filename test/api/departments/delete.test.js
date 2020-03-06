const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('delete /api/departments', () => {

  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepTwo.save();
  });

  it('/:id should delete chosen document and return success', async () => {
    const department = await Department.find();
    console.log("log1: ", department);
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    const departmentUpdate = await Department.find();
    console.log('log2: ', departmentUpdate);
    expect(res.body.length).to.be.equal(1);
  });

  after(async () => {
    await Department.deleteMany();
  });

});