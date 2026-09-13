import type { Transition } from "framer-motion";

/**
 * Shared motion tokens (plan.md §14): a handful of easings and springs, nothing
 * decorative. Animations must express hierarchy, state, feedback or spatial change.
 */

export const EASE_OUT_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Workspace / panel cross-fades. */
export const fadeTransition: Transition = { duration: 0.26, ease: EASE_OUT_SOFT };

/** Content swaps inside a surface that is itself morphing. */
export const quickFade: Transition = { duration: 0.16, ease: EASE_OUT_SOFT };

/** Layout morphs: the Dynamic Island, the category indicator. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.7,
};
