![Common](https://res.cloudinary.com/biensupernice/image/upload/v1602471786/Marketing_-_Krane_Common_m2jrvu.png)

[![npm version](https://badge.fury.io/js/%40krane%2Fcommon.svg)](https://badge.fury.io/js/%40krane%2Fcommon)

A common set of utilities written in Typescript to interface with [Krane](https://krane.sh)

## Install

```
npm i @krane/common
```

## Examples

```typescript
import { KraneClient } from "@krane/common";

const client = new KraneClient("http://example.com", "Bearer ...");

const deployments = client.getDeployments();

deployments.map((deployment) => await client.stopDeployment(deployment.name));
```
