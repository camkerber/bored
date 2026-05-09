import {
  BubbleSortVisualizer,
  InsertionSortVisualizer,
  SelectionSortVisualizer,
  QuickSortVisualizer,
  BinarySearchVisualizer,
  QuickSelectVisualizer,
} from "../visualizers";
import type {AlgorithmEntry} from "./types";

export const ALGORITHMS: Record<string, AlgorithmEntry> = {
  "bubble-sort": {
    slug: "bubble-sort",
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the array, comparing each adjacent pair and swapping them if they are out of order. After each full pass the largest remaining value has bubbled to the end of the unsorted region.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    visualizer: BubbleSortVisualizer,
  },
  "insertion-sort": {
    slug: "insertion-sort",
    name: "Insertion Sort",
    description:
      "Builds the sorted array one element at a time by taking the next unsorted value and shifting larger sorted values one slot to the right until the value can be inserted in place.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    visualizer: InsertionSortVisualizer,
  },
  "selection-sort": {
    slug: "selection-sort",
    name: "Selection Sort",
    description:
      "Walks the unsorted suffix of the array each pass to find the minimum value, then swaps it into the next sorted slot.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    visualizer: SelectionSortVisualizer,
  },
  "quick-sort": {
    slug: "quick-sort",
    name: "Quick Sort",
    description:
      "Picks a pivot, partitions the array into values less than and greater than the pivot, then recursively sorts each partition. Average-case divide-and-conquer.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    visualizer: QuickSortVisualizer,
  },
  "binary-search": {
    slug: "binary-search",
    name: "Binary Search",
    description:
      "Locates a target in a sorted array by repeatedly halving the search window: compare the middle element, then discard the half that cannot contain the target.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    visualizer: BinarySearchVisualizer,
  },
  "quick-select": {
    slug: "quick-select",
    name: "Quick Select",
    description:
      "Finds the k-th smallest value in an unsorted array by partitioning around a pivot and only recursing into the side that contains the desired index.",
    timeComplexity: "O(n) average",
    spaceComplexity: "O(log n)",
    visualizer: QuickSelectVisualizer,
  },
};
