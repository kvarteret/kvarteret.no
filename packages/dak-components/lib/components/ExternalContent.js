const ExternalContent = ({ html }) => (
  <div>
    <div className="external-content" dangerouslySetInnerHTML={{ __html: html }}></div>
    <style jsx global>
      {`
        .external-content h1 span {
          font-weight: unset !important; 
        }
      `}
    </style>
  </div>
  
);

export { ExternalContent };
