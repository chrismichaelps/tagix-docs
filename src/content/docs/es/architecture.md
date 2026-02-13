---
category: Getting Started
alias: architecture
title: Arquitectura
description: Entiende el diseño interno de Tagix
order: 4
---

## Estructura del Store

El store es el componente central que gestiona el estado y los despachos:

```ts
class TagixStore<S extends { readonly _tag: string }> {
  // Estado actual (getter)
  readonly stateValue: S;

  // Metadatos del store
  readonly name: string;
  readonly registeredActions: readonly string[];

  // Operaciones principales
  dispatch(type: string, payload?: unknown): Promise<void> | void;
  subscribe(callback: (state: S) => void): () => void;
  fork(): TagixStore<S>;

  // Operaciones de consulta
  select<K extends keyof S>(key: K): S[K];
  isInState(tag: string): boolean;
  getState<T extends S["_tag"]>(tag: T): Extract<S, { _tag: T }> | null;
}
```

## Definición de Estado

El estado se define usando `taggedEnum`, que crea un tipo con variantes discriminadas:

```ts
const AppState = taggedEnum({
  Idle: {},
  Loading: { progress: number },
  Ready: { data: unknown },
  Error: { message: string },
});

// Crea:
// - Tipo AppState con propiedad _tag
// - Funciones constructoras (AppState.Idle(), etc.)
// - Tipo de unión de estado (AppState.State)
```

## Flujo de Acción

1. **Creación de Acción**: Define el tipo de acción, el payload y el manejador de estado
2. **Registro**: Registra la acción en el store
3. **Despacho (Dispatch)**: Llama a `store.dispatch(type, payload)`
4. **Middleware**: El middleware opcional intercepta la acción
5. **Ejecución**: El manejador de estado produce el nuevo estado
6. **Notificación**: Los suscriptores reciben el estado actualizado

```ts
const increment = createAction<{ amount: number }, State>("Increment")
  .withPayload({ amount: 1 })
  .withState((state, payload) => ({ ...state, value: state.value + payload.amount }));

store.register("Increment", increment);
store.dispatch("tagix/action/Increment", { amount: 5 });
```

## Patrones de Despacho

### Despacho Basado en Cadenas (String-Based)

```ts
store.dispatch("tagix/action/Increment", { amount: 5 });
```

### Despacho con Creador de Acciones

```ts
const increment = (amount: number) => createAction("Increment").withPayload({ amount });

store.dispatch(increment, { amount: 5 });
```

### Despacho Asíncrono

```ts
const fetchData = createAsyncAction("FetchData")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async () => await fetch("/api/data").then((r) => r.json()))
  .onSuccess((s, data) => ({ ...s, _tag: "Ready", data }));

await store.dispatch(fetchData);
```

## Cadena de Middleware

El middleware forma una cadena por la cual pasa cada acción:

```ts
const logging = () => (next) => (action) => {
  console.log(action.type);
  return next(action);
};

const store = createStore(initial, state, {
  middlewares: [logging, analytics, throttle],
});
```

## Forking

Crea copias aisladas del store para pruebas o ramas aisladas:

```ts
const mainStore = createStore(initialState, state);
const fork = mainStore.fork();

// Los cambios en el fork no afectan al mainStore
fork.dispatch("Action", payload);
```

## Siguientes Pasos

| Tópico                                            | Descripción                              |
| ------------------------------------------------- | ---------------------------------------- |
| [Definiciones de Estado](/docs/state-definitions) | Define el estado de tu aplicación        |
| [Acciones](/docs/actions)                         | Crea actualizaciones de estado síncronas |
