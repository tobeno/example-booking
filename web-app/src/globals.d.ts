declare module "use-position" {
  export interface Position {
    latitude?: number;
    longitude?: number;
    timestamp?: number;
    accuracy?: number;
    error: string | null;
  }

  export function usePosition(): Position;
}
