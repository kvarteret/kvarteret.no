import { BlurImage } from "dak-components";
import Carousel from "dak-components/lib/components/Carousel";
import fetchLayoutData from "../lib/layout";
import queryAllPageSlugs, { queryPageBySlug } from "../lib/queries/page";
import { NextSeo } from 'next-seo';

export async function getStaticPaths() {
    const slugs = await queryAllPageSlugs();

    const paths = slugs.map(x=> ({params: {id: x.slug}}));

    return {
        paths,
        fallback: "blocking"
    }


}

export async function getStaticProps({locale, params}) {
    const layout = await fetchLayoutData(locale);
    const page = await queryPageBySlug(locale, params.id);
    
    if(!page) {
      return {
        props: {},
        notFound: true,
        revalidate: 60,
      }
    }
    return {
      props: {
        layout: layout,
        data: page,
      },
      revalidate: 60,
    };
}

const Snippet = ({snippet}) => snippet && <div>
  <h1>{snippet.title}</h1>
  <div dangerouslySetInnerHTML={{__html: snippet.code}} />
</div> || <></>

const CarouselComponent = ({item}) => {
  return <div className="container">
    <BlurImage 
          className="carousel-image"
          fadeIn
          image={item}
          objectFit="cover"
          layout="fill"/>
    <style jsx>
      {`
      .container {
        width: 100%;
        height: 25vw;
        min-height: 350px;
      }
      `}
    </style>
  </div>
}

export default function Page({data}) {
    return <div className="container">
      <NextSeo
      titleTemplate="%s | Kvarteret.no"
        title={data?.translations[0]?.title}
        defaultTitle="Kvarteret.no"
        description={data?.translations[0]?.description}
      
      />
      <div className="carousel">
        <Carousel carouselItems={data.gallery?.map(x=>x.directus_files_id)} component={CarouselComponent} />
        {/* <BlurImage image={data.gallery[0]?.directus_files_id} width="200" height="50"/> */}
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{__html: data?.translations[0]?.content}}></div>

      </div>

      <div className="snippets">

        <Snippet snippet={data.translations[0]?.snippets[0]} />
      </div>

      <style jsx>
        {`
        .container {
          display: grid;
          grid-template-rows: auto auto auto;
          grid-template-columns: auto;
        }

        .carousel {
          max-width: 100vw;
          margin-top: 80px;
        }

        .content, .carousel, .snippets {
        }

        .content, .snippets {
          padding: 20px;
        }

        @media only screen and (min-width: 768px) {
            .container {
              flex-direction: row;
              margin-top: 120px;
              grid-template-columns: 50% 50%;
              grid-template-rows: auto auto;
              padding: 0 40px;
              gap: 20px;
            }
              .content, .carousel, .snippets {
                width: calc(100% - 20px);
              }

              .content {
                grid-column: 1;
                grid-row: 1 / span 2;
              }

              .carousel {
                grid-column: 2;
                grid-row: 1;
                margin-top: 0;
              }

              .snippets {
                grid-column: 2;
                grid-row: 2;
              }
            }
        `}
      </style>
    </div>
}