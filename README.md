<img src="https://github.com/krane/krane/blob/main/docs/assets/krane-wordmark.png?raw=true" width="350">

> Common modules written in Typescript to interface with [Krane](https://github.com/krane/krane)

[![npm version](https://badge.fury.io/js/%40krane%2Fcommon.svg)](https://badge.fury.io/js/%40krane%2Fcommon)

## Install

```
npm i @krane/common
```

## Examples

```typescript
import { KraneClient } from "@krane/common";

// Create an authenticated client to interface with a Krane instance
const client = new KraneClient("https://krane.example.com", "Bearer ...");

// Get all deployments
const deployments = client.getDeployments();

// Restart all deployments
for (const deployment of deployments) {
  await client.restartDeployment(deployment.name)
}
```
