const ExternalContent = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }}></div>
);

export { ExternalContent };
