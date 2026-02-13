---
category: Getting Started
alias: quick-start
title: Inicio Rápido
description: Construye tu primera aplicación Tagix en menos de cinco minutos
order: 2
---

# Inicio Rápido

Construye tu primera aplicación Tagix en menos de cinco minutos.

## Paso 1: Definir el Estado

El estado en Tagix debe definirse como uniones discriminadas usando `taggedEnum`:

```ts
import { taggedEnum } from "tagix";

const CounterState = taggedEnum({
  Idle: { value: 0 },
  Loading: {},
  Ready: { value: 0 },
  Error: { message: "" },
});

type CounterStateType = typeof CounterState.State;
```

La función `taggedEnum` crea:

- Un tipo con una propiedad `_tag` para la discriminación
- Funciones constructoras para cada variante de estado
- Un tipo de unión `State` de todas las variantes

## Paso 2: Crear el Store

Instancia un store con tu estado inicial:

```ts
import { createStore } from "tagix";

const store = createStore(CounterState.Idle({ value: 0 }), CounterState, { name: "Counter" });
```

## Paso 3: Crear Acciones

Las acciones definen las transiciones de estado. Usa `createAction` para actualizaciones síncronas:

```ts
import { createAction } from "tagix";

const increment = createAction<{ amount: number }, CounterStateType>("Increment")
  .withPayload({ amount: 1 })
  .withState((state, payload) => ({
    ...state,
    value: state.value + payload.amount,
  }));

const reset = createAction<void, CounterStateType>("Reset")
  .withPayload(undefined)
  .withState(() => CounterState.Idle({ value: 0 }));
```

## Paso 4: Registrar Acciones

Las acciones deben registrarse en el store antes de su uso:

```ts
store.register("Increment", increment);
store.register("Reset", reset);
```

## Paso 5: Despachar Acciones

Activa cambios de estado a través de dispatch:

```ts
// Despacho síncrono
store.dispatch("tagix/action/Increment", { amount: 5 });

// Verificar el estado actual
console.log(store.stateValue._tag); // "Ready"
console.log((store.stateValue as Extract<CounterStateType, { _tag: "Ready" }>).value); // 5
```

## Paso 6: Suscribirse a los Cambios

Escucha las actualizaciones de estado:

```ts
const unsubscribe = store.subscribe((state) => {
  console.log("Estado cambiado:", state._tag);
});

// Más tarde, deja de escuchar
unsubscribe();
```

## Ejemplo Completo

```ts
import { createStore, createAction, taggedEnum } from "tagix";

const CounterState = taggedEnum({
  Idle: { value: 0 },
  Loading: {},
  Ready: { value: 0 },
  Error: { message: "" },
});

type CounterStateType = typeof CounterState.State;

const store = createStore(CounterState.Idle({ value: 0 }), CounterState, {
  name: "Counter",
});

const increment = createAction<{ amount: number }, CounterStateType>("Increment")
  .withPayload({ amount: 1 })
  .withState((state, payload) => ({
    ...state,
    value: state.value + payload.amount,
  }));

store.register("Increment", increment);

store.subscribe((state) => {
  if (state._tag === "Ready") {
    console.log("Valor:", state.value);
  }
});

store.dispatch("tagix/action/Increment", { amount: 10 });
// Resultado: Valor: 10
```

## Próximos Pasos

| Tópico                                     | Descripción                          |
| ------------------------------------------ | ------------------------------------ |
| [Conceptos Básicos](/docs/core-concepts)   | Entiende los conceptos fundamentales |
| [Acciones](/docs/actions)                  | Aprende sobre acciones síncronas     |
| [Acciones Asíncronas](/docs/async-actions) | Maneja operaciones asíncronas        |
