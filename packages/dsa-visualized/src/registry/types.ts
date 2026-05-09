import type {ComponentType} from "react";

export interface OperationDescriptor {
  name: string;
  description: string;
  complexity?: string;
}

export interface AlgorithmEntry {
  slug: string;
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity?: string;
  visualizer?: ComponentType;
}

export interface DataStructureEntry {
  slug: string;
  name: string;
  description: string;
  operations: OperationDescriptor[];
  visualizer?: ComponentType;
}
