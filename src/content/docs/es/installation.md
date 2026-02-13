---
category: Getting Started
alias: installation
title: Instalación y Configuración
description: Aprende cómo instalar Tagix y configurar tu proyecto TypeScript
order: 1
---

# Instalación

Comienza a usar Tagix en tu proyecto TypeScript.

## Gestores de Paquetes

Instala Tagix usando tu gestor de paquetes preferido:

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

## Requisitos

- **TypeScript**: 5.0 o superior
- **Node.js**: 23.3.0 o superior (para desarrollo)

## Configuración de TypeScript

Tagix requiere configuraciones estrictas de TypeScript para una seguridad de tipos completa. Asegúrate de que tu `tsconfig.json` incluya:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## Configuración Básica

Crea tu primer store:

```ts
import { createStore, taggedEnum } from "tagix";

// Define tu estado
const AppState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { data: "" },
  Error: { message: "" },
});

// Crea el store
const store = createStore(AppState.Idle({}), AppState, {
  name: "App",
});

export { store, AppState };
```

## Próximos Pasos

| Tópico                                   | Descripción                     |
| ---------------------------------------- | ------------------------------- |
| [Inicio Rápido](/docs/quick-start)       | Construye tu primera aplicación |
| [Conceptos Básicos](/docs/core-concepts) | Entiende los fundamentos        |
