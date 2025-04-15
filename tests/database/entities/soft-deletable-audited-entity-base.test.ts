import { expect } from 'chai';
import { SoftDeletableAuditedEntityBase } from '../../../src';

describe('SoftDeletableAuditedEntityBase', () => {
  it('should be defined', () => {
    expect(SoftDeletableAuditedEntityBase).to.be.a('function');
  });
});
