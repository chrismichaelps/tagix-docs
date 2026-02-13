---
category: State Management
alias: state-definitions
title: Definiciones de Estado
description: Define el estado de tu aplicación usando uniones etiquetadas
order: 10
---

# Definiciones de Estado

Define el estado de tu aplicación usando uniones etiquetadas (tagged unions).

## Usando taggedEnum

La función `taggedEnum` crea una definición de estado completa con seguridad de tipos:

```ts
import { taggedEnum } from "tagix";

const UserState = taggedEnum({
  Unauthenticated: {},
  Authenticating: { loading: true },
  Authenticated: {
    user: { id: number; email: string; name: string },
    token: string,
  },
  AuthError: { message: string },
});
```

## Artefactos Generados

`taggedEnum` genera:

1. **Constructores** - Crean instancias de estado
2. **Tipo de Estado** - Unión de todas las variantes
3. **Ayudantes de Patrones** - Acceso al estado seguro para tipos

```ts
// Constructores
const unauthenticated = UserState.Unauthenticated({});
const authenticating = UserState.Authenticating({ loading: true });
const authenticated = UserState.Authenticated({
  user: { id: 1, email: "test@example.com", name: "Test" },
  token: "abc123",
});

// Tipo de Estado (inferido)
type UserStateType = typeof UserState.State;

// El tipo es:
// { readonly _tag: "Unauthenticated" } |
// { readonly _tag: "Authenticating"; readonly loading: boolean } |
// { readonly _tag: "Authenticated"; readonly user: {...}; readonly token: string } |
// { readonly _tag: "AuthError"; readonly message: string }
```

## Variantes Vacías vs Llenas

Las variantes pueden tener propiedades o estar vacías:

```ts
const LoadingState = taggedEnum({
  Idle: {}, // Sin propiedades
  Loading: { progress: number }, // Con propiedades
});
```

## Estructuras Anidadas

El estado puede contener estructuras anidadas complejas:

```ts
const AppState = taggedEnum({
  Ready: {
    user: {
      profile: {
        settings: {
          theme: "light" | "dark";
          notifications: boolean;
        };
      };
    };
    posts: Array<{ id: number; title: string }>;
  },
});
```

## Reducción de Tipos (Type Narrowing)

La propiedad `_tag` permite una comprobación de tipos exhaustiva:

```ts
function processUser(state: UserStateType) {
  switch (state._tag) {
    case "Unauthenticated":
      // TypeScript sabe que el estado no tiene la propiedad user
      return "Por favor, inicia sesión";
    case "Authenticating":
      // TypeScript sabe que existe state.loading
      return state.loading ? "Cargando..." : "Iniciando";
    case "Authenticated":
      // TypeScript sabe que existe state.user
      return `Hola, ${state.user.name}`;
    case "AuthError":
      // TypeScript sabe que existe state.message
      return state.message;
    default:
      // Comprobación de exhaustividad
      return assertNever(state);
  }
}
```

## Ayudante Extract

Usa `Extract` para obtener tipos de variantes específicas:

```ts
import { Extract } from "tagix";

type AuthenticatedState = Extract<UserStateType, { _tag: "Authenticated" }>;

// AuthenticatedState es:
// {
//   readonly _tag: "Authenticated";
//   readonly user: { id: number; email: string; name: string };
//   readonly token: string;
// }
```

## Mejores Prácticas

### Un Estado por Dominio

Crea definiciones de estado separadas para diferentes dominios:

```ts
// Estado de Usuario
const UserState = taggedEnum({
  /* ... */
});

// Estado de Publicaciones
const PostsState = taggedEnum({
  /* ... */
});

// Combinar en un estado raíz
const AppState = taggedEnum({
  User: UserState,
  Posts: PostsState,
});
```

### Aplanar cuando sea posible

Evita estructuras profundamente anidadas cuando las alternativas planas funcionen:

```ts
// Preferible
const FormState = taggedEnum({
  Idle: {},
  Submitting: { values: Record<string, unknown> },
  Success: { data: unknown },
  Error: { errors: Record<string, string> },
});

// En lugar de anidación profunda
const DeepFormState = taggedEnum({
  Form: {
    Status: {
      Idle: {},
      Submitting: { values: Record<string, unknown> },
      // ... más anidación
    },
  },
});
```

### Etiquetas Significativas

Usa nombres de etiquetas descriptivos:

```ts
// Bien
const StatusState = taggedEnum({
  Pending: {},
  Processing: {},
  Completed: {},
  Failed: { reason: string },
});

// Evitar
const StatusState = taggedEnum({
  One: {},
  Two: {},
  Three: {},
});
```

## Ver También

- [Acciones](/docs/actions) - Modificando el estado
- [Máquinas de Estado](/docs/state-machines) - Transiciones de estado
- [Seguridad de Tipos](/docs/type-safety) - Patrones de TypeScript

## Próximos Pasos

| Tópico                                     | Descripción                               |
| ------------------------------------------ | ----------------------------------------- |
| [Acciones](/docs/actions)                  | Crear actualizaciones de estado síncronas |
| [Acciones Asíncronas](/docs/async-actions) | Manejar operaciones asíncronas            |
