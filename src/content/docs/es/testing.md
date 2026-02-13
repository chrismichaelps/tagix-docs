---
category: Advanced
alias: testing
title: Pruebas
description: Estrategias para probar aplicaciones con Tagix
order: 41
---

# Pruebas

## Pruebas Unitarias de Acciones

Prueba las acciones de forma aislada:

```ts
import { describe, it, expect } from "vitest";
import { createAction } from "tagix";

const CounterState = taggedEnum({
  Idle: { value: 0 },
  Ready: { value: 0 },
});

const increment = createAction<{ amount: number }, typeof CounterState.State>("Increment")
  .withPayload({ amount: 1 })
  .withState((s, p) => ({
    ...s,
    value: s.value + p.amount,
  }));

describe("Acciones", () => {
  it("debería incrementar el valor", () => {
    const state = CounterState.Idle({ value: 0 });
    const nextState = increment.handler(state, { amount: 5 });
    expect(nextState.value).toBe(5);
  });

  it("debería manejar cantidades negativas", () => {
    const state = CounterState.Ready({ value: 10 });
    const nextState = increment.handler(state, { amount: -3 });
    expect(nextState.value).toBe(7);
  });
});
```

## Probando Stores

```ts
describe("Store", () => {
  it("debería despachar una acción", () => {
    const store = createStore(CounterState.Idle({ value: 0 }), CounterState);

    store.register("Increment", increment);
    store.dispatch("tagix/action/Increment", { amount: 5 });

    const state = store.stateValue as Extract<typeof CounterState.State, { _tag: "Ready" }>;
    expect(state.value).toBe(5);
  });

  it("debería notificar a los suscriptores", () => {
    const store = createStore(CounterState.Idle({ value: 0 }), CounterState);

    let callCount = 0;
    const unsubscribe = store.subscribe(() => {
      callCount++;
    });

    store.dispatch("tagix/action/Increment", { amount: 1 });
    expect(callCount).toBe(1);

    unsubscribe();
    store.dispatch("tagix/action/Increment", { amount: 1 });
    expect(callCount).toBe(1);
  });
});
```

## Probando Acciones Asíncronas

```ts
describe("Acciones Asíncronas", () => {
  it("debería manejar el flujo asíncrono", async () => {
    const store = createStore(CounterState.Idle({ value: 0 }), CounterState);

    const asyncIncrement = createAsyncAction<{ amount: number }, typeof CounterState.State, number>(
      "AsyncIncrement"
    )
      .state((s) => ({ ...s, _tag: "Ready" }))
      .effect(async (p) => {
        await new Promise((r) => setTimeout(r, 10));
        return p.amount;
      })
      .onSuccess((s, result) => ({ ...s, value: result }));

    store.register("AsyncIncrement", asyncIncrement);

    await store.dispatch(asyncIncrement, { amount: 42 });

    const state = store.stateValue as Extract<typeof CounterState.State, { _tag: "Ready" }>;
    expect(state.value).toBe(42);
  });

  it("debería manejar errores", async () => {
    const store = createStore(CounterState.Idle({ value: 0 }), CounterState);

    const failingAction = createAsyncAction<void, typeof CounterState.State, never>("Failing")
      .state((s) => ({ ...s, _tag: "Ready" }))
      .effect(async () => {
        throw new Error("Error de prueba");
      })
      .onSuccess((s) => s)
      .onError((s, error) => ({ ...s, _tag: "Idle" }));

    store.register("Failing", failingAction);
    await store.dispatch(failingAction);

    expect(store.stateValue._tag).toBe("Idle");
  });
});
```

## Bifurcando (Forking) para Pruebas

Aísla tus pruebas con bifurcaciones:

```ts
describe("Pruebas de Bifurcación", () => {
  it("no debería afectar al store principal", () => {
    const mainStore = createStore(CounterState.Idle({ value: 0 }), CounterState);

    const fork = mainStore.fork();

    // Modificar la bifurcación
    fork.dispatch("tagix/action/Increment", { amount: 100 });

    // Verificar que la bifurcación cambió
    const forkState = fork.stateValue;
    expect(forkState.value).toBe(100);

    // Verificar que el store principal no cambió
    const mainState = mainStore.stateValue;
    expect(mainState.value).toBe(0);
  });
});
```

## Probando Selectores

```ts
describe("Selectores", () => {
  const selectors = {
    getValue: (state: typeof CounterState.State) => (state._tag === "Ready" ? state.value : 0),
  };

  it("debería extraer el valor del estado Ready", () => {
    const state = CounterState.Ready({ value: 42 });
    expect(selectors.getValue(state)).toBe(42);
  });

  it("debería devolver 0 para el estado Idle", () => {
    const state = CounterState.Idle({ value: 0 });
    expect(selectors.getValue(state)).toBe(0);
  });
});
```

## Pruebas de Integración

```ts
describe("Integración", () => {
  it("debería manejar un flujo de trabajo completo", async () => {
    const store = createStore(CounterState.Idle({ value: 0 }), CounterState);

    store.register("Increment", increment);

    // Estado inicial
    expect(store.stateValue.value).toBe(0);

    // Despachar múltiples acciones
    store.dispatch("tagix/action/Increment", { amount: 5 });
    expect(store.stateValue.value).toBe(5);

    store.dispatch("tagix/action/Increment", { amount: 3 });
    expect(store.stateValue.value).toBe(8);

    // Suscribirse y verificar
    const states: number[] = [];
    const unsubscribe = store.subscribe((s) => {
      if (s._tag === "Ready") states.push(s.value);
    });

    store.dispatch("tagix/action/Increment", { amount: 2 });
    expect(states).toContain(10);

    unsubscribe();
  });
});
```

## Simulando (Mocking) Dependencias

```ts
describe("Con Simulaciones (Mocks)", () => {
  it("debería usar una API simulada", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ json: () => ({ id: 1, name: "Test" }) });

    const fetchUser = createAsyncAction<{ id: number }, UserState, User>("Fetch")
      .state((s) => ({ ...s, _tag: "Loading" }))
      .effect(async (p) => {
        const response = await mockFetch(`/api/users/${p.id}`);
        return response.json();
      })
      .onSuccess((s, user) => ({ ...s, _tag: "Loaded", user }))
      .onError((s, error) => ({ ...s, _tag: "Error", message: error.message }));

    const store = createStore(UserState.Idle({}), UserState);
    store.register("Fetch", fetchUser);

    await store.dispatch(fetchUser, { id: 1 });

    expect(mockFetch).toHaveBeenCalledWith("/api/users/1");
  });
});
```

## Ver También

- [Definiciones de Estado](/docs/state-definitions) - Estado para pruebas
- [Acciones](/docs/actions) - Probando acciones
- [Acciones Asíncronas](/docs/async-actions) - Probando flujos asíncronos

## Próximos Pasos

¡Felicidades! Has completado la documentación de Tagix. Para más recursos:

| Recurso                                                          | Descripción                                               |
| :--------------------------------------------------------------- | :-------------------------------------------------------- |
| [Repositorio en GitHub](https://github.com/chrismichaelps/tagix) | Accede al código fuente, reporta problemas y participa    |
| [Instalación](/docs/installation)                                | Revisa la guía de configuración para verificar tu entorno |
| [Primeros Pasos](/docs/quick-start)                              | Construye tu primera aplicación y experimenta             |
