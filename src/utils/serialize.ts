/* Utilities to serialize and revive functions inside nested objects */

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  Object.prototype.toString.call(val) === "[object Object]";

export type SerializedFunction = { __fn: true; src: string };

const markFunction = (fn: Function): SerializedFunction => ({
  __fn: true,
  // Keep full source (arrow/function) to eval on manager side
  src: fn.toString(),
});

export const serializeFunctions = <T = unknown>(input: T): any => {
  if (typeof input === "function") {
    return markFunction(input as unknown as Function);
  }
  if (Array.isArray(input)) {
    return input.map((v) => serializeFunctions(v));
  }
  if (isPlainObject(input)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input)) {
      out[k] = serializeFunctions(v as any);
    }
    return out;
  }
  return input;
};

const isSerializedFunction = (val: unknown): val is SerializedFunction =>
  isPlainObject(val) && (val as any).__fn === true && typeof (val as any).src === "string";

export const reviveFunctions = <T = unknown>(input: any): T => {
  if (isSerializedFunction(input)) {
    const src = input.src as string;
    try {
      // Parentheses ensure arrow/function source evaluates to a function reference
      // eslint-disable-next-line no-new-func
      const revived = (0, eval)(`(${src})`);
      if (typeof revived === "function") return revived as any as T;
    } catch {
      // Fallback to a noop function to avoid runtime crashes
      return ((..._args: any[]) => undefined) as any as T;
    }
    return ((..._args: any[]) => undefined) as any as T;
  }
  if (Array.isArray(input)) {
    return input.map((v) => reviveFunctions(v)) as any as T;
  }
  if (isPlainObject(input)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input)) {
      out[k] = reviveFunctions(v);
    }
    return out as any as T;
  }
  return input as T;
};
