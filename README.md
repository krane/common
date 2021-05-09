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

// Create an authenticated client to interface with the Krane API
const client = new KraneClient("http://example.com", "Bearer ...");

// Get all deployments
const deployments = client.getDeployments();

// Restart all deployments
for (const deployment of deployments) {
  await client.restartDeployment(deployment.name)
}
```
