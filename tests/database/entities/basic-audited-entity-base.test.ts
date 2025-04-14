import { expect } from 'chai';
import { BasicAuditedEntityBase } from '../../../src';

describe('BasicAuditedEntityBase', () => {
  it('should be defined', () => {
    expect(BasicAuditedEntityBase).to.be.a('function');
  });
});
