import { CDN_URL } from '../constants';
import { FC, useEffect, useState } from 'react';
import { fetchUploads } from '@/services/upload.service';

interface Props {
  onSelect;
  image?;
}

const Gallery: FC<Props> = ({ onSelect, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!image) return;
    setSelectedImage(image);
  }, [image]);

  useEffect(() => {
    if (!showModal) return;

    (async () => {
      const [err, result] = await fetchUploads();

      if (err) return;

      setImages(result);
    })();
  }, [showModal]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (showModal) {
      body.classList.add('hide-scroll');
      return;
    }
    body.classList.remove('hide-scroll');
  }, [showModal]);

  const handleCloseModal = (e) => {
    if (e.target.id != 'upload-modal-wrapper') return;
    setShowModal(false);
  };

  const handleSelectImage = (image) => {
    onSelect(image);
    setSelectedImage(image);
    setShowModal(false);
  };

  return (
    <>
      {/* #gallery-wrapper start */}
      <div id="gallery-wrapper">
        {/* #selected-image start */}
        <div id="selected-image">
          {selectedImage && (
            <img
              src={`${CDN_URL}/${selectedImage.filename}`}
              alt={selectedImage.filename}
            />
          )}
          {/* #show-modal start */}
          <div id="show-modal" onClick={() => setShowModal(true)}>
            <i className="far fa-redo"></i>
          </div>
          {/* #show-modal end */}
        </div>
        {/* #selected-image end */}
      </div>
      {/* #gallery-wrapper end */}

      {/* .overlay start */}
      {showModal && (
        <>
          <div className="overlay"></div>

          {/* #upload-modal-wrapper start */}
          <div id="upload-modal-wrapper" onClick={handleCloseModal}>
            {/* #upload-modal start */}
            <div id="upload-modal">
              <ListImages images={images} onSelect={handleSelectImage} />
            </div>
            {/* #upload-modal end */}
          </div>
          {/* #upload-modal-wrapper end */}
        </>
      )}
      {/* .overlay end */}
    </>
  );
};

const ListImages = ({ images = [], onSelect }) => {
  return (
    <div id="list-images">
      {/* .image start */}
      {images.map((image, key) => (
        <ImageItem key={key} image={image} onClick={() => onSelect(image)} />
      ))}
      {/* .image end */}
    </div>
  );
};

const ImageItem = ({ image, ...args }) => {
  return (
    <div className="image" {...args}>
      <img src={`${CDN_URL}/${image.filename}`} alt={image.filename} />
      <div className="image-footer">
        <strong>{image.filename}</strong>
        <i className="fas fa-copy copy"></i>
      </div>
    </div>
  );
};

export default Gallery;
