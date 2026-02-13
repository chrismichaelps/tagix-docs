---
category: Features
alias: error-handling
title: Manejo de Errores
description: Maneja errores en Tagix con estados y acciones estructuradas
order: 23
---

# Manejo de Errores

Maneja errores con estados de error estructurados en Tagix.

## Estados de Error

Define estados de error en tu definición de estado `taggedEnum`:

```ts
const ApiState = taggedEnum({
  Idle: {},
  Loading: {},
  Success: { data: unknown },
  Error: {
    code: string;
    message: string;
    retryable: boolean;
  },
});
```

## Manejadores de Error en Acciones

### Acciones Síncronas

Captura errores en acciones síncronas:

```ts
const riskyOperation = createAction<{ input: unknown }, ApiState>("Risky")
  .withPayload({ input: null })
  .withState((state, payload) => {
    try {
      const result = process(payload.input);
      return { ...state, _tag: "Success", data: result };
    } catch (error) {
      return {
        ...state,
        _tag: "Error",
        code: "PROCESSING_ERROR",
        message: error instanceof Error ? error.message : "Error desconocido",
        retryable: true,
      };
    }
  });
```

### Acciones Asíncronas

Maneja errores en acciones asíncronas con `.onError()`:

```ts
const fetchData = createAsyncAction<{ url: string }, ApiState, Data>("Fetch")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async (payload) => {
    const response = await fetch(payload.url);
    if (!response.ok) {
      throw new Error("La petición falló");
    }
    return response.json();
  })
  .onSuccess((s, data) => ({ ...s, _tag: "Success", data }))
  .onError((s, error) => ({
    ...s,
    _tag: "Error",
    code: "FETCH_ERROR",
    message: error instanceof Error ? error.message : "Error de red",
    retryable: true,
  }));
```

## Recuperación de Errores

### Lógica de Reintento

Implementa reintentos en los efectos de acciones asíncronas:

```ts
const fetchWithRetry = createAsyncAction<{ id: number }, ApiState, Data>("Fetch")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async (payload, { signal }) => {
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fetch(`/api/${payload.id}`, { signal });
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
    throw new Error("Máximo de reintentos excedido");
  })
  .onSuccess((s, data) => ({ ...s, _tag: "Success", data }))
  .onError((s, error) => ({
    ...s,
    _tag: "Error",
    code: "FETCH_ERROR",
    message: error.message,
    retryable: true,
  }));
```

### Acción de Reintento Manual

Despacha una acción de reintento cuando un error sea reintentable:

```ts
const retryFetch = createAction<void, ApiState>("Retry")
  .withPayload(undefined)
  .withState((s) => {
    if (s._tag !== "Error" || !s.retryable) return s;
    return { ...s, _tag: "Loading" };
  });

store.dispatch("tagix/action/Retry");
```

## Ver También

- [Acciones Asíncronas](/docs/async-actions) - Operaciones asíncronas con manejo de errores
- [Middleware](/docs/middleware) - Middleware para el registro de errores
- [Pruebas](/docs/testing) - Probando escenarios de error

## Próximos Pasos

| Tópico                                  | Descripción                              |
| --------------------------------------- | ---------------------------------------- |
| [Seguridad de Tipos](/docs/type-safety) | Aprovechar TypeScript para la corrección |
| [Pruebas](/docs/testing)                | Estrategias para probar tus aplicaciones |
