import React, {useState} from 'react'
import Image from 'next/image'

import styles from '../styles/BlurImage.module.css'

export default function BlurImage(props) {
    const [loading, setLoading] = useState(true);
    const imageId = props.imageId;
    const data = {...props};
    delete data.imageId;
    const base64 = props.base64;
    if(base64) {
        return (
            <Image
            src={`https://cms.kvarteret.no/assets/${imageId}`}
            blurDataURL={base64}
            placeholder="blur"
            {...data}
            />
        )
    }

    return (
        <div>
            <Image
                src={`https://cms.kvarteret.no/assets/${imageId}`}
                onLoadingComplete={() => setLoading(false)}
                {...data}
                />
            <div className={loading ? styles.loading : styles.loadingComplete }>
                <Image
                    src={`https://cms.kvarteret.no/assets/${imageId}?width=5&height=5&transforms=[["blur",%205]]`}
                    
                    {...data}
                    />
            </div>
        </div>
    )
}