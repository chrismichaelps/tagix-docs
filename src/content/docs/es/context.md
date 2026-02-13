---
category: Features
alias: context
title: Contexto
description: Integración de Store independiente del framework
order: 22
---

# Contexto

## Contexto del Store

El store proporciona métodos para integrarse con cualquier framework:

```ts
const store = createStore(initialState, state, { name: "App" });

// Suscribirse a los cambios
const unsubscribe = store.subscribe((state) => {
  console.log("El estado cambió:", state);
});

// Despachar acciones
store.dispatch("ActionType", payload);

// Consultar el estado
const isReady = store.isInState("Ready");
const readyState = store.getState("Ready");
const value = store.select("property");
```

## Integración con Frameworks

### Integración Directa

Accede al store directamente en tus componentes:

```ts
// En cualquier componente
const store = getStoreFromContext(); // Específico del framework

// Suscribirse
const unsubscribe = store.subscribe((state) => {
  // Actualizar la interfaz basada en el estado
});

// Despachar
store.dispatch("action", payload);

// Limpieza
unsubscribe();
```

### Integración Reactiva

Crea envoltorios (wrappers) reactivos:

```ts
// Gestor de suscripciones vanilla
const createSubscriber = (store) => {
  const listeners = new Set();

  const unsubscribe = store.subscribe((state) => {
    listeners.forEach((fn) => fn(state));
  });

  return {
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    dispatch: store.dispatch,
    select: store.select,
  };
};
```

### Selectores en Componentes

Deriva valores calculados:

```ts
const createSelector = (store, selector) => {
  let current = selector(store.stateValue);

  store.subscribe(() => {
    const next = selector(store.stateValue);
    if (next !== current) {
      current = next;
      notifyListeners();
    }
  });

  return () => current;
};
```

## Patrones de Acceso al Store

### Patrón Singleton

Un único store para toda la aplicación:

```ts
// store.ts
export const store = createStore(initialState, state);

// En otro lugar
import { store } from "./store";
store.dispatch("action", payload);
```

### Patrón de Contexto

Proveer el store a través de un contexto:

```ts
// Creación de contexto (independiente del framework)
const TagixContext = {
  Provider: (store, children) => children,
  Consumer: (store, render) => render(store),
};
```

### Inyección de Dependencias

Inyectar el store en los componentes:

```ts
interface AppServices {
  store: TagixStore<State>;
  logger: Logger;
}

const createServices = (): AppServices => ({
  store: createStore(initialState, state),
  logger: new Logger(),
});

// Inyectar donde sea necesario
const service = createServices();
```

## Múltiples Stores

Combina múltiples stores:

```ts
const authStore = createStore(authInitial, authState);
const dataStore = createStore(dataInitial, dataState);
const uiStore = createStore(uiInitial, uiState);

// Combinar en un padre
const rootState = taggedEnum({
  Auth: authStore.stateValue,
  Data: dataStore.stateValue,
  UI: uiStore.stateValue,
});
```

## Bifurcando (Forking) Stores

Crea copias aisladas para pruebas:

```ts
const mainStore = createStore(initialState, state);

// Crear una bifurcación
const testStore = mainStore.fork();

// Probar acciones
testStore.dispatch("action", payload);

// Verificar
expect(testStore.stateValue).toMatchObject({
  /* esperado */
});

// El store original permanece inalterado
expect(mainStore.stateValue).toBe(originalState);
```

## Limpieza

Siempre limpia las suscripciones:

```ts
// Bien
const unsubscribe = store.subscribe(handler);
return () => unsubscribe();

// Mal - fuga de memoria
store.subscribe(handler);
// Sin limpieza
```

## Próximos Pasos

| Tópico                                    | Descripción                               |
| ----------------------------------------- | ----------------------------------------- |
| [Manejo de Errores](/docs/error-handling) | Manejar errores con estados estructurados |
| [Seguridad de Tipos](/docs/type-safety)   | Aprovechar TypeScript para la corrección  |
