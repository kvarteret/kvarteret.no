import { BlurImage, ExternalContent } from "dak-components";
import { format } from "date-fns";
import Snippet from "../../components/Snippet";
import fetchLayoutData from "dak-components/lib/cms/layout";
import queryAllEventSlugs, { queryEventBySlug } from "dak-components/lib/cms/queries/events";
import isResourceAvailable from "dak-components/lib/cms/utils/statusUtils";

export async function getStaticPaths() {
  const slugs = await queryAllEventSlugs();
  const paths = slugs
    .filter((x) => x.metadata?.slug)
    .map((x) => ({ params: { id: x.metadata?.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ locale, params, preview }) {
  const layout = await fetchLayoutData(locale);
  const data = await queryEventBySlug(locale, params.id);
  if (!data || !isResourceAvailable(data.status, preview)) {
    return {
      props: { layout: layout },
      notFound: true,
      revalidate: 1,
    };
  }

  const rooms = data.room.map(x=>x.room_id.name).join(", ");


  return {
    props: {
      layout: layout,
      data: {
        event_header: data.event_header,
        title: data.translations[0].title,
        description: data.translations[0].description,
        content: data.translations[0].content,
        snippets: data.translations[0].snippets,
        practicalInformation: [
          {
            icon: "dak-clock",
            title: "Tidspunkt",
            text: `${format(new Date(data.event_start), "dd. MMMM yyyy")} kl. ${format(new Date(data.event_start), "HH:mm")} - ${format(new Date(data.event_end), "HH:mm")}`
          },
          {
            icon: "dak-location",
            title: "Sted",
            text: rooms
          },
          {
            icon: "dak-group",
            title: "Arrangør",
            text: "Bergen Realistforening"
          },
          ...(data.translations[0].practical_information || [])
        ]
      },
    },
    revalidate: 1,
  };
}

const PracticalInformationLine = ({ icon, title, text }) => {
  if(typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('startDate');
    if(title === "Tidspunkt" && myParam) {
      const time = text.split("kl.")[1];
      text = `${format(new Date(myParam), "dd. MMMM yyyy")} ${time}`
    }
  }
  return (
    <div className="container">
      <div className="icon-container">
      <div className={`icon ${icon ? icon : ""}`} />

      </div>
      <div className="text-container">
        <div className="title">{title}</div>
        <div className="text">{text}</div>
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

export default function Page({ data }) {


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
            {data?.practicalInformation?.map((x, i) => <PracticalInformationLine {...x} key={i} />)}
          </div>
          <div className="content">
            <h1>{data.title}</h1>
            <ExternalContent html={data.content} />
          </div>
          <div className="snippets mobile">
            {data.snippets?.map((x, i) => <Snippet key={i} snippet={x}/>)}
          </div>
        </div>
        <div className="right-content desktop">
          <div className="practical-info">
            <h2>Praktisk informasjon</h2>
            {data?.practicalInformation?.map((x, i) => <PracticalInformationLine {...x} key={i} />)}
          </div>
          <div className="snippets">
            {data.snippets?.map((x, i) => <Snippet key={i} snippet={x}/>)}
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
            margin-top:80px;
            position: relative;
            height: 200px;
          }

          .top-image {
            width: 100%;
          }

          @media only screen and (min-width: 800px) {
            .top-image {
              position: relative;
              height: 400px;
              margin-top:0px;
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
