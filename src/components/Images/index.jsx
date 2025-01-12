import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { FrownOutlined } from '@ant-design/icons';

import { cloudinary } from '~/config';
import { GetConfigLayout } from '~/context/configProvider';
import style from './style.module.scss';

const ImagesComponent = React.memo(({ images }) => {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const imgArray = React.useMemo(() => {
    const cld = new Cloudinary({ cloud: { cloudName: cloudinary.config.cloud_name } });
    return images.map((image) =>
      cld.image(image.id).format('auto').quality('auto').resize(auto().gravity(autoGravity())),
    );
  }, [images]);

  // State to track error for each image
  const [errorIndexes, setErrorIndexes] = React.useState([]);

  const handleErrorImage = (index) => {
    setErrorIndexes((prev) => [...prev, index]);
  };

  const handleClickImage = () => {};

  return (
    <div className={style['image-wapper']}>
      {imgArray.map((data, index) => {
        if (errorIndexes.includes(index)) {
          return (
            <div key={index} className={style['fallback-image']}>
              <FrownOutlined />
              <span className={style['text-error-image']}>{getLanguageValue(languageSelected, 'loiAnh')}</span>
            </div>
          );
        }
        return (
          <AdvancedImage
            draggable="false"
            loading="lazy"
            onClick={handleClickImage}
            key={index}
            className={style['img-item']}
            cldImg={data}
            onError={() => handleErrorImage(index)}
          />
        );
      })}
    </div>
  );
});

export default ImagesComponent;
