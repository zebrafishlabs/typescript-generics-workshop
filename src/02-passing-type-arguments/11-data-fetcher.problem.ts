import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// Adding a return type only gives us so much type safety. We can stull
// re-assign data inside the body of the function and TS won't error out.
// Instead we should set the type of data on the variable before the fetch call
const fetchData = async <TData>(url: string) => {
  const data:TData = await fetch(url).then((response) => response.json());
  // now data can't be re-assigned to null
  return data;
};

it("Should fetch data from an API", async () => {
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1",
  );
  expect(data.name).toEqual("Luke Skywalker");

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});
