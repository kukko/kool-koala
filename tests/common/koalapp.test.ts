import { expect } from 'chai';
import { KoalApp } from '../../src';

describe('KoalApp', () => {
  it('should be defined', () => {
    expect(KoalApp).to.be.a('function');
  });
});