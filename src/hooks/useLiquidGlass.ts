import { useEffect, useRef, type RefObject } from "react";

export interface LiquidGlassElementConfig {
  blurAmount?: number;
  refraction?: number;
  chromAberration?: number;
  edgeHighlight?: number;
  specular?: number;
  fresnel?: number;
  distortion?: number;
  cornerRadius?: number;
  zRadius?: number;
  opacity?: number;
  saturation?: number;
  brightness?: number;
  shadowOpacity?: number;
  shadowSpread?: number;
  shadowOffsetY?: number;
  floating?: boolean;
  button?: boolean;
  bevelMode?: 0 | 1;
}

export function useLiquidGlass(
  rootRef: RefObject<HTMLElement | null>,
  selector = ".liquid-glass-refract",
  defaultConfig?: LiquidGlassElementConfig
) {
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const root = rootRef.current;
      if (!root) return;

      const elements = root.querySelectorAll<HTMLElement>(selector);
      if (!elements || elements.length === 0) return;

      try {
        const { LiquidGlass } = await import("@ybouane/liquidglass");
        if (!isMounted) return;

        // Apply default config if dataset.config is not present
        elements.forEach((el) => {
          if (!el.dataset.config && defaultConfig) {
            el.dataset.config = JSON.stringify(defaultConfig);
          }
        });

        const instance = await LiquidGlass.init({
          root,
          glassElements: elements,
          defaults: defaultConfig || {
            cornerRadius: 24,
            refraction: 0.7,
            chromAberration: 0.08,
            blurAmount: 0.25,
            edgeHighlight: 0.1,
            shadowOpacity: 0.25
          }
        });

        if (isMounted) {
          instanceRef.current = instance;
        } else {
          instance.destroy?.();
        }
      } catch (err) {
        console.warn("LiquidGlass WebGL initialization skipped or fallback active:", err);
      }
    }

    // Small delay to ensure DOM and fonts have rendered
    const timeout = setTimeout(() => {
      init();
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (instanceRef.current?.destroy) {
        try {
          instanceRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
        instanceRef.current = null;
      }
    };
  }, [rootRef, selector, defaultConfig]);

  return instanceRef;
}
