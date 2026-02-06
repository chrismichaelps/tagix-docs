import { createStore, taggedEnum, createAction } from "tagix";
import { ACTION_TYPES, STORE_NAME } from "./constants";
import type { DocPage } from "../../utils/docs-parser";

export type DocPagesMap = Map<string, DocPage>;

export const DocStatus = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { pages: null as DocPagesMap | null },
  Error: { message: "" },
});

export type DocStatusType = typeof DocStatus.State;

export const setReady = createAction<{ pages: DocPagesMap }, DocStatusType>(ACTION_TYPES.SET_READY)
  .withPayload({ pages: new Map() as DocPagesMap })
  .withState((_, { pages }) => DocStatus.Ready({ pages }));

export const setError = createAction<{ message: string }, DocStatusType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => DocStatus.Error({ message }));

export const setLoading = createAction<undefined, DocStatusType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => DocStatus.Loading({}));

export const docsStore = createStore(DocStatus.Idle({}), DocStatus, { name: STORE_NAME });

docsStore.register(ACTION_TYPES.SET_READY, setReady);
docsStore.register(ACTION_TYPES.SET_ERROR, setError);
docsStore.register(ACTION_TYPES.SET_LOADING, setLoading);

export const setDocsReady = (pages: DocPagesMap) => docsStore.dispatch(setReady, { pages });
export const setDocsError = (message: string) => docsStore.dispatch(setError, { message });
export const setDocsLoading = () => docsStore.dispatch(setLoading);
