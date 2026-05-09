import {
  QueueVisualizer,
  StackVisualizer,
  LinkedListVisualizer,
  DoublyLinkedListVisualizer,
  BinarySearchTreeVisualizer,
  HeapVisualizer,
  MinHeapVisualizer,
  MaxHeapVisualizer,
  PriorityQueueVisualizer,
  RingBufferVisualizer,
  TrieVisualizer,
} from "../visualizers";
import type {DataStructureEntry} from "./types";

export const DATA_STRUCTURES: Record<string, DataStructureEntry> = {
  queue: {
    slug: "queue",
    name: "Queue",
    description:
      "A FIFO (first-in, first-out) collection backed by a singly linked list. The first item added is the first item out.",
    operations: [
      {
        name: "enqueue",
        description: "Add a value to the back of the queue.",
        complexity: "O(1)",
      },
      {
        name: "dequeue",
        description: "Remove and return the value at the front of the queue.",
        complexity: "O(1)",
      },
      {
        name: "peek",
        description: "Return the front value without removing it.",
        complexity: "O(1)",
      },
      {
        name: "clear",
        description: "Remove every value from the queue.",
        complexity: "O(1)",
      },
    ],
    visualizer: QueueVisualizer,
  },
  stack: {
    slug: "stack",
    name: "Stack",
    description:
      "A LIFO (last-in, first-out) collection backed by a singly linked list. The most recently pushed value is the first one popped.",
    operations: [
      {
        name: "push",
        description: "Add a value to the top of the stack.",
        complexity: "O(1)",
      },
      {
        name: "pop",
        description: "Remove and return the value at the top.",
        complexity: "O(1)",
      },
      {
        name: "peek",
        description: "Return the top value without removing it.",
        complexity: "O(1)",
      },
    ],
    visualizer: StackVisualizer,
  },
  "linked-list": {
    slug: "linked-list",
    name: "Linked List",
    description:
      "A singly linked list of nodes. Supports prepending, appending, inserting at an index, removing a value, and indexed access.",
    operations: [
      {
        name: "prepend",
        description: "Insert a value at the head.",
        complexity: "O(1)",
      },
      {
        name: "append",
        description: "Insert a value at the tail.",
        complexity: "O(n)",
      },
      {
        name: "insertAt",
        description: "Insert a value at a given index.",
        complexity: "O(n)",
      },
      {
        name: "remove",
        description: "Remove the first node matching a value.",
        complexity: "O(n)",
      },
      {
        name: "get",
        description: "Return the value at a given index.",
        complexity: "O(n)",
      },
    ],
    visualizer: LinkedListVisualizer,
  },
  "doubly-linked-list": {
    slug: "doubly-linked-list",
    name: "Doubly Linked List",
    description:
      "A linked list whose nodes hold both next and previous pointers, enabling bidirectional traversal and O(1) tail access.",
    operations: [
      {
        name: "prepend",
        description: "Insert a value at the head.",
        complexity: "O(1)",
      },
      {
        name: "append",
        description: "Insert a value at the tail.",
        complexity: "O(1)",
      },
      {
        name: "remove",
        description: "Remove the first node matching a value.",
        complexity: "O(n)",
      },
    ],
    visualizer: DoublyLinkedListVisualizer,
  },
  "binary-search-tree": {
    slug: "binary-search-tree",
    name: "Binary Search Tree",
    description:
      "An unbalanced binary search tree. Each node's left subtree holds smaller values and its right subtree holds larger values, enabling logarithmic lookup on average.",
    operations: [
      {
        name: "insert",
        description: "Insert a value into the tree.",
        complexity: "O(log n) avg",
      },
      {
        name: "remove",
        description: "Remove a value, restitching the tree.",
        complexity: "O(log n) avg",
      },
      {
        name: "findMin",
        description: "Return the smallest value in the tree.",
        complexity: "O(log n) avg",
      },
      {
        name: "findMax",
        description: "Return the largest value in the tree.",
        complexity: "O(log n) avg",
      },
    ],
    visualizer: BinarySearchTreeVisualizer,
  },
  heap: {
    slug: "heap",
    name: "Heap",
    description:
      "A binary heap implemented over an array with a custom comparator. Peek is O(1); push, pop, and remove are O(log n).",
    operations: [
      {
        name: "push",
        description: "Insert a value, sifting it up to maintain heap order.",
        complexity: "O(log n)",
      },
      {
        name: "pop",
        description: "Remove and return the root value.",
        complexity: "O(log n)",
      },
      {
        name: "peek",
        description: "Return the root value without removing it.",
        complexity: "O(1)",
      },
      {
        name: "heapify",
        description: "Build a heap from an existing array in linear time.",
        complexity: "O(n)",
      },
    ],
    visualizer: HeapVisualizer,
  },
  "min-heap": {
    slug: "min-heap",
    name: "Min Heap",
    description:
      "A binary heap whose root is always the smallest value. Useful for priority scheduling where lowest values come out first.",
    operations: [
      {
        name: "findMin",
        description: "Return the minimum value.",
        complexity: "O(1)",
      },
      {
        name: "extractMin",
        description: "Remove and return the minimum value.",
        complexity: "O(log n)",
      },
      {
        name: "decreaseKey",
        description: "Lower a value and re-heapify.",
        complexity: "O(log n)",
      },
    ],
    visualizer: MinHeapVisualizer,
  },
  "max-heap": {
    slug: "max-heap",
    name: "Max Heap",
    description:
      "A binary heap whose root is always the largest value. The mirror of a min heap, useful when the highest value should be served first.",
    operations: [
      {
        name: "findMax",
        description: "Return the maximum value.",
        complexity: "O(1)",
      },
      {
        name: "extractMax",
        description: "Remove and return the maximum value.",
        complexity: "O(log n)",
      },
      {
        name: "increaseKey",
        description: "Raise a value and re-heapify.",
        complexity: "O(log n)",
      },
    ],
    visualizer: MaxHeapVisualizer,
  },
  "priority-queue": {
    slug: "priority-queue",
    name: "Priority Queue",
    description:
      "A heap-backed queue that serves values according to a configurable priority order rather than insertion order.",
    operations: [
      {
        name: "enqueue",
        description: "Insert a value with a priority.",
        complexity: "O(log n)",
      },
      {
        name: "dequeue",
        description: "Remove and return the highest-priority value.",
        complexity: "O(log n)",
      },
      {
        name: "peek",
        description: "Return the highest-priority value without removing it.",
        complexity: "O(1)",
      },
    ],
    visualizer: PriorityQueueVisualizer,
  },
  "ring-buffer": {
    slug: "ring-buffer",
    name: "Ring Buffer",
    description:
      "A fixed-capacity circular buffer. Enqueue and dequeue wrap around the underlying array, giving O(1) operations without resizing.",
    operations: [
      {
        name: "enqueue",
        description: "Add a value to the buffer.",
        complexity: "O(1)",
      },
      {
        name: "dequeue",
        description: "Remove and return the oldest value.",
        complexity: "O(1)",
      },
      {
        name: "peek",
        description: "Return the oldest value without removing it.",
        complexity: "O(1)",
      },
    ],
    visualizer: RingBufferVisualizer,
  },
  trie: {
    slug: "trie",
    name: "Trie",
    description:
      "A prefix tree of characters. Adding or finding a word takes O(k) where k is the word length, regardless of how many words are stored.",
    operations: [
      {
        name: "add",
        description: "Insert a word into the trie.",
        complexity: "O(k)",
      },
      {
        name: "find",
        description: "Check whether a word exists in the trie.",
        complexity: "O(k)",
      },
    ],
    visualizer: TrieVisualizer,
  },
};
