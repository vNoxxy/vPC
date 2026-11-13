import SiteLayout from "../components/Layout";
import { PageHead, Row } from "../components/ui";
import { PROFILE } from "../data/profile";

/** Who publishes the site and who hosts it. Moving to another host means changing HOST below. */
const HOST = {
  name: "GitHub, Inc. (GitHub Pages)",
  address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  site: "https://github.com",
};

export default function LegalPage() {
  const blocks: { title: string; text: string[] }[] = [
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
      ],
    },
  ];

  return (
    <SiteLayout title="Mentions légales">
      <PageHead title="Mentions légales" />
      <section className="wrap">
        <div className="rule-rows border-t-[1.5px] border-ink">
          {blocks.map((b) => (
            <Row key={b.title} label={b.title}>
              <div className="space-y-3">
                {b.text.map((t) => (
                  <p key={t} className="t-body">
                    {t}
                  </p>
                ))}
              </div>
            </Row>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
