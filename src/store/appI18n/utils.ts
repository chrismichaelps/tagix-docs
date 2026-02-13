import { taggedEnum, tryCatchAsync } from "tagix";
import { I18nLoadError } from "./errors";
import { LOCALES_PATH } from "./constants";

export type I18nLoadErrorType = InstanceType<typeof I18nLoadError>;

export type TranslationData = any;

export const LoadResult = taggedEnum({
  Success: { data: {} as TranslationData },
  Failure: { error: null as unknown as I18nLoadErrorType },
});

export type LoadResultType = typeof LoadResult.State;

export async function loadTranslations(locale: string): Promise<LoadResultType> {
  const result = await tryCatchAsync(
    async () => {
      const response = await fetch(`${LOCALES_PATH}/${locale}.json`);
      if (!response.ok) {
        throw new I18nLoadError({
          message: `HTTP error! status: ${response.status}`,
        });
      }
      return (await response.json()) as TranslationData;
    },
    (error) =>
      new I18nLoadError({
        message: error instanceof Error ? error.message : "Unknown error",
        cause: error,
      }) as unknown as I18nLoadErrorType
  );

  if (result._tag === "Right") {
    return LoadResult.Success({ data: result.right as TranslationData });
  } else {
    return LoadResult.Failure({ error: result.left as unknown as I18nLoadErrorType });
  }
}
