import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import fetchLayoutData from "dak-components/lib/cms/layout";
import { getTranslationsData } from "dak-components/lib/components/TranslatedField";

type SupportedLocale = "no" | "en";

interface PrivacyPolicyPageProps {
  locale: SupportedLocale;
}

const PRIVACY_POLICY_CONTENT: Record<
  SupportedLocale,
  {
    title: string;
    introTitle: string;
    introBody: string;
    personalDataTitle: string;
    personalDataItems: string[];
    usageTitle: string;
    usageItems: string[];
    storageTitle: string;
    storageBody: string;
    securityTitle: string;
    securityItems: string[];
    telemetryTitle: string;
    telemetryBody: string;
    sharingTitle: string;
    sharingBody: string;
    rightsTitle: string;
    rightsItems: string[];
    changesTitle: string;
    changesBody: string;
    contactTitle: string;
    contactIntro: string;
    emailLabel: string;
    addressLabel: string;
    updatedLabel: string;
  }
> = {
  no: {
    title: "Personvernerklæring for Kvarteret",
    introTitle: "Om appen",
    introBody:
      "Denne appen (heretter kalt: Kvarteret) lar deg vise ditt digitale internbevis på Det Akademiske Kvarter.",
    personalDataTitle: "Hvilke personopplysninger vi behandler",
    personalDataItems: [
      "Navn",
      "E-postadresse",
      "Fødselsdato",
      "Verv og tilknytning i organisasjonen",
      "Profilbilde",
      "Medlemskapsstatus",
    ],
    usageTitle: "Hvordan vi bruker personopplysningene",
    usageItems: [
      "Verifisere din identitet ved innlogging",
      "Vise ditt digitale medlemsbevis",
      "Vise din status og dine rettigheter i organisasjonen",
    ],
    storageTitle: "Datalagring",
    storageBody:
      "Kvarteret lagrer begrensede data lokalt på enheten for å forbedre ytelse og stabilitet. Dette kan inkludere hurtiglagret medlemsinformasjon, arrangementsinnhold og bilder. Lokale cache-data brukes kun for å gjøre Kvarteret raskere og mer robust, og oppdateres eller erstattes når nyere data er tilgjengelige.",
    securityTitle: "Sikkerhet",
    securityItems: ["Innlogging skjer via en sikker to-faktor autentisering med e-post"],
    telemetryTitle: "Operasjonell telemetri og oppdateringstjenester",
    telemetryBody:
      "Vi bruker Expo-tjenester, inkludert EAS Update og EAS Insights, for å levere appoppdateringer og følge med på teknisk bruk av appen. Dette kan omfatte teknisk informasjon som appversjon, plattform, operativsystemversjon, oppdateringsadopsjon, prosjektidentifikator og en tilfeldig installasjonstoken som Expo bruker for å behandle oppdaterings- og brukshendelser. Vi bruker denne informasjonen for å drifte, vedlikeholde, feilsøke og forbedre appen. Denne telemetrien er ikke ment å identifisere deg direkte som enkeltperson.",
    sharingTitle: "Deling av personopplysninger",
    sharingBody:
      "Vi selger ikke dine personopplysninger og deler dem ikke med tredjeparter for annonseringsformål. Vi bruker tjenesteleverandører der det er nødvendig for å drifte appen, inkludert Expo for oppdateringslevering og operasjonell telemetri. Informasjonen som vises i appen er ellers kun tilgjengelig for deg og autorisert personell på Kvarteret.",
    rightsTitle: "Dine rettigheter",
    rightsItems: [
      "Få innsyn i hvilke personopplysninger vi har om deg",
      "Kreve retting av feilaktige opplysninger",
    ],
    changesTitle: "Endringer i personvernerklæringen",
    changesBody:
      "Vi forbeholder oss retten til å oppdatere denne personvernerklæringen. Større endringer vil bli varslet via e-post eller i appen.",
    contactTitle: "Kontaktinformasjon",
    contactIntro:
      "For spørsmål om personvern eller utøvelse av dine rettigheter, kontakt:",
    emailLabel: "E-post",
    addressLabel: "Adresse",
    updatedLabel: "Sist oppdatert: 02/03/2026",
  },
  en: {
    title: "Privacy Policy for Kvarteret",
    introTitle: "About the App",
    introBody:
      "This app (hereinafter referred to as: Kvarteret) lets you display your digital internal ID at Det Akademiske Kvarter.",
    personalDataTitle: "What Personal Data We Process",
    personalDataItems: [
      "Name",
      "Email address",
      "Date of birth",
      "Positions and affiliations within the organization",
      "Profile picture",
      "Membership status",
    ],
    usageTitle: "How We Use Personal Data",
    usageItems: [
      "Verify your identity during login",
      "Display your digital membership ID",
      "Show your status and rights within the organization",
    ],
    storageTitle: "Data Storage",
    storageBody:
      "Kvarteret stores limited data locally on the device to improve performance and reliability. This may include cached membership information, event content, and images. Local cache data is used only to make Kvarteret faster and more reliable, and is refreshed or replaced when newer data is available.",
    securityTitle: "Security",
    securityItems: ["Login is done through secure two-factor authentication with email"],
    telemetryTitle: "Operational Telemetry and Update Services",
    telemetryBody:
      "We use Expo services, including EAS Update and EAS Insights, to deliver app updates and monitor technical app usage. This may include technical information such as app version, platform, operating system version, update adoption, project identifier, and a randomized installation token used by Expo to process update and usage events. We use this information to operate, maintain, troubleshoot, and improve the app. This telemetry is not intended to directly identify you as an individual user.",
    sharingTitle: "Sharing of Personal Data",
    sharingBody:
      "We do not sell your personal data or share it with third parties for advertising purposes. We use service providers where necessary to operate the app, including Expo for update delivery and operational telemetry. The information displayed in the app is otherwise only accessible to you and authorized personnel at Kvarteret.",
    rightsTitle: "Your Rights",
    rightsItems: [
      "Access what personal data we have about you",
      "Request correction of incorrect information",
    ],
    changesTitle: "Changes to the Privacy Policy",
    changesBody:
      "We reserve the right to update this privacy policy. Significant changes will be notified via email or in the app.",
    contactTitle: "Contact Information",
    contactIntro:
      "For questions about privacy or to exercise your rights, contact:",
    emailLabel: "Email",
    addressLabel: "Address",
    updatedLabel: "Last updated: 02/03/2026",
  },
};

export const getStaticProps: GetStaticProps<PrivacyPolicyPageProps> = async (
  context
) => {
  const locale = (context.locale === "en" ? "en" : "no") as SupportedLocale;
  const layout = await fetchLayoutData(context.locale);

  return {
    props: {
      layout,
      translations: await getTranslationsData(context.locale, []),
      locale,
    },
    revalidate: 60 * 60 * 4,
  };
};

export default function PrivacyPolicyPage({
  locale,
}: PrivacyPolicyPageProps) {
  const content = PRIVACY_POLICY_CONTENT[locale];

  return (
    <>
      <NextSeo
        title={content.title}
        titleTemplate="%s | Kvarteret.no"
        description={content.introBody}
      />
      <div className="page">
        <article className="policy">
          <h1>{content.title}</h1>

          <section>
            <h2>{content.introTitle}</h2>
            <p>{content.introBody}</p>
          </section>

          <section>
            <h2>{content.personalDataTitle}</h2>
            <ul>
              {content.personalDataItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{content.usageTitle}</h2>
            <ol>
              {content.usageItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2>{content.storageTitle}</h2>
            <p>{content.storageBody}</p>
          </section>

          <section>
            <h2>{content.securityTitle}</h2>
            <ul>
              {content.securityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{content.telemetryTitle}</h2>
            <p>{content.telemetryBody}</p>
          </section>

          <section>
            <h2>{content.sharingTitle}</h2>
            <p>{content.sharingBody}</p>
          </section>

          <section>
            <h2>{content.rightsTitle}</h2>
            <ul>
              {content.rightsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{content.changesTitle}</h2>
            <p>{content.changesBody}</p>
          </section>

          <section>
            <h2>{content.contactTitle}</h2>
            <p>{content.contactIntro}</p>
            <p>
              <strong>{content.emailLabel}:</strong>{" "}
              <a href="mailto:it.leder@kvarteret.no">it.leder@kvarteret.no</a>
            </p>
            <p>
              <strong>{content.addressLabel}:</strong> Det Akademiske Kvarter,
              Olav Kyrres gate 49, 5015 Bergen
            </p>
          </section>

          <p className="updated">{content.updatedLabel}</p>
        </article>
      </div>
      <style jsx>{`
        .page {
          max-width: 1080px;
          margin: 0 auto 48px;
          padding: 24px 40px 0;
        }

        .policy {
          background: white;
          padding: 32px;
        }

        section + section {
          margin-top: 28px;
        }

        h1 {
          margin-bottom: 24px;
        }

        h2 {
          margin-bottom: 12px;
        }

        p,
        li {
          font-size: 18px;
          line-height: 1.65;
          color: #111827;
        }

        ul,
        ol {
          margin: 0;
          padding-left: 28px;
        }

        .updated {
          margin-top: 36px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .page {
            padding: 16px 20px 0;
          }

          .policy {
            padding: 24px 20px;
          }

          p,
          li {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
