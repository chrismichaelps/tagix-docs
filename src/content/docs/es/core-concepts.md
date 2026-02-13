---
category: Getting Started
alias: core-concepts
title: Conceptos Básicos
description: Entiende los conceptos fundamentales que impulsan Tagix
order: 3
---

# Conceptos Básicos

Entiende los conceptos fundamentales que impulsan Tagix.

## Uniones Etiquetadas (Tagged Unions)

Tagix utiliza uniones etiquetadas (también conocidas como discriminated unions) para la representación del estado. Cada variante de estado lleva una propiedad `_tag` única que permite una comprobación exhaustiva de tipos:

```ts
const UserState = taggedEnum({
  Unauthenticated: {},
  Authenticating: { loading: true },
  Authenticated: { user: { id: number; name: string } },
  AuthError: { message: string },
});
```

El compilador asegura que todas las variantes sean manejadas:

```ts
function processUserState(state: UserStateType) {
  switch (state._tag) {
    case "Unauthenticated":
      return "Por favor, inicia sesión";
    case "Authenticating":
      return "Iniciando sesión...";
    case "Authenticated":
      return `Bienvenido, ${state.user.name}`;
    case "AuthError":
      return state.message;
    default:
      // TypeScript asegura que no existen otras variantes
      return assertNever(state);
  }
}
```

## Acciones

Las acciones son el mecanismo para las transiciones de estado. Una acción consta de:

1. **Identificador de tipo** - Una cadena única que identifica la acción
2. **Tipo de payload** - Datos opcionales pasados con la acción
3. **Manejador de estado** - Función que calcula el siguiente estado

```ts
const increment = createAction<{ amount: number }, State>("Increment")
  .withPayload({ amount: 1 })
  .withState((state, payload) => ({
    ...state,
    value: state.value + payload.amount,
  }));
```

## Stores

Un store es el contenedor de estado central que:

- Mantiene el valor del estado actual
- Gestiona el registro de acciones
- Maneja la lógica de despacho (dispatch)
- Notifica a los suscriptores sobre los cambios

```ts
const store = createStore(initialState, stateDefinition, {
  name: "MyStore",
  middleware: [logger],
});
```

## Suscriptores

Los componentes pueden suscribirse a los cambios de estado:

```ts
const unsubscribe = store.subscribe((state) => {
  // Se llama en cada cambio de estado
});

unsubscribe(); // Limpieza (Cleanup)
```

## Middleware

El middleware extiende el comportamiento del despacho interceptando las acciones:

```ts
const loggerMiddleware = () => (next) => (action) => {
  console.log("Acción:", action.type);
  return next(action);
};
```

## Inferencia de Tipos

Tagix proporciona una inferencia de tipos completa a través de la definición de estado:

```ts
const CounterState = taggedEnum({
  Idle: { value: 0 },
  Ready: { value: 0 },
});

// El tipo se infiere automáticamente como:
// { readonly _tag: "Idle"; readonly value: 0 } | { readonly _tag: "Ready"; readonly value: 0 }
const state = CounterState.Idle({ value: 0 });
```

## Principios Clave

1. **Estado Primero** - Define el estado antes de las acciones
2. **Transiciones Explícitas** - Cada cambio de estado pasa por acciones
3. **Seguridad de Tipos** - Deja que TypeScript garantice la corrección
4. **Arquitectura Agnóstica** - Funciona con cualquier librería de UI
5. **Funcional** - Actualizaciones inmutables, funciones puras

## Próximos Pasos

| Tópico                                            | Descripción                       |
| ------------------------------------------------- | --------------------------------- |
| [Arquitectura](/docs/architecture)                | Entiende el diseño interno        |
| [Definiciones de Estado](/docs/state-definitions) | Define el estado de tu aplicación |
