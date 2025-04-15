import { expect } from 'chai';
import { AuditedEntityBase } from '../../../src';

describe('AuditedEntityBase', () => {
  it('should be defined', () => {
    expect(AuditedEntityBase).to.be.a('function');
  });
});
