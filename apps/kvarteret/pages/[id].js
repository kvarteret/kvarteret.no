import { BlurImage } from "dak-components";
import Carousel from "../components/Carousel";
import fetchLayoutData from "../lib/layout";
import queryAllPageSlugs, { queryPageBySlug } from "../lib/queries/page";

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


export default function Page({data}) {
    return <div className="container">
      <div>
        <div dangerouslySetInnerHTML={{__html: data?.translations?.at(0)?.content}}></div>

      </div>
      <div>
        <BlurImage image={data.gallery.at(0)} width="200" height="50"/>
      </div>

      <style jsx>
        {`
        .container {
          margin: 40px;
          margin-top: 120px;
          display: grid;
          grid-template-columns: 50% 50%;
          min-height: 400px;
        }
        `}
      </style>
    </div>
}