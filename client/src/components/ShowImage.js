import React from 'react';
import './ShowImage.css';

export default function ShowImage(props) {
  const imgmaxwidth = 400;
  //console.log('ShowImage', props);
  const { maindata, imagefile } = props;
  const img =
    imagefile.path ||
    (maindata.imagefile && maindata.imagefile.path) ||
    (maindata.googleimage &&
      maindata.googleimage.photoreference &&
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${imgmaxwidth}&photoreference=${maindata.googleimage.photoreference}&key=${process.env.REACT_APP_GOOGLEKEY}`) ||
    '';

  if (img === '') return <></>;
  return (
    <div className="outergallery">
      <div className="galleryItem">
        {' '}
        <div className="item">
          <img className="card-image" src={img} alt="demo" />
        </div>{' '}
      </div>
      <div className="imagetext">
        {' '}
        {maindata.googleimage &&
          maindata.googleimage.photoreference &&
          'This is the image in your Google Account!'}
      </div>
    </div>
  );
}
