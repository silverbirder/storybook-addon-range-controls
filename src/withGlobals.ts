import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";
import { useEffect, useChannel } from "storybook/preview-api";
import { EVENTS, KEY } from "./constants";
import { serializeFunctions } from "./utils/serialize";

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const emit = useChannel({});

  useEffect(() => {
    const params = context.parameters?.[KEY];
    if (params) {
      const serialized = JSON.stringify(serializeFunctions(params));
      emit(EVENTS.PARAMETERS_SYNC, serialized);
    }
  }, [context.id, context.parameters]);

  return StoryFn();
};
