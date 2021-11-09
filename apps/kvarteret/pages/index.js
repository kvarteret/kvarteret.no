import Carousel from "../components/Carousel";
import fetchIndexData from "../lib";
import fetchLayoutData from "../lib/layout";

export async function getStaticProps(context) {
  const layout = await fetchLayoutData(context.locale);
  const indexData = await fetchIndexData(context.locale);

  console.log("LOCALE", indexData);
  return {
    props: {
      layout: layout,
      data: indexData,
    },
    revalidate: 60,
  };
}


export default function Index({ data }) {
  return (
    <div className="container">
      <Carousel carouselItems={data.carouselItems} />

      <div className="content">
        Hello world
      </div>
      <style jsx>
        {`
          .container {
            height: 120vh;
          }

          .content {
            max-width: 1300px;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
}
