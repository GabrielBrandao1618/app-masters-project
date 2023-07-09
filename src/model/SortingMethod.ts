export enum SortingMethod {
  None,
  RatingCrescent,
  RatingDecrescent,
}

export const sortingMethods = [
  SortingMethod.None,
  SortingMethod.RatingCrescent,
  SortingMethod.RatingDecrescent,
];

const sortingMethodText = new Map<SortingMethod, string>([
  [SortingMethod.None, "None"],
  [SortingMethod.RatingCrescent, "Rating crescent"],
  [SortingMethod.RatingDecrescent, "Rating decrescent"],
]);
export function getSortingMethodText(key: SortingMethod) {
  return sortingMethodText.get(key) as string;
}
