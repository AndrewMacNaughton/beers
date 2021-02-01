/* eslint-env mocha */
'use strict'
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const middleware = require('./../lib/middleware.js')
const DB = require('./../lib/NoSQL.js')
const db = new DB('./../data/database.nosql')
describe('Middleware', () => {
  let mw
  beforeEach(() => {
    mw = middleware(db)
  })
  it('calls next when everything works', () => {
    const spy = sinon.spy()
    mw({ headers: { 'x-user': 'test@test.com' } }, {}, spy)
    expect(spy.calledOnce).to.equal(true)
  })
  it('returns a function', () => {
    expect(mw).to.be.a('function')
  })
  it('should accept 3 args', () => {
    expect(mw.length).to.equal(3)
  })
  it('should call res.status.send with an error x-user missing', () => {
    const spy = sinon.spy()
    const res = {
      status: () => {
        return { send: spy }
      }
    }
    mw({ headers: {} }, res, () => {})
    expect(spy.calledOnce).to.equal(true)
    expect(spy.calledOnceWith('Must include x-user as a header')).to.equal(true)
  })
  it('should call res.status.send with an error when email is not correct formatting', () => {
    const spy = sinon.spy()
    const res = {
      status: () => {
        return { send: spy }
      }
    }
    mw({ headers: { 'x-user': 'test@testcom' } }, res, () => {})
    expect(spy.calledOnce).to.equal(true)
    expect(spy.calledOnceWith('x-user must be a valid email')).to.equal(true)
  })
})
