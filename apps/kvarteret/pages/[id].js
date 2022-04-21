import fetchLayoutData from "dak-components/lib/cms/layout";
import queryAllPageSlugs, { queryPageBySlug } from "dak-components/lib/cms/queries/page";
import Page from "../components/Page";

export async function getStaticPaths() {
    const slugs = await queryAllPageSlugs();
    const paths = slugs.map(x=> ({params: {id: x.slug}}));

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
      },
      revalidate: 60 * 1, // Hvert minutt TODO: Invalidate så slipper vi dette! 
    };
}

export default Page
