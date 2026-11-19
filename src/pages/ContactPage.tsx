import { useState, type FormEvent } from "react";
import SiteLayout from "../components/Layout";
import { PageHead } from "../components/ui";
import { PROFILE } from "../data/profile";

const SUBJECTS = ["Proposition de stage", "Question sur une réalisation", "Projet ou collaboration", "Autre"];

/**
 * No server behind this site: the form only writes the e-mail and opens it in the visitor's own mail
 * app, so nothing typed here is sent or stored anywhere else.
 */
export default function ContactPage() {
  const [subject, setSubject] = useState(SUBJECTS[0]);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const organisation = String(form.get("organisation") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = [message, "", [name, organisation].filter(Boolean).join(", ")].join("\n");
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SiteLayout title="Contact" description="Écrire à Timéo Vaast, étudiant en BTS SIO : un stage, une question ou un projet.">
      <PageHead title="Contact" lead="Un stage, un projet, une question : écrivez-moi, je réponds en général dans la journée." />

      <section className="wrap grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <div className="border-t-[1.5px] border-ink">
            <div className="border-b border-rule py-4">
              <p className="text-[14.5px] text-soft">E-mail</p>
              <a href={`mailto:${PROFILE.email}`} className="mt-1 block break-all text-[22px] font-semibold tracking-[-0.02em] hover:text-blue-text">
                {PROFILE.email}
              </a>
            </div>
            <div className="border-b border-rule py-4">
              <p className="text-[14.5px] text-soft">GitHub</p>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="mt-1 block text-[22px] font-semibold tracking-[-0.02em] hover:text-blue-text">
                github.com/vnoxxy ↗
              </a>
            </div>
            <div className="border-b border-rule py-4">
              <p className="text-[14.5px] text-soft">Mon studio</p>
              <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="mt-1 block text-[22px] font-semibold tracking-[-0.02em] hover:text-blue-text">
                vodystudio.fr ↗
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={send} className="border-t-[1.5px] border-ink pt-6">
          <fieldset>
            <legend className="field-label">Objet</legend>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  aria-pressed={s === subject}
                  className={`h-10 rounded-full border px-4 text-[14.5px] font-semibold transition-colors ${
                    s === subject ? "border-ink bg-ink text-white" : "border-rule bg-white text-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="field-label">Votre nom</span>
              <input name="name" className="field" autoComplete="name" />
            </label>
            <label className="block">
              <span className="field-label">Entreprise ou établissement</span>
              <input name="organisation" className="field" autoComplete="organization" />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="field-label">Message</span>
            <textarea name="message" required rows={6} className="field" />
          </label>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[340px] text-[14px] text-soft">Le message s'ouvre dans votre messagerie : rien n'est envoyé ni enregistré par ce site.</p>
            <button type="submit" className="btn">
              Écrire le message
            </button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
