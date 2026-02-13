---
category: Features
alias: selectores
title: Selectores
description: Extrae y deriva valores del estado
order: 20
---

# Selectores

Extrae y deriva valores del estado.

## Selectores del Store

El store proporciona una selección básica:

```ts
const store = createStore(initialState, state);

// Obtener una propiedad específica
const value = store.select("user");

// Comprobar la etiqueta del estado
if (store.isInState("Loaded")) {
  // El estado es Loaded
}

// Obtener el estado tipado
const loadedState = store.getState("Loaded");
if (loadedState) {
  // Acceder a loadedState.data
}
```

## Selectores Personalizados

Crea funciones de selector reutilizables:

```ts
const AppState = taggedEnum({
  Ready: {
    user: { name: string; email: string },
    posts: Array<{ id: number; title: string }>,
  },
  Loading: {},
});

const selectors = {
  getUser: (state: AppStateType) => {
    if (state._tag !== "Ready") return null;
    return state.user;
  },

  getUserName: (state: AppStateType) => {
    const user = selectors.getUser(state);
    return user?.name ?? "Invitado";
  },

  getPostCount: (state: AppStateType) => {
    if (state._tag !== "Ready") return 0;
    return state.posts.length;
  },

  getPostTitles: (state: AppStateType) => {
    if (state._tag !== "Ready") return [];
    return state.posts.map((p) => p.title);
  },
};
```

## Uso de Selectores

```ts
const user = selectors.getUser(store.stateValue);
const name = selectors.getUserName(store.stateValue);
const count = selectors.getPostCount(store.stateValue);
```

## Selectores Derivados

Crea selectores que combinen otros selectores:

```ts
const derivedSelectors = {
  getUserDisplay: (state: AppStateType) => {
    const user = selectors.getUser(state);
    if (!user) return "Anónimo";
    return `${user.name} (${user.email})`;
  },

  hasPosts: (state: AppStateType) => {
    return selectors.getPostCount(state) > 0;
  },

  firstPostTitle: (state: AppStateType) => {
    const titles = selectors.getPostTitles(state);
    return titles[0] ?? null;
  },
};
```

## Selectores Memorizados

Para computaciones costosas, memoriza los selectores:

```ts
import { memoize } from "tagix";

const expensiveSelector = memoize((state: AppStateType) => {
  // Computación costosa
  return computeHeavyValue(state);
});
```

## Composición de Selectores

Construye selectores complejos a partir de otros simples:

```ts
const dashboardSelectors = {
  getDashboardData: (state: AppStateType) => ({
    user: selectors.getUser(state),
    postCount: selectors.getPostCount(state),
    theme: state._tag === "Ready" ? "dark" : "light",
  }),

  isUserReady: (state: AppStateType) => {
    return selectors.getUser(state) !== null;
  },

  canCreatePost: (state: AppStateType) => {
    return selectors.getUser(state) !== null && !state._tag.startsWith("Loading");
  },
};
```

## Buenas Prácticas

### Mantén los Selectores Puros

Los selectores no deben modificar el estado:

```ts
// Bien - selector puro
const getValue = (state: State) => state.value;

// Mal - muta el estado
const getValue = (state: State) => {
  state.value += 1; // ¡Efecto secundario!
  return state.value;
};
```

### Devuelve Tipos Estables

Usa tipos anulables para valores opcionales:

```ts
// Bien
const getUser = (state: State): User | null => {
  return state._tag === "Ready" ? state.user : null;
};
```

### Selecciona al Nivel de Componente

Los componentes deben seleccionar solo lo que necesitan:

```ts
// Bien - seleccionar datos específicos
const userName = useTagixState((state) => (state._tag === "Ready" ? state.user.name : null));

// Mal - se suscribe a todo el estado
const fullState = useTagixState((state) => state);
```

## Ver También

- [Contexto](/docs/context) - Integración con frameworks
- [Rendimiento](/docs/performance) - Técnicas de optimización

## Próximos Pasos

| Tópico                         | Descripción                             |
| ------------------------------ | --------------------------------------- |
| [Middleware](/docs/middleware) | Extiende el comportamiento del despacho |
| [Contexto](/docs/context)      | Integración agnóstica de frameworks     |
