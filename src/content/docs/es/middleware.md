---
category: Features
alias: middleware
title: Middleware
description: Extiende el comportamiento del despacho con middleware
order: 21
---

# Middleware

## Conceptos Básicos de Middleware

Un middleware es una función que devuelve un manejador en cadena:

```ts
const loggerMiddleware = () => (next) => (action) => {
  console.log("Acción:", action.type, action.payload);
  return next(action);
};
```

## Estructura del Middleware

```ts
type Middleware<S> = (
  context: MiddlewareContext<S>
) => (
  next: (action: Action | AsyncAction) => boolean
) => (action: Action | AsyncAction) => boolean | void;
```

## Middleware Integrado

### Middleware de Registro (Logger)

Registra todas las acciones y cambios de estado:

```ts
import { createLoggerMiddleware } from "tagix";

const store = createStore(initial, state, {
  middlewares: [
    createLoggerMiddleware({
      collapsed: true, // Colapsar grupos de registro
      duration: true, // Mostrar tiempo de ejecución
      timestamp: true, // Incluir marca de tiempo
    }),
  ],
});
```

## Ejemplos de Middleware Personalizado

### Middleware de Analítica (Analytics)

Sigue las acciones del usuario:

```ts
const analyticsMiddleware = () => (next) => (action) => {
  if (action.type.startsWith("tagix/action/")) {
    // Enviar a analíticas
    trackEvent("action", {
      type: action.type,
      hasPayload: "payload" in action,
    });
  }
  return next(action);
};
```

### Middleware de Limitación (Throttle)

Limita la frecuencia de las acciones:

```ts
const throttleMiddleware = (ms: number) => {
  const lastCalls = new Map<string, number>();

  return () => (next) => (action) => {
    const now = Date.now();
    const last = lastCalls.get(action.type) ?? 0;

    if (now - last < ms) {
      return false; // Omitir acción
    }

    lastCalls.set(action.type, now);
    return next(action);
  };
};

const store = createStore(initial, state, {
  middlewares: [throttleMiddleware(1000)],
});
```

### Middleware de Autenticación

Adjunta tokens de autenticación a las peticiones:

```ts
const authMiddleware = (getToken: () => string | null) => () => (next) => (action) => {
  if (action.type === "tagix/action/APIRequest") {
    const token = getToken();
    if (token) {
      // Adjuntar token a la petición
      (action as any).payload.headers = {
        ...(action as any).payload.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return next(action);
};
```

### Middleware de Deshacer/Rehacer (Undo/Redo)

Implementa la funcionalidad de deshacer:

```ts
const createUndoMiddleware = () => {
  const history: unknown[] = [];

  return () => (next) => (action) => {
    if (action.type === "tagix/action/Undo") {
      const previous = history.pop();
      if (previous) {
        store.replaceState(previous);
      }
      return false;
    }

    // Guardar estado previo antes de la acción
    const previous = store.stateValue;
    const result = next(action);

    if (result !== false) {
      history.push(previous);
    }

    return result;
  };
};
```

### Middleware de Validación

Valida las acciones antes de procesarlas:

```ts
const validationMiddleware =
  (schemas: Record<string, (payload: unknown) => boolean>) => () => (next) => (action) => {
    const schema = schemas[action.type];
    if (schema && !schema(action.payload)) {
      console.warn("Payload de acción inválido:", action);
      return false; // Bloquear acción
    }
    return next(action);
  };
```

## Combinando Middleware

El orden del middleware es importante:

```ts
const store = createStore(initial, state, {
  middlewares: [
    // Primero: Registro (ve la acción original)
    createLoggerMiddleware(),

    // Segundo: Analíticas (ve la acción registrada)
    analyticsMiddleware(),

    // Tercero: Validación (valida la acción)
    validationMiddleware(schemas),

    // Cuarto: Limitación (aplica restricción de frecuencia)
    throttleMiddleware(1000),

    // Al final: El Store recibe la acción procesada
  ],
});
```

## Bloqueando Acciones

Devuelve `false` para bloquear una acción:

```ts
const blockingMiddleware = () => (next) => (action) => {
  if (action.type === "tagix/action/DeleteAll") {
    const confirm = window.confirm("¿Eliminar todo?");
    if (!confirm) return false;
  }
  return next(action);
};
```

Para acciones asíncronas, bloquear evita que el efecto se ejecute.

## Ver También

- [Acciones](/docs/actions) - Flujo de acciones
- [Acciones Asíncronas](/docs/async-actions) - Middleware asíncrono
- [Manejo de Errores](/docs/error-handling) - Middleware de errores

## Próximos Pasos

| Tópico                                    | Descripción                               |
| ----------------------------------------- | ----------------------------------------- |
| [Contexto](/docs/context)                 | Integración independiente del framework   |
| [Manejo de Errores](/docs/error-handling) | Manejar errores con estados estructurados |
