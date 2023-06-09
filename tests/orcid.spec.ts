import { describe, expect, test } from 'vitest';
import { orcid } from '../src';

describe('ORCID Tests', () => {
  test.each([
    ['undefined', undefined, false, false],
    ['blank', '', false, false],
    ['standard', '0000-0002-7859-8394', false, true],
    ['not an id', '/0000-0002', false, false],
    ['not an id (Y)', '0000-0003-2554-180Y', false, false],
    ['not an id (lowercase)', '0000-0003-2554-180x', false, false],
    ['not an id (too many letters)', '0000-00030-2554-180X', false, false],
    ['orcid.org', 'orcid.org/0000-0002-7859-8394', false, true],
    ['standard http', 'http://orcid.org/0000-0002-7859-8394', false, true],
    ['standard https', 'https://orcid.org/0000-0002-7859-8394', false, true],
    ['standard https with www', 'https://www.orcid.org/0000-0002-7859-8394', false, true],
    ['standard http (strict)', 'http://orcid.org/0000-0002-7859-8394', true, false],
    ['standard https (strict)', 'https://orcid.org/0000-0002-7859-8394', true, false],
    ['standard with X', '0000-0003-2554-180X', false, true],
    ['standard http with X', 'http://orcid.org/0000-0003-2554-180X', false, true],
    ['standard https with X', 'https://orcid.org/0000-0003-2554-180X', false, true],
    ['standard http with X (strict)', 'http://orcid.org/0000-0003-2554-180X', true, false],
    ['standard https with X (strict)', 'https://orcid.org/0000-0003-2554-180X', true, false],
  ])('validate %s', (_, value, strict, result) => {
    expect(orcid.validate(value, { strict })).toBe(result);
  });
  test.each([
    ['undefined', undefined, undefined],
    ['blank', '', undefined],
    ['standard', '0000-0002-7859-8394', '0000-0002-7859-8394'],
    ['orcid.org', 'orcid.org/0000-0002-7859-8394', '0000-0002-7859-8394'],
    ['standard http', 'http://orcid.org/0000-0002-7859-8394', '0000-0002-7859-8394'],
    ['standard https', 'https://orcid.org/0000-0002-7859-8394', '0000-0002-7859-8394'],
    ['standard http with X', 'http://orcid.org/0000-0003-2554-180X', '0000-0003-2554-180X'],
    ['standard https with X', 'https://orcid.org/0000-0003-2554-180X', '0000-0003-2554-180X'],
    [
      'standard https with X with www',
      'https://www.orcid.org/0000-0003-2554-180X',
      '0000-0003-2554-180X',
    ],
  ])('normalize %s', (_, value, result) => {
    expect(orcid.normalize(value)).toBe(result);
  });
  test.each([
    ['undefined', undefined, undefined],
    ['blank', '', undefined],
    ['standard', '0000-0002-7859-8394', 'https://orcid.org/0000-0002-7859-8394'],
    [
      'standard http',
      'http://orcid.org/0000-0002-7859-8394',
      'https://orcid.org/0000-0002-7859-8394',
    ],
  ])('buildUrl %s', (_, value, result) => {
    expect(orcid.buildUrl(value)).toBe(result);
  });
});
