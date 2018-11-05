import * as utils from "./../../src/modules/utils";

test("is distance in range", () => {
  expect(utils.filters.distance(1, 2)).toBeTruthy();
  expect(utils.filters.distance(3, 2)).toBeFalsy();
});

test("is rating grater ", () => {
  expect(utils.filters.rating(1, 2)).toBeFalsy();
  expect(utils.filters.rating(3, 2)).toBeTruthy();
});

test("is hotel includes filter keywords | aminity tesst", () => {
  expect(utils.filters.amenities(["a", "b", "c"], ["a", "c"])).toBeTruthy();
  expect(utils.filters.amenities(["a", "b", "c"], ["a", "c", "f"])).toBeFalsy();
});
test("word contain letters", () => {
  expect(utils.filters.name("ahmed osama", "d o")).toBeTruthy();
  expect(utils.filters.name("ahmed osama", "dsa")).toBeFalsy();
});
test("export min & max number of array as object", () => {
  expect(
    utils.getMinMaxOf(
      [{ num: 1 }, { num: 3 }, { num: 5 }, { num: 4 }, { num: 2 }],
      "num"
    )
  ).toEqual({
    min: 1,
    max: 5
  });
});
test("create new object from selected props of given one", () => {
  expect(
    utils.pickProps(
      {
        name: "ahmed",
        age: 28,
        job: "FE",
        sons: ["hamza"]
      },
      ["name", "age"]
    )
  ).toEqual({
    name: "ahmed",
    age: 28
  });
});
