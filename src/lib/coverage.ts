import { COMPETENCES, type Competence } from "../data/competences";
import { WORKS } from "../data/realisations";
import type { Work } from "../data/types";

export interface Coverage {
  competence: Competence;
  /** For each activity of the competency, the work that proves it. */
  proofs: Work[][];
  /** How many of its activities are proved at least once. */
  covered: number;
  /** How many pieces of work prove at least one of its activities. */
  works: number;
}

/** The E4 synthesis table, read competency by competency. */
export const COVERAGE: Coverage[] = COMPETENCES.map((competence) => {
  const proofs = competence.activities.map((_, ai) => WORKS.filter((w) => w.competences[competence.key]?.includes(ai)));
  return {
    competence,
    proofs,
    covered: proofs.filter((p) => p.length).length,
    works: WORKS.filter((w) => w.competences[competence.key]?.length).length,
  };
});

export const ACTIVITY_COUNT = COMPETENCES.reduce((n, c) => n + c.activities.length, 0);
export const COVERED_COUNT = COVERAGE.reduce((n, c) => n + c.covered, 0);
