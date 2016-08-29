var expect = require('chai').expect;
var should = require('chai').should();

var assert = require("assert");

describe('Swot', function(){
  this.timeout(5000);
  describe('has check function', function(){
    it('should return true', function(){
      var swot = require("../lib/swot.js")();
      assert.equal(true, (swot.check != undefined));
    });
  });
  describe('test @hdm-stuttgart.de', function(){
    it('should return name of university', function(done){
      var swot = require("../lib/swot.js")(function(){
      		assert.equal("Fachhochschule Stuttgart, Hochschule der Medien\n",swot.check("mv037@hdm-stuttgart.de"));
      		done();
      });
    });
  });
  describe('test @test.de', function(){
    it('should return false', function(done){
      var swot = require("../lib/swot.js")(function(){
      		assert.equal(false,swot.check("mv037@test.de"));
      		done();
      });
    });
  });
  describe('test @si.edu (blacklisted)', function(){
    it('should return false', function(done){
      var swot = require("../lib/swot.js")(function(){
      		assert.equal(false,swot.check("mv037@si.edu"));
      		done();
      });
    });
  });
});
