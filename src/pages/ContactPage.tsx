import { useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SiteLayout from "../components/Layout";
import { PageHero, Section, SectionHead } from "../components/ui";
import { PROFILE } from "../data/profile";

const SUBJECTS = ["Proposition de stage", "Question sur une réalisation", "Projet ou collaboration", "Autre"];

/**
 * No server behind this site: the form only writes the e-mail and opens it in the visitor's own mail
 * app, so nothing typed here is sent or stored anywhere else.
 */
export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState(SUBJECTS[0]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard access (an old browser, a page not served over HTTPS): the address stays readable.
    }
  };

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const organisation = String(form.get("organisation") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = [message, "", [name, organisation].filter(Boolean).join(" — ")].join("\n");
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SiteLayout title="Contact" description="Écrire à Timéo Vaast, étudiant en BTS SIO : stage, question ou projet.">
      <PageHero
        kicker={<p className="kicker kicker-plain">Contact</p>}
        wordmark="Contact"
        title="Un stage, une question, un projet ? *Écrivez-moi.*"
        description="Je réponds à tous les messages, en général dans la journée."
        action={
          <a href={`mailto:${PROFILE.email}`} className="btn btn-lg btn-solid">
            <FontAwesomeIcon icon={faEnvelope} /> {PROFILE.email}
          </a>
        }
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead compact kicker="Me joindre" title="Par *e-mail*, tout simplement" />
            <div className="mt-8 space-y-3">
              <div className="card flex items-center justify-between gap-3 p-4 pl-5">
                <span className="min-w-0">
                  <span className="field-label !mb-1">E-mail</span>
                  <span className="block truncate text-[15px] font-bold">{PROFILE.email}</span>
                </span>
                <button type="button" onClick={copy} className="btn btn-sm btn-outline" aria-live="polite">
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} /> {copied ? "Copiée" : "Copier"}
                </button>
              </div>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="card lift flex items-center gap-4 p-4 pl-5">
                <FontAwesomeIcon icon={faGithub} className="text-[20px]" />
                <span>
                  <span className="field-label !mb-1">GitHub</span>
                  <span className="block text-[15px] font-bold">github.com/vnoxxy</span>
                </span>
              </a>
            </div>
          </div>

          <form onSubmit={send} className="card space-y-5 p-6 sm:p-8">
            <div>
              <span className="field-label">Objet</span>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubject(s)}
                    aria-pressed={s === subject}
                    className={`h-9 rounded-full border px-4 text-[13px] font-semibold ${
                      s === subject ? "border-transparent bg-[var(--accent-fill)] text-[var(--accent-on)]" : "border-[var(--line-strong)] text-[var(--fg-muted)] hover:border-[var(--fg)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="field-label">Votre nom</span>
                <input name="name" className="field" autoComplete="name" />
              </label>
              <label className="block">
                <span className="field-label">Entreprise ou établissement</span>
                <input name="organisation" className="field" autoComplete="organization" />
              </label>
            </div>
            <label className="block">
              <span className="field-label">Message</span>
              <textarea name="message" required rows={6} className="field" />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-[var(--fg-faint)]">Le message s'ouvre dans votre messagerie : rien n'est envoyé ni enregistré par ce site.</p>
              <button type="submit" className="btn btn-accent shrink-0">
                <FontAwesomeIcon icon={faEnvelope} /> Écrire le message
              </button>
            </div>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}
