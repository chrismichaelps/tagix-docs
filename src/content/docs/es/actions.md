---
category: State Management
alias: actions
title: Acciones
description: Creadores de acciones síncronas para actualizaciones de estado
order: 11
---

# Acciones

Creadores de acciones síncronas para actualizaciones de estado.

## Creación de Acciones

Usa `createAction` para definir acciones con payloads seguros para tipos y transiciones de estado:

```ts
import { createAction } from "tagix";

const increment = createAction<{ amount: number }, CounterState>("Increment")
  .withPayload({ amount: 1 })
  .withState((state, payload) => ({
    ...state,
    value: state.value + payload.amount,
  }));
```

## Componentes de la Acción

### Identificador de Tipo

El primer parámetro es un tipo de acción único:

```ts
const action = createAction<Payload, State>("MyAction");
// El tipo de acción se convierte en: "tagix/action/MyAction"
```

### Tipo de Payload

Define la forma de los datos pasados con la acción:

```ts
// Sin payload
const reset = createAction<void, State>("Reset")
  .withPayload(undefined)
  .withState(() => initialState);

// Con payload
const setValue = createAction<{ value: number }, State>("SetValue")
  .withPayload({ value: 0 })
  .withState((state, payload) => ({ ...state, value: payload.value }));
```

### Manejador de Estado

El método `withState` define cómo cambia el estado:

```ts
const increment = createAction<{ amount: number }, State>("Increment")
  .withPayload({ amount: 1 })
  .withState((currentState, payload) => {
    // Retorna el nuevo estado
    return {
      ...currentState,
      value: currentState.value + payload.amount,
    };
  });
```

## Registro de Acciones

Las acciones deben registrarse en el store:

```ts
const store = createStore(initialState, state);

store.register("Increment", increment);
store.register("Decrement", decrement);
store.register("Reset", reset);
```

## Despacho de Acciones

### Despacho Basado en Cadenas (String-Based)

```ts
store.dispatch("tagix/action/Increment", { amount: 5 });
```

### Despacho con Creador de Acciones

Pasa el creador de acciones directamente:

```ts
// Acción directa
store.dispatch(increment, { amount: 5 });

// Creador de acciones currificado
const incrementBy = (amount: number) => increment;
store.dispatch(incrementBy, { amount: 10 });
```

### Patrón del Creador de Acciones

Define creadores de acciones reutilizables:

```ts
const createIncrement = (defaultAmount: number) =>
  createAction<{ amount: number }, State>("Increment")
    .withPayload({ amount: defaultAmount })
    .withState((state, payload) => ({
      ...state,
      value: state.value + payload.amount,
    }));

const incrementBy5 = createIncrement(5);
store.dispatch(incrementBy5);
```

## Transiciones de Estado Condicionales

Los manejadores de estado pueden devolver condicionalmente diferentes estados:

```ts
const updateUser = createAction<{ name: string }, UserState>("UpdateUser")
  .withPayload({ name: "" })
  .withState((state, payload) => {
    if (state._tag !== "Authenticated") {
      return state; // Sin cambios
    }
    return {
      ...state,
      user: { ...state.user, name: payload.name },
    };
  });
```

## Múltiples Acciones

Maneja múltiples acciones secuenciales:

```ts
const add = createAction<{ n: number }, CounterState>("Add")
  .withPayload({ n: 10 })
  .withState((s, p) => ({ ...s, value: s.value + p.n }));

const multiply = createAction<{ n: number }, CounterState>("Multiply")
  .withPayload({ n: 2 })
  .withState((s, p) => ({ ...s, value: s.value * p.n }));

store.register("Add", add);
store.register("Multiply", multiply);

store.dispatch("tagix/action/Add", { n: 10 });
store.dispatch("tagix/action/Multiply", { n: 2 });
// Resultado: value = 20
```

## Manejo de Errores

Las acciones lanzan errores para tipos no registrados:

```ts
try {
  store.dispatch("tagix/action/Unknown", {});
} catch (error) {
  if (error instanceof ActionNotFoundError) {
    console.log("Acción no registrada");
  }
}
```

## Buenas Prácticas

### Una Acción, Una Responsabilidad

Cada acción debe manejar una única actualización lógica:

```ts
// Bien - acciones enfocadas
const setUser = createAction<{ user: User }, State>("SetUser").withState((s, p) => ({
  ...s,
  user: p.user,
}));

const clearUser = createAction<void, State>("ClearUser").withState((s) => ({ ...s, user: null }));

// Evitar - demasiadas preocupaciones
const setUserAndClearCacheAndNotify = createAction<{ user: User }, State>("Everything").withState(
  (s, p) => {
    // Actualización compleja
  }
);
```

### Nombres de Acción Descriptivos

Usa nombres de acción claros y descriptivos:

```ts
// Bien
const markTodoComplete = createAction<{ id: number }, State>("MarkTodoComplete").withState(
  (s, p) => ({ ...s, todos: s.todos.map((t) => (t.id === p.id ? { ...t, complete: true } : t)) })
);

// Evitar
const doit = createAction<{ id: number }, State>("Doit");
```

## Ver También

- [Acciones Asíncronas](/docs/async-actions) - Manejo de operaciones asíncronas
- [Definiciones de Estado](/docs/state-definitions) - Estructura del estado
- [Middleware](/docs/middleware) - Extensión del comportamiento del despacho

## Próximos Pasos

| Tópico                                     | Descripción                   |
| ------------------------------------------ | ----------------------------- |
| [Acciones Asíncronas](/docs/async-actions) | Maneja operaciones asíncronas |
| [Máquinas de Estado](/docs/state-machines) | Modela transiciones de estado |
