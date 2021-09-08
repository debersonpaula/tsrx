import React from 'react';
import Image from '../assets/image.jpg';
import ImageWebP from '../assets/sample.webp';

export default function ImageApp() {
  return (
    <div>
      <h4>Testing image</h4>

      <div>
        <p>image.jpg</p>
        <img src={Image} />
      </div>

      <div>
        <p>sample.webp</p>
        <img src={ImageWebP} />
      </div>
    </div>
  );
}
