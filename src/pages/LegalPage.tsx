import SiteLayout from "../components/Layout";
import { Section } from "../components/ui";
import { PROFILE } from "../data/profile";

/** Who publishes the site and who hosts it. Moving to another host means changing HOST below. */
const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  site: "https://vercel.com",
};

export default function LegalPage() {
  const blocks: { title: string; text: string[] }[] = [
    {
      title: "Éditeur",
      text: [`Ce site est le portfolio personnel de Timéo Vaast, étudiant en BTS SIO au lycée Jean Rostand de Chantilly. Contact : ${PROFILE.email}.`, "Directeur de la publication : Timéo Vaast."],
    },
    { title: "Hébergement", text: [`${HOST.name}, ${HOST.address} — ${HOST.site}`] },
    {
      title: "Données personnelles et cookies",
      text: [
        "Ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience ni aucun traceur, et ne collecte aucune donnée : il n'a ni base de données ni serveur applicatif.",
        "Le formulaire de contact n'envoie rien : il prépare un e-mail dans la messagerie du visiteur, qui choisit de l'envoyer ou non. Les polices de caractères sont servies avec le site, sans appel à un service tiers.",
      ],
    },
    {
      title: "Contenus",
      text: [
        "Les travaux présentés ont été réalisés dans le cadre du BTS SIO ; les entreprises citées dans les sujets (Rostand NetInfo, ROSTAND, TechNova) sont fictives. Les marques citées appartiennent à leurs propriétaires.",
      ],
    },
  ];

  return (
    <SiteLayout title="Mentions légales">
      <Section tone="dark" innerClassName="pt-16 pb-10">
        <p className="kicker kicker-plain">Mentions légales</p>
        <h1 className="h-section mt-6">Mentions légales</h1>
      </Section>
      <Section tone="light" innerClassName="py-14 lg:py-20">
        <div className="rows max-w-[860px]">
          {blocks.map((b) => (
            <div key={b.title} className="grid gap-2 p-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <h2 className="text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-[var(--accent-text)]">{b.title}</h2>
              <div className="space-y-3">
                {b.text.map((t) => (
                  <p key={t} className="text-[15px] leading-relaxed text-[var(--fg-muted)]">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
