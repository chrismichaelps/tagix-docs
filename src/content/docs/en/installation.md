---
category: Getting Started
alias: installation
title: Installation & Setup
description: Learn how to install Tagix and configure your TypeScript project
order: 1
---

# Installation

Get started with Tagix in your TypeScript project.

## Package Managers

Install Tagix using your preferred package manager:

### npm

```bash
npm install tagix
```

### pnpm

```bash
pnpm add tagix
```

### yarn

```bash
yarn add tagix
```

### bun

```bash
bun add tagix
```

## Requirements

- **TypeScript**: 5.0 or higher
- **Node.js**: 23.3.0 or higher (for development)

## TypeScript Configuration

Tagix requires strict TypeScript settings for full type safety. Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## Basic Setup

Create your first store:

```ts
import { createStore, taggedEnum } from "tagix";

// Define your state
const AppState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { data: "" },
  Error: { message: "" },
});

// Create the store
const store = createStore(AppState.Idle({}), AppState, {
  name: "App",
});

export { store, AppState };
```

## Next Steps

| Topic                                | Description                  |
| ------------------------------------ | ---------------------------- |
| [Quick Start](/docs/quick-start)     | Build your first application |
| [Core Concepts](/docs/core-concepts) | Understand the fundamentals  |
