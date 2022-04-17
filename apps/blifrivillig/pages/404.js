import { Custom404 } from "dak-components";
import fetchLayoutData from "dak-components/lib/cms/layout";

export async function getStaticProps(context) {
    const layout = await fetchLayoutData(context.locale);
  
    return {
      props: {
        layout: layout,
      },
      revalidate: 1,
    };
  }
  
export default Custom404