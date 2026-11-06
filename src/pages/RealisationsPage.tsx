import type { CSSProperties } from "react";
import { useSearchParams } from "react-router";
import SiteLayout from "../components/Layout";
import RealisationCard from "../components/RealisationCard";
import Segmented from "../components/Segmented";
import { PageHero, Section } from "../components/ui";
import { CATEGORIES, CATEGORY_BY_KEY } from "../data/competences";
import { REALISATIONS } from "../data/realisations";
import type { CategoryKey } from "../data/types";
import { accentStyle } from "../lib/accents";

type Filter = CategoryKey | "all";

export default function RealisationsPage() {
  const [params, setParams] = useSearchParams();
  const asked = params.get("bloc");
  const filter: Filter = CATEGORIES.some((c) => c.key === asked) ? (asked as CategoryKey) : "all";
  const shown = filter === "all" ? REALISATIONS : REALISATIONS.filter((r) => r.category === filter);
  const category = filter === "all" ? null : CATEGORY_BY_KEY[filter];

  const options = [
    { key: "all" as Filter, label: "Toutes", count: REALISATIONS.length },
    ...CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.label, count: REALISATIONS.filter((r) => r.category === c.key).length })),
  ];

  return (
    <SiteLayout title="Réalisations" description="Toutes mes réalisations du BTS SIO et de Vody Studio, une fiche par TP et par projet." accent={category?.accent ?? "vody"}>
      <PageHero
        kicker={<p className="kicker kicker-plain">Réalisations</p>}
        wordmark="Réalisations"
        dimension="Contexte · Contribution · Difficulté · Solution · Compétences · Preuves"
        title="Une *fiche* par TP et par projet, reliée à ses *preuves*"
        description="Les travaux de mes cours, rangés par bloc du BTS, et les projets de mon studio. Chaque fiche dit ce que j'ai fait moi-même et ce que cela démontre."
      />

      <Section tone="light" innerClassName="py-14 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[620px]">
            <p className="kicker">{category ? category.label : "Tous les blocs"}</p>
            <h2 className="h-section mt-6">{category ? category.name : "Toutes les réalisations"}</h2>
            <p className="lede mt-4">{category ? category.text : "Du Bloc 1 aux projets de Vody Studio, de la plus ancienne à la plus récente dans chaque bloc."}</p>
          </div>
        </div>

        <div className="mt-10">
          <Segmented
            label="Filtrer par bloc"
            options={options}
            value={filter}
            onChange={(key) => setParams(key === "all" ? {} : { bloc: key }, { replace: true, preventScrollReset: true })}
          />
        </div>

        {/* Keyed by the filter, so the list rises in again on each switch. */}
        <ul key={filter} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <li key={r.slug} data-anim="rise" style={{ "--i": i, ...accentStyle(CATEGORY_BY_KEY[r.category].accent, "light") } as CSSProperties}>
              <RealisationCard r={r} tone="light" index={i} />
            </li>
          ))}
        </ul>
      </Section>
    </SiteLayout>
  );
}
