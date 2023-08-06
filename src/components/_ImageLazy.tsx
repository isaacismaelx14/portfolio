import Image, { ImageProps } from 'next/image';
import React from 'react';

interface IProps extends ImageProps {
    borderradius?: string;
}

function ImageLazy(imageProp: IProps) {
    return (
        <div className={`lazy_load-image`}>
            <Image loading="lazy" {...imageProp} alt={imageProp.alt} />
        </div>
    );
}

export default ImageLazy;
