# orcid

[![orcid on npm](https://img.shields.io/npm/v/orcid.svg)](https://www.npmjs.com/package/orcid)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/curvenote/orcid/blob/main/LICENSE)
![CI](https://github.com/curvenote/orcid/workflows/CI/badge.svg)

A utility and CLI to work with [ORCID](https://orcid.org) in your applications.

## Install

```bash
npm install orcid
```

## Using the Command Line

Use the `search` command to find an ORCID given an authors full name (in quotes). The query is powered by OpenAlex, and gives a publication hint, last known institution, and concepts that the author publishes about. The command only returns results for authors with ORCIDs.

```bash
orcid search "rowan cockett"

> Found 1 result for "rowan cockett" with an ORCID:

> Rowan Cockett
> 0000-0002-7859-8394
>   Hint: SimPEG: An open source framework for simulation ...
>   Last Institution: University of British Columbia
>   Concepts: Geology, Computer science, Engineering, Physics ...
```

## Using Node

```ts
import { orcid } from 'orcid';

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

---

As of v1.0.0 this package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

---

<p style="text-align: center; color: #aaa; padding-top: 50px">
  Made with love by
  <a href="https://curvenote.com" target="_blank" style="color: #aaa">
    <img src="https://cdn.curvenote.com/brand/logo-blue-icon.png" style="height: 1em" /> Curvenote
  </a>
</p>
