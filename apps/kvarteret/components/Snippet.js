
const Snippet = ({snippet}) => snippet && <div>
<h2>{snippet.title}</h2>
<div dangerouslySetInnerHTML={{__html: snippet.code}} />
</div> || <></>


export default Snippet;