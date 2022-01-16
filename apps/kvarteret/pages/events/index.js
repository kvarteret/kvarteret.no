import fetchLayoutData from "../../lib/layout";

export async function getStaticProps(context) {
  const layout = await fetchLayoutData(context.locale);

  return {
    props: {
      layout: layout,
    },
    revalidate: 1,
  };
}


// Relevant filter: free-text search, room, arrangør, tags
const EventSearch = () => {
  return (
    <div className="container">
      TODO
      <style jsx>
        {`
          .container {
            margin: auto;
            margin-top: 80px;
            max-width: 1080px;
          }
        `}
      </style>
    </div>
  );
};

export default EventSearch;
