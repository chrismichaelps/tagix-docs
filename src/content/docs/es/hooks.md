---
category: Features
alias: hooks
title: Utilidades de Hook
description: Utilidades seguras para tipos para acceder al estado y despachar acciones a través de TagixContext
order: 24
---

# Utilidades de Hook

Las utilidades de hook proporcionan funciones convenientes para acceder al estado y despachar acciones a través de un `TagixContext`. Estas funcionan con cualquier framework que soporte patrones de hooks.

## useMatch

Apareamiento de patrones (pattern matching) exhaustivo sobre el estado actual. Cada etiqueta (tag) de variante debe ser manejada — el compilador exige la exhaustividad. Devuelve la unión de todos los tipos de retorno de los manejadores.

```ts
const name = useMatch(context, {
  LoggedIn: (s) => s.name,
  LoggedOut: () => "Invitado",
});
// name se infiere como string
```

## useWhen

Reduce (narrow) el estado actual a una sola variante por etiqueta. Devuelve las propiedades de la variante (sin el `_tag`) si coincide, o `undefined` en caso contrario.

```ts
const user = useWhen(context, "LoggedIn");
if (user) {
  console.log(user.name); // totalmente tipado
}
```

## useDispatch

Devuelve una función de despacho (dispatch) tipada. Soporta el **despacho de objetos de acción** (recomendado) para una seguridad de tipos completa, y el despacho basado en cadenas (legacy).

```ts
const dispatch = useDispatch(context);

// Recomendado: Despacho tipado con referencia de acción
dispatch(loginAction, { username: "chris" });

// Legacy: Despacho basado en strings (deprecado)
dispatch("Login", { username: "chris" });
```

## useActionGroup

Crea despachadores tipados a partir de un grupo de acciones. Cada clave en el grupo se convierte en un método tipado.

```ts
const UserActions = createActionGroup("Auth", { login, logout });
const dispatch = useActionGroup(context, UserActions);

dispatch.login({ username: "chris" }); // totalmente tipado
```

## useMatchPartial

Apareamiento de patrones no exhaustivo. Solo maneja las variantes especificadas; las demás devuelven `undefined`.

```ts
const greeting = useMatchPartial(context, {
  LoggedIn: (s) => `Bienvenido, ${s.name}`,
});
// greeting: string | undefined
```

## useStore

Devuelve una instantánea (snapshot) del estado actual desde un contexto.

```ts
const state = useStore(context);
```

## useSelector

Devuelve un valor derivado del estado a través de una función selectora.

```ts
const itemCount = useSelector(context, (s) => (s._tag === "Items" ? s.items.length : 0));
```

## useSubscribe

Escucha los cambios de estado con un callback. Devuelve una función para cancelar la suscripción.

```ts
const unsubscribe = useSubscribe(context, (state) => {
  console.log("Nuevo estado:", state._tag);
});
```

## createSelector

Construye una función selectora que lee el último estado cada vez que se llama.

```ts
const getName = createSelector(context, (s) => s.user?.name);
const name = getName();
```

---

## Hooks Antiguos / Deprecados (Legacy)

Estos hooks se mantienen por compatibilidad hacia atrás, pero serán eliminados en la próxima versión mayor.

### useGetState

**Deprecado**: Usa `useMatch` o `useWhen` en su lugar. Requiere genéricos manuales y doble ejecución.

### useKey

**Deprecado**: Usa `useWhen` o `useMatch` en su lugar para asegurar un acceso consciente de la variante.

### getStateProp

**Deprecado**: Usa `$match` directamente en el constructor del enum etiquetado.

---

## Ejemplo Completo

```ts
import { createContext, createStore, createAction, taggedEnum, createActionGroup } from "tagix";
import { useMatch, useWhen, useDispatch, useActionGroup } from "tagix";

const UserState = taggedEnum({
  LoggedOut: {},
  LoggedIn: { name: "", email: "" },
});

const login = createAction("Login")
  .withPayload({ username: "" })
  .withState((_, p) => UserState.LoggedIn({ name: p.username, email: "" }));

const UserActions = createActionGroup("Auth", { login });

const store = createStore(UserState.LoggedOut({}), UserState);
store.registerGroup(UserActions);
const context = createContext(store);

// 1. Apareamiento exhaustivo
const name = useMatch(context, {
  LoggedIn: (s) => s.name,
  LoggedOut: () => "Visitante",
});

// 2. Reducción estructural
const user = useWhen(context, "LoggedIn");
if (user) {
  console.log(user.email);
}

// 3. Despacho tipado (Grupo de Acciones)
const dispatch = useActionGroup(context, UserActions);
dispatch.login({ username: "chris" });

// 4. Despacho tipado (Acción Individual)
const directDispatch = useDispatch(context);
directDispatch(login, { username: "michael" });
```
