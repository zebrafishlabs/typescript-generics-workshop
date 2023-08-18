import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const array = [
  {
    name: "John",
  },
  {
    name: "Steve",
  },
];

// TS infers the type of array {name: string}[] but defaults the return type of
// reduce to an empty object, {}.
// This is because reduce infers the return type from the initial value, {}.
// By passing Record<string, {name: string}> as a type argument, reduce can
// correctly infer the return type.
// We're making use of reduce's generic type arguments to give it a better idea
// of what the correct return type is.
const obj = array.reduce<Record<string, {name: string}>>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

it("Should resolve to an object where name is the key", () => {
  expect(obj).toEqual({
    John: {
      name: "John",
    },
    Steve: {
      name: "Steve",
    },
  });

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});
