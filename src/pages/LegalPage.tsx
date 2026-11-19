import { PageHero } from "../components/ui";
import { Reveal } from "../components/Reveal";
import { PROFILE } from "../data/profile";
import { usePageMeta } from "../lib/usePageMeta";

/** Who publishes the site and who hosts it. Moving to another host means changing HOST below. */
const HOST = {
  name: "GitHub, Inc. (GitHub Pages)",
  address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  site: "https://github.com",
};

const BLOCKS: { title: string; text: string[] }[] = [
  {
    title: "Éditeur",
    text: [`Ce site est le portfolio personnel de Timéo Vaast, étudiant en BTS SIO au lycée Jean Rostand de Chantilly. Contact : ${PROFILE.email}.`, "Directeur de la publication : Timéo Vaast."],
  },
  { title: "Hébergement", text: [`${HOST.name}, ${HOST.address}, ${HOST.site}`] },
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
      "Les travaux présentés ont été réalisés dans le cadre du BTS SIO ; les entreprises citées dans les sujets (Rostand NetInfo, ROSTAND, TechNova) sont fictives. Les captures de vodystudio.fr montrent des données de démonstration. Les marques citées appartiennent à leurs propriétaires.",
      "Les cours et les énoncés proposés au téléchargement sont ceux des enseignants du BTS SIO du lycée Jean Rostand, qui en restent les auteurs.",
    ],
  },
];

export default function LegalPage() {
  usePageMeta("Mentions légales");
  return (
    <>
      <PageHero label="Informations" title={["Mentions légales"]} />
      <section className="wrap">
        <div className="rows">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} className="grid gap-4 py-10 lg:grid-cols-[320px_1fr] lg:gap-16">
              <p className="flex items-baseline gap-4">
                <span className="num text-[13px] text-accent">0{i + 1}</span>
                <span className="text-[19px] font-semibold">{b.title}</span>
              </p>
              <div className="max-w-[760px] space-y-4">
                {b.text.map((t) => (
                  <p key={t} className="t-body">
                    {t}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
