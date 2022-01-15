import { BlurImage } from "dak-components";
import fetchLayoutData from "../lib/layout";
import queryAllPageSlugs, { queryPageBySlug } from "../lib/queries/page";
import { NextSeo } from 'next-seo';
import Snippet from "../components/Snippet";
import Page from "../components/Page";

export async function getStaticPaths() {
    const slugs = await queryAllPageSlugs();

    const paths = slugs.map(x=> ({params: {id: x.metadata?.slug}}));

    return {
        paths,
        fallback: "blocking"
    }


}

export async function getStaticProps({locale, params, preview, previewData}) {
    const layout = await fetchLayoutData(locale);
    let page = await queryPageBySlug(locale, params.id);
    
    if(!page) {
      return {
        props: {},
        notFound: true,
        revalidate: 1,
      }
    }

    page = {...page, ...page.translations[0]};

    return {
      props: {
        layout: layout,
        data: page,
        test: previewData || {}
      },
      revalidate: 1,
    };
}

export default Page
