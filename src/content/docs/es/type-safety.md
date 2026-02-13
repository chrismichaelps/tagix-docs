---
category: Advanced
alias: type-safety
title: Seguridad de Tipos
description: Aprovecha TypeScript para la corrección en tiempo de compilación
order: 40
---

# Seguridad de Tipos

Aprovecha TypeScript para garantizar la corrección de tu código en tiempo de compilación.

## Inferencia

Tagix proporciona una inferencia de tipos completa a partir de las definiciones de estado:

```ts
const CounterState = taggedEnum({
  Idle: { value: 0 },
  Loading: {},
  Ready: { value: 0 },
  Error: { message: "" },
});

// Todos los tipos se infieren automáticamente
const initial = CounterState.Idle({ value: 0 });
// Tipo: { readonly _tag: "Idle"; readonly value: 0 }

type CounterType = typeof CounterState.State;
// Tipo: { readonly _tag: "Idle"; readonly value: 0 } |
//        { readonly _tag: "Loading" } |
//        { readonly _tag: "Ready"; readonly value: 0 } |
//        { readonly _tag: "Error"; readonly message: string }
```

## Apareamiento de Patrones Exhaustivo

TypeScript obliga a manejar todas las variantes de estado:

```ts
function processState(state: CounterType) {
  switch (state._tag) {
    case "Idle":
      return state.value; // number
    case "Loading":
      return "Cargando..."; // string
    case "Ready":
      return state.value; // number
    case "Error":
      return state.message; // string
    default:
      // TypeScript asegura que esto sea inalcanzable
      return assertNever(state);
  }
}
```

## Patrón Extract

Obtén tipos de variantes específicas:

```ts
import { Extract } from "tagix";

type ReadyState = Extract<CounterType, { _tag: "Ready" }>;
// ReadyState: { readonly _tag: "Ready"; readonly value: 0 }

const ready: ReadyState = CounterState.Ready({ value: 10 });
```

## Genéricos en Acciones

Los tipos de payload de las acciones son inferidos:

```ts
const increment = createAction<{ amount: number }, CounterType>("Increment")
  .withPayload({ amount: 1 })
  .withState((s, p) => ({ ...s, value: s.value + p.amount }));

// TypeScript sabe:
// - Tipo del Payload: { amount: number }
// - Tipo del Estado: CounterType
// - Tipo de la Acción: "tagix/action/Increment"
```

## Tipos en Acciones Asíncronas

Las acciones asíncronas infieren los tipos de éxito y error:

```ts
const fetchUser = createAsyncAction<{ id: number }, UserState, User>("Fetch")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async (payload) => {
    const response = await fetch(`/api/users/${payload.id}`);
    return response.json(); // Se infiere como User
  })
  .onSuccess((s, user) => ({ ...s, _tag: "Loaded", user }))
  .onError((s, error) => ({ ...s, _tag: "Error", message: error.message }));

// Tipos:
// - Payload: { id: number }
// - Resultado exitoso: User
// - Estado: UserState
```

## Reducción con Guardias (Guards)

Crea guardias de tipos para las variantes de estado:

```ts
const isReady = (state: CounterType): state is Extract<CounterType, { _tag: "Ready" }> => {
  return state._tag === "Ready";
};

const isError = (state: CounterType): state is Extract<CounterType, { _tag: "Error" }> => {
  return state._tag === "Error";
};

// Uso
if (isReady(state)) {
  // TypeScript sabe que el estado es la variante Ready
  console.log(state.value);
}
```

## Acciones Genéricas

Crea fábricas de acciones reutilizables:

```ts
const createCounterActions = <T extends { value: number }>(initialValue: T["value"]) => {
  const initialState = taggedEnum({
    Idle: { value: initialValue },
    Ready: { value: initialValue },
  }) as { State: T };

  const increment = createAction<{ amount: number }, T["State"]>("Increment")
    .withPayload({ amount: 1 })
    .withState((s, p) => ({
      ...s,
      value: s.value + p.amount,
    }));

  return {
    state: initialState,
    increment,
  };
};

const counter = createCounterActions(0);
```

## Aserciones de Tipo

Usa aserciones de tipo con moderación y solo cuando sea necesario:

```ts
const state = store.stateValue as Extract<CounterType, { _tag: "Ready" }>;
```

## Mejores Prácticas

### Deja que los Tipos Fluyan

Evita las anotaciones de tipo manuales cuando la inferencia funcione:

```ts
// Bien - tipos inferidos
const store = createStore(CounterState.Idle({ value: 0 }), CounterState);

// Mal - anotación redundante
const store = createStore<CounterType>(CounterState.Idle({ value: 0 }), CounterState);
```

### Usa Extract para las Variantes

Accede a las variantes de estado específicas de forma limpia:

```ts
// Bien
type LoadedState = Extract<State, { _tag: "Loaded" }>;

// Evitar - frágil
const state = store.getState("Loaded") as { data: unknown };
```

### Comprobación de Exhaustividad

Deja que TypeScript detecte casos faltantes:

```ts
function handleState(state: State) {
  switch (state._tag) {
    case "A":
      return handleA(state);
    case "B":
      return handleB(state);
    // Caso C faltante
    default:
      return assertNever(state);
  }
}
```

## Ver También

- [Definiciones de Estado](/docs/state-definitions) - Estado seguro para tipos
- [Acciones](/docs/actions) - Acciones seguras para tipos
- [Acciones Asíncronas](/docs/async-actions) - Operaciones asíncronas seguras para tipos

## Próximos Pasos

| Tópico                   | Descripción                              |
| ------------------------ | ---------------------------------------- |
| [Pruebas](/docs/testing) | Estrategias para probar tus aplicaciones |
