import type {ComponentType, LazyExoticComponent} from "react";

export type VisualizerComponent =
  | ComponentType
  | LazyExoticComponent<ComponentType>;

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
  visualizer: VisualizerComponent;
}

export interface DataStructureEntry {
  slug: string;
  name: string;
  description: string;
  operations: OperationDescriptor[];
  visualizer: VisualizerComponent;
}
