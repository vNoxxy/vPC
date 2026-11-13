import { useSearchParams } from "react-router";
import FilterTabs from "../components/FilterTabs";
import IndexList from "../components/IndexList";
import SiteLayout from "../components/Layout";
import { PageHead } from "../components/ui";
import { CATEGORIES, CATEGORY_BY_KEY } from "../data/competences";
import { REALISATIONS, byNewest } from "../data/realisations";
import type { CategoryKey } from "../data/types";

type Filter = CategoryKey | "all";

export default function RealisationsPage() {
  const [params, setParams] = useSearchParams();
  const asked = params.get("bloc");
  const filter: Filter = CATEGORIES.some((c) => c.key === asked) ? (asked as CategoryKey) : "all";
  const shown = (filter === "all" ? REALISATIONS : REALISATIONS.filter((r) => r.category === filter)).slice().sort(byNewest);
  const category = filter === "all" ? null : CATEGORY_BY_KEY[filter];

  const options = [
    { key: "all" as Filter, label: "Toutes", count: REALISATIONS.length },
    ...CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.label, count: REALISATIONS.filter((r) => r.category === c.key).length })),
  ];

  return (
    <SiteLayout title="Réalisations" description="Toutes les réalisations de Timéo Vaast en BTS SIO et chez Vody Studio, une fiche par TP et par projet.">
      <PageHead
        title="Réalisations"
        lead="Les travaux du BTS, rangés par bloc, et les projets de Vody Studio. Chaque fiche dit ce que j'ai fait moi-même, la difficulté rencontrée et sa solution, puis propose le document à télécharger."
      />
      <section className="wrap">
        <FilterTabs label="Filtrer par bloc" options={options} value={filter} onChange={(key) => setParams(key === "all" ? {} : { bloc: key }, { replace: true, preventScrollReset: true })} />
        {category && (
          <p className="max-w-[720px] pt-5 text-[15.5px] leading-relaxed text-soft">
            <span className="font-semibold text-ink">{category.name}.</span> {category.text}
          </p>
        )}
        <div className="mt-2">
          <IndexList key={filter} items={shown} />
        </div>
      </section>
    </SiteLayout>
  );
}
