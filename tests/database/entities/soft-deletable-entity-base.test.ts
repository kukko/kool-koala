import { expect } from 'chai';
import { SoftDeletableEntityBase } from '../../../src';

describe('SoftDeletableEntityBase', () => {
  it('should be defined', () => {
    expect(SoftDeletableEntityBase).to.be.a('function');
  });
});
