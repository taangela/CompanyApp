const Employees = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employees', () => {

  it('should throw an error if no "firstName" arg', () => {
    const emp = new Employees ({});
    emp.validate(err => {
    expect(err.errors.firstName).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if no "lastName" arg', () => {
    const emp = new Employees ({});
    emp.validate(err => {
    expect(err.errors.lastName).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if no "department" arg', () => {
    const emp = new Employees ({});
    emp.validate(err => {
    expect(err.errors.department).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "firstName", or "lastName", or "department" is not a string', () => {
    const cases = [{}, []];
    for(let firstName of cases) {
      const emp = new Employees({ firstName });
      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }

    for(let lastName of cases) {
      const emp = new Employees({ lastName });
      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }

    for(let department of cases) {
      const emp = new Employees({ department });
      emp.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });


  it('should not throw an error if "firstName" is okay', () => {
    const cases = ['Amanda', 'John'];
    for(let firstName of cases) {
      const emp = new Employees({ firstName, lastName:"Doe", department: "IT" });
      emp.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

  it('should not throw an error if "lastName" is okay', () => {
    const cases = ['Doe', 'Gold'];
    for(let lastName of cases) {
      const emp = new Employees({ lastName, firstName:"Amanda", department: "IT" });
      emp.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

  it('should not throw an error if "department" is okay', () => {
    const cases = ['Management', 'Human Resources'];
    for(let department of cases) {
      const emp = new Employees({ firstName: "Amanda", lastName:"Doe", department });
      emp.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });





});