import { expect } from 'chai';
import { BasicSoftDeletableAuditedEntityBase } from '../../../src';

describe('BasicSoftDeletableAuditedEntityBase', () => {
  it('should be defined', () => {
    expect(BasicSoftDeletableAuditedEntityBase).to.be.a('function');
  });
});
