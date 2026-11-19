import { useState, type FormEvent } from "react";
import { Reveal } from "../components/Reveal";
import { ArrowRight, ArrowUpRight, PageHero } from "../components/ui";
import { PROFILE } from "../data/profile";
import { usePageMeta } from "../lib/usePageMeta";

const SUBJECTS = ["Proposition de stage", "Question sur une réalisation", "Projet ou collaboration", "Autre"];

/**
 * No server behind this site: the form only writes the e-mail and opens it in the visitor's own mail
 * app, so nothing typed here is sent or stored anywhere else.
 */
export default function ContactPage() {
  usePageMeta("Contact", "Écrire à Timéo Vaast, étudiant en BTS SIO : un stage, une question ou un projet.");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [copied, setCopied] = useState(false);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const organisation = String(form.get("organisation") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = [message, "", [name, organisation].filter(Boolean).join(", ")].join("\n");
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard: the address stays readable.
    }
  };

  const channels = [
    { label: "GitHub", value: "github.com/vnoxxy", href: PROFILE.github },
    { label: "Mon studio", value: "vodystudio.fr", href: PROFILE.vody },
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title={["Un stage, un projet,", <span className="serif text-accent-soft">une question ?</span>]}
        lead="Écrivez-moi : je réponds en général dans la journée."
      />

      <section className="wrap grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <Reveal className="spot card relative overflow-hidden p-8 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-[90px]" />
            <p className="label relative flex items-center gap-3">
              <i aria-hidden className="live-dot" /> E-mail · réponse sous 24 h
            </p>
            <a href={`mailto:${PROFILE.email}`} className="link relative mt-6 block break-all text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.03em]">
              {PROFILE.email}
            </a>
            <button type="button" onClick={copy} className="btn btn-ghost btn-sm relative mt-8" aria-live="polite">
              {copied ? "Adresse copiée ✓" : "Copier l'adresse"}
            </button>
          </Reveal>
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={(i + 1) * 80}>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="spot card group flex items-center justify-between gap-4 p-7">
                <span>
                  <span className="label block !text-[11px]">{c.label}</span>
                  <span className="mt-2 block text-[21px] font-semibold tracking-[-0.02em]">{c.value}</span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <form onSubmit={send} className="card p-8 sm:p-10">
            <fieldset>
              <legend className="label field-label">Objet</legend>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubject(s)}
                    aria-pressed={s === subject}
                    className={`h-11 rounded-full border px-5 text-[14.5px] font-medium transition-all duration-300 ${
                      s === subject ? "border-fg bg-fg text-bg" : "border-[var(--line-strong)] text-soft hover:border-fg hover:text-fg"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label field-label">Votre nom</span>
                <input name="name" className="field" autoComplete="name" placeholder="Prénom Nom" />
              </label>
              <label className="block">
                <span className="label field-label">Entreprise ou établissement</span>
                <input name="organisation" className="field" autoComplete="organization" placeholder="Facultatif" />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="label field-label">Message</span>
              <textarea name="message" required rows={6} className="field" placeholder="Bonjour Timéo, …" />
            </label>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[340px] text-[13.5px] leading-relaxed text-faint">Le message s'ouvre dans votre messagerie : rien n'est envoyé ni enregistré par ce site.</p>
              <button type="submit" className="btn">
                Écrire le message <ArrowRight />
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
