const ExternalContent = ({ html }) => (
  <div>
    <div className="external-content" dangerouslySetInnerHTML={{ __html: html }}></div>
    <style jsx global>
      {`
        .external-content h1 span {
          font-weight: unset !important; 
        }

        .external-content h1 {
          font-size: 40px;
        }

        .external-content * {
          max-width: 100%;
        }

        .external-content table, .external-content tr, .external-content td, .external-content th {
          border: none;
        }
        
        .external-content td, .external-content th {
          padding: 15px;
        }
      `}
    </style>
  </div>
  
);

export { ExternalContent };
