# orcid

[![orcid on npm](https://img.shields.io/npm/v/orcid.svg)](https://www.npmjs.com/package/orcid)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/curvenote/orcid/blob/main/LICENSE)
![CI](https://github.com/curvenote/orcid/workflows/CI/badge.svg)

A utility and CLI to work with [ORCID](https://orcid.org) in your applications.

## Install

```bash
npm install orcid
```

## Overview & Usage

```ts
import orcid from 'orcid';

const isValid = orcid.validate('https://orcid.org/0000-0002-7859-8394');

orcid.buildUrl('http://orcid.org/0000-0002-7859-8394');
orcid.buildUrl('https://www.orcid.org/0000-0002-7859-8394');
orcid.buildUrl('0000-0002-7859-8394');
// These all point to https://orcid.org/0000-0002-7859-8394
```

## Included Utilities

- `validate` - Validates if a single ORCID string is valid
- `normalize` - Normalizes an ORCID url or string into a ORCID identifier of the form `0000-0002-7859-8394`
- `buildUrl` - Builds a URL to https://orcid.org, includes normalization

## Options

- `strict`: only accept the ID part without the URL
