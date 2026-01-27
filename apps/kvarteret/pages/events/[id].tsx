import { BlurImage, ExternalContent } from "dak-components";
import { format, isSameDay } from "date-fns";
import Snippet from "../../components/Snippet";
import fetchLayoutData from "dak-components/lib/cms/layout";
import queryAllEventSlugs, {
  getCorrectTranslation,
  Locale,
  queryEventBySlug,
} from "dak-components/lib/cms/queries/events";
import isResourceAvailable from "dak-components/lib/cms/utils/statusUtils";
import { getFirestoreEventBySlug } from "dak-components/lib/firestore";
import { getTranslationsData } from "dak-components/lib/components/TranslatedField";
import { InferGetStaticPropsType } from "next";

export async function getStaticPaths() {
  const slugs = await queryAllEventSlugs();
  const paths = slugs
    .filter((x) => x.slug)
    .map((x) => ({ params: { id: x.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  locale,
  params,
  preview,
}: {
  locale: Locale;
  params: { id: string; [key: string]: any };
  preview: boolean;
}) {
  const layout = await fetchLayoutData(locale);
  let data = await queryEventBySlug(locale, params.id);

  // Try Firestore as fallback
  if (!data || !isResourceAvailable(data.status, preview)) {
    try {
      data = await getFirestoreEventBySlug(params.id);
    } catch (e) {
      console.error(e);
    }
  }

  if (!data || !isResourceAvailable(data.status, preview)) {
    return {
      props: {
        layout: layout,
      },
      notFound: true,
      revalidate: 1,
    };
  }

  const formatDate = () => {
    const start = new Date(data.event_start);
    const end = new Date(data.event_end);
    if (isSameDay(start, end)) {
      return `${format(start, "dd. MMMM yyyy 'kl.' HH:mm")} - ${format(
        end,
        "HH:mm"
      )}`;
    }

    return `${format(start, "dd. MMMM yyyy 'kl.' HH:mm")} - ${format(
      end,
      "dd. MMMM yyyy 'kl.' HH:mm"
    )}`;
  };

  const translationOfEvent = getCorrectTranslation(data.translations, locale);
  const isMissingTranslationText =
    translationOfEvent.languages_code?.url_code != locale
      ? locale == "en"
        ? "Event has not been translated to english yet"
        : "Event har ikke norsk oversettelse"
      : null;
  return {
    props: {
      layout: layout,
      translations: await getTranslationsData(locale, []),
      isMissingTranslationText,
      data: {
        event_header: data.event_header,
        title: translationOfEvent.title,
        description: translationOfEvent.description,
        content: translationOfEvent.content,
        snippets: translationOfEvent.snippets,
        practicalInformation: [
          {
            icon: "dak-clock",
            title: "Tidspunkt",
            text: formatDate(),
          },
          {
            icon: "dak-location",
            title: "Sted",
            text: data.room?.map((x) => x.room_id?.name).join(", ") || "",
          },
          {
            icon: "dak-group",
            title: "Arrangør",
            text: data.organizer?.name || "",
          },
          {
            icon: "dak-info-circled",
            title: "Kategorier",
            text: data.categories?.map((x) => x.name)?.join(", ") || "",
          },
          ...(data.price
            ? [
                {
                  icon: "dak-price",
                  title: "Pris",
                  text: data.price.toString() || null,
                },
              ]
            : []),
          ...(data.ticket_url && data.ticket_url != ""
            ? [
                {
                  icon: "dak-ticket",
                  title: "Billett",
                  text: "Billett link",
                  url: data.ticket_url,
                },
              ]
            : []),
          ...(data.facebook_url && data.facebook_url != ""
            ? [
                {
                  icon: "dak-facebook",
                  title: "Facebook",
                  text: "Facebook link",
                  url: data.facebook_url,
                },
              ]
            : []),
          ...(translationOfEvent.practical_information || []),
        ],
      },
    },
    revalidate: 30, // 30. sekund // TODO: Invalidate så slipper vi dette
  };
}

const PracticalInformationLine = ({
  icon,
  title,
  text,
  url,
}: {
  icon?: string;
  title: string;
  text: string;
  url?: string;
}) => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location?.search ?? "");
    const myParam = urlParams.get("startDate");
    if (title === "Tidspunkt" && myParam) {
      const time = text.split("-")[0].split("kl.")[1];
      text = `${format(new Date(myParam), "dd. MMMM yyyy")} ${time}`;
    }
  }
  return (
    <div className="container">
      <div className="icon-container">
        <div className={`icon ${icon ? icon : ""}`} />
      </div>
      <div className="text-container">
        <div className="title">{title}</div>
        {url ? (
          <a href={url} className="text">
            {text}
          </a>
        ) : (
          <div className="text">{text}</div>
        )}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            min-height: 60px;
            align-items: center;
            gap: 5px;
          }

          .icon-container {
            display: flex;
            width: 60px;
            height: 60px;
            justify-content: center;
            align-items: center;
          }

          .icon {
            font-size: 30px;
          }

          .text-container {
            display: flex;
            flex-direction: column;
          }

          .title {
            color: #282835;
            font-weight: 300;
            font-size: 16px;
          }

          .text {
            font-size: 16px;
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
};

export default function Page({
  data,
  isMissingTranslationText,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="container">
      <div className="top-image">
        <BlurImage
          fadeIn
          objectFit="cover"
          layout="fill"
          image={data.event_header}
        />
      </div>
      <div className="content-container">
        <div className="left-content">
          <div className="practical-info mobile">
            <h2>Praktisk informasjon</h2>
            {data?.practicalInformation
              ?.filter((x) => x.text)
              .map((x, i) => (
                <PracticalInformationLine {...x} key={i} />
              ))}
          </div>
          <div className="content">
            {isMissingTranslationText ? <p>{isMissingTranslationText}</p> : ""}
            <h1>{data.title}</h1>
            <ExternalContent html={data.content} />
          </div>
          <div className="snippets mobile">
            {data.snippets?.map((x, i) => (
              <Snippet key={i} snippet={x} />
            ))}
          </div>
        </div>
        <div className="right-content desktop">
          <div className="practical-info">
            <h2>Praktisk informasjon</h2>
            {data?.practicalInformation
              ?.filter((x) => x.text)
              .map((x, i) => (
                <PracticalInformationLine {...x} key={i} />
              ))}
          </div>
          <div className="snippets">
            {data.snippets?.map((x, i) => (
              <Snippet key={i} snippet={x} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .desktop {
            display: none;
          }
          .left-content {
            width: 100%;
          }
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .content-container {
            display: flex;
            flex-direction: row;
            gap: 30px;
            margin-bottom: 60px;
            padding: 20px;
            width: 100%;
            max-width: 1080px;
          }

          .practical-info.mobile {
            margin-bottom: 20px;
          }

          .top-image {
            margin-top: 80px;
            position: relative;
            height: 200px;
            width: 100%;
            max-width: 1080px;
          }

          @media only screen and (min-width: 800px) {
            .top-image {
              position: relative;
              height: 400px;
              margin-top: 0px;
            }
            .mobile {
              display: none;
            }
            .desktop {
              display: block;
            }
            .right-content,
            .left-content {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
