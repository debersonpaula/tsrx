import React from 'react';
import Image from '../assets/image.jpg';

export default function ImageApp() {
  return (
    <div>
      <h4>Testing image</h4>
      <img src={Image} />
    </div>
  );
}
