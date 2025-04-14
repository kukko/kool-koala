import { expect } from 'chai';
import { EntityBase } from '../../../src';

describe('EntityBase', () => {
  it('should be defined', () => {
    expect(EntityBase).to.be.a('function');
  });
});
