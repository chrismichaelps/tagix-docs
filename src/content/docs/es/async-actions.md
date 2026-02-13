---
category: State Management
alias: async-actions
title: Acciones Asíncronas
description: Maneja operaciones asíncronas con efectos y manejadores de éxito y error
order: 12
---

# Acciones Asíncronas

Maneja operaciones asíncronas con efectos y manejadores de éxito (success) y error.

## Creando Acciones Asíncronas

Usa `createAsyncAction` para operaciones que involucran promesas:

```ts
import { createAsyncAction } from "tagix";

const fetchUser = createAsyncAction<{ id: number }, UserState, User>("FetchUser")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async (payload) => {
    const response = await fetch(`/api/users/${payload.id}`);
    if (!response.ok) throw new Error("Usuario no encontrado");
    return response.json();
  })
  .onSuccess((s, user) => ({ ...s, _tag: "Loaded", user }))
  .onError((s, error) => ({ ...s, _tag: "Error", message: error.message }));
```

## Componentes

### Manejador de Estado (State Handler)

La transición de estado inicial cuando comienza la acción:

```ts
.state((currentState) => ({
  ...currentState,
  _tag: "Loading",
}))
```

### Manejador de Efecto (Effect Handler)

La operación asíncrona propiamente dicha:

```ts
.effect(async (payload) => {
  const result = await someAsyncOperation(payload);
  return result; // Este se convierte en el payload de éxito
})
```

### Manejador onSuccess

Se llama cuando el efecto se resuelve:

```ts
.onSuccess((currentState, result) => ({
  ...currentState,
  _tag: "Ready",
  data: result,
}))
```

### Manejador onError

Se llama cuando el efecto es rechazado:

```ts
.onError((currentState, error) => ({
  ...currentState,
  _tag: "Error",
  message: error instanceof Error ? error.message : "Error desconocido",
}))
```

## Ejemplo Completo

```ts
const fetchPosts = createAsyncAction<void, PostsState, Post[]>("FetchPosts")
  .state(() => PostsState.Loading({}))
  .effect(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Error al obtener los datos");
    return response.json();
  })
  .onSuccess((_, posts) => PostsState.Loaded({ posts }))
  .onError((_, error) => PostsState.Error({ message: error.message }));

store.register("FetchPosts", fetchPosts);

// Despachar acción asíncrona
await store.dispatch(fetchPosts);
```

## Despachando Acciones Asíncronas

Las acciones asíncronas devuelven promesas:

```ts
// Esperar el resultado
await store.dispatch(fetchUser, { id: 1 });

// Manejar errores
try {
  await store.dispatch(fetchUser, { id: 999 });
} catch (error) {
  console.error("La acción falló:", error);
}
```

## Manejo de Errores

### Errores Estructurados

Define tipos de error en tu estado:

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

### Lógica de Reintento

Implementa reintentos en el efecto:

```ts
const fetchWithRetry = createAsyncAction<{ id: number }, State, Data>("Fetch")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async (payload, { signal }) => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await fetchWithSignal(`/api/${payload.id}`, signal);
      } catch (error) {
        if (attempt === 2) throw error;
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
    throw new Error("Máximo de reintentos excedido");
  })
  .onSuccess((s, data) => ({ ...s, _tag: "Success", data }))
  .onError((s, error) => ({ ...s, _tag: "Error", message: error.message, retryable: true }));
```

## Cancelando Acciones

Usa `AbortSignal` para la cancelación:

```ts
const fetchData = createAsyncAction<{ id: number }, State, Data>("Fetch")
  .state((s) => ({ ...s, _tag: "Loading" }))
  .effect(async (payload, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort());

    const response = await fetch(`/api/${payload.id}`, {
      signal: controller.signal,
    });
    return response.json();
  })
  .onSuccess((s, data) => ({ ...s, _tag: "Success", data }))
  .onError((s, error) => ({ ...s, _tag: "Error", message: error.message }));
```

## Acciones Concurrentes

Se pueden ejecutar múltiples acciones asíncronas de forma concurrente:

```ts
await Promise.all([
  store.dispatch(fetchUser, { id: 1 }),
  store.dispatch(fetchPosts),
  store.dispatch(fetchNotifications),
]);
```

## Seguimiento del Progreso

Sigue el progreso de cargas o descargas:

```ts
const uploadFile = createAsyncAction<{ file: File }, UploadState, UploadResult>("UploadFile")
  .state((s) => ({ ...s, _tag: "Uploading", progress: 0 }))
  .effect(async (payload, { signal }) => {
    const formData = new FormData();
    formData.append("file", payload.file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formBody,
      signal,
    });

    return response.json();
  })
  .onSuccess((s, result) => ({ ...s, _tag: "Complete", result }))
  .onError((s, error) => ({ ...s, _tag: "Failed", error: error.message }));
```

## Ver También

- [Acciones](/docs/actions) - Acciones síncronas
- [Manejo de Errores](/docs/error-handling) - Patrones de error
- [Middleware](/docs/middleware) - Middleware de peticiones

## Próximos Pasos

| Tópico                                 | Descripción                         |
| -------------------------------------- | ----------------------------------- |
| [State Machines](/docs/state-machines) | Modelar transiciones de estado      |
| [Selectors](/docs/selectors)           | Extraer y derivar valores de estado |
