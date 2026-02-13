---
category: State Management
alias: state-machines
title: Máquinas de Estado
description: Modela las transiciones de estado como máquinas de estado finitas
order: 13
---

# Máquinas de Estado

Modela las transiciones de estado como máquinas de estado finitas.

## Patrón de Máquina de Estado

Las definiciones de estado de Tagix modelan naturalmente las máquinas de estado finitas:

```ts
const OrderState = taggedEnum({
  Pending: {},
  Processing: { startedAt: string },
  Shipped: { trackingNumber: string; shippedAt: string },
  Delivered: { deliveredAt: string },
  Cancelled: { reason: string; cancelledAt: string },
});
```

## Transiciones Válidas

Define qué transiciones están permitidas:

```ts
const OrderActions = {
  submit: createAction<void, OrderState>("Submit")
    .withPayload(undefined)
    .withState((s) => {
      if (s._tag !== "Pending") return s;
      return OrderState.Processing({ startedAt: new Date().toISOString() });
    }),

  ship: createAction<{ trackingNumber: string }, OrderState>("Ship")
    .withPayload({ trackingNumber: "" })
    .withState((s, p) => {
      if (s._tag !== "Processing") return s;
      return OrderState.Shipped({
        trackingNumber: p.trackingNumber,
        shippedAt: new Date().toISOString(),
      });
    }),

  deliver: createAction<void, OrderState>("Deliver")
    .withPayload(undefined)
    .withState((s) => {
      if (s._tag !== "Shipped") return s;
      return OrderState.Delivered({ deliveredAt: new Date().toISOString() });
    }),

  cancel: createAction<{ reason: string }, OrderState>("Cancel")
    .withPayload({ reason: "" })
    .withState((s, p) => {
      if (s._tag === "Delivered") return s; // No se puede cancelar si ya fue entregado
      return OrderState.Cancelled({
        reason: p.reason,
        cancelledAt: new Date().toISOString(),
      });
    }),
};
```

## Guardias de Transición

Evita transiciones inválidas:

```ts
const canTransition = (from: string, to: string): boolean => {
  const allowed: Record<string, string[]> = {
    Pending: ["Processing", "Cancelled"],
    Processing: ["Shipped", "Cancelled"],
    Shipped: ["Delivered"],
    Cancelled: [],
    Delivered: [],
  };
  return allowed[from]?.includes(to) ?? false;
};

const safeTransition = createAction<{ to: string }, OrderState>("Transition")
  .withPayload({ to: "" })
  .withState((s, p) => {
    if (!canTransition(s._tag, p.to)) return s;
    // Realizar transición
    return performTransition(s, p.to);
  });
```

## Validación de Estado

Valida la integridad del estado:

```ts
const validateOrder = (state: OrderState): boolean => {
  switch (state._tag) {
    case "Processing":
      return state.startedAt !== undefined;
    case "Shipped":
      return state.trackingNumber.length > 0;
    case "Delivered":
      return state.deliveredAt !== undefined;
    default:
      return true;
  }
};
```

Modela comportamientos complejos:

```ts
const PaymentState = taggedEnum({
  NotStarted: {},
  Processing: {
    method: "card" | "bank" | "crypto";
    attempts: number;
  },
  Completed: { transactionId: string },
  Failed: { reason: string; retryable: boolean },
  Refunded: { refundId: string; reason: string },
});
```

## Efectos Secundarios en la Transición

Dispara acciones durante las transiciones:

```ts
const withSideEffects = (action: Action) =>
  createAction(action.type, action.payload)
    .withState(action.withState)
    .withEffect(async (payload) => {
      // Efecto secundario después de la transición de estado
      await sendAnalytics("action_completed", payload);
      await notifyWebhook(payload);
    });
```

## Ver También

- [Definiciones de Estado](/docs/state-definitions) - Estructura del estado
- [Acciones](/docs/actions) - Transiciones de estado
- [Acciones Asíncronas](/docs/async-actions) - Transiciones asíncronas

## Próximos Pasos

| Tópico                         | Descripción                             |
| ------------------------------ | --------------------------------------- |
| [Selectors](/docs/selectors)   | Extraer y derivar valores               |
| [Middleware](/docs/middleware) | Extender el comportamiento del despacho |
