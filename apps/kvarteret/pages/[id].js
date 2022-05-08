import fetchLayoutData from "dak-components/lib/cms/layout";
import queryAllPageSlugs, { queryPageBySlug } from "dak-components/lib/cms/queries/page";
import { getTranslationsData } from "dak-components/lib/components/TranslatedField";
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
        translations: await getTranslationsData(locale, []),
        layout: layout,
        data: page,
      },
      revalidate: 60 * 60, // Hver time
    };
}

export default Page
