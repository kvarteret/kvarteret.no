const Divider = ({color}) => {
    return <div>
        <style jsx>
            {`
            
            div:after {
                content: " ";
                height: 100%;
                border-left: 1px solid ${color}
            }
            `}
        </style>
    </div>
}

export {Divider};