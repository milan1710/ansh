import { useCallback, useEffect, useRef, useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiUsers } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './CustomerGallery.css';

const photos = assets.gallery;

const altText = (index) => `अन्श आयुर्वेद का खुश परिवार — तस्वीर ${index + 1}`;

export default function CustomerGallery() {
  const [active, setActive] = useState(-1);
  const closeRef = useRef(null);

  const total = photos.length;
  const isOpen = active >= 0;

  const close = useCallback(() => setActive(-1), []);
  const showNext = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const showPrev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close, showNext, showPrev]);

  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus();
    }
  }, [isOpen]);

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">हमारे खुश ग्राहक</p>
          <h2 className="section-title">Happy Customers — खुशियों की कुछ यादगार तस्वीरें</h2>
          <p className="section-subtitle">
            देश भर के हज़ारों जोड़ों ने अन्श आयुर्वेद पर भरोसा किया और माता-पिता बनने की खुशी पाई।
            इनमें से कुछ खुश परिवारों की तस्वीरें यहाँ देखिए।
          </p>
        </div>

        <div className="gallery__bar" data-reveal data-reveal-delay="120">
          <FiUsers aria-hidden="true" />
          <strong>3000+ खुश परिवार</strong>
          <span>{total} तस्वीरें — बड़ी करके देखने के लिए किसी भी तस्वीर पर क्लिक करें।</span>
        </div>

        <ul className="gallery__grid" data-reveal="zoom">
          {photos.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                className="gallery__item"
                onClick={() => setActive(index)}
                aria-label={`${altText(index)} — बड़ी करके देखें`}
              >
                <img src={src} alt={altText(index)} loading="lazy" decoding="async" />
                <span className="gallery__overlay" aria-hidden="true">
                  <FiZoomIn />
                  <em>खुश परिवार</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="खुश ग्राहकों की तस्वीरें"
          onClick={close}
        >
          <button
            type="button"
            className="gallery__close"
            onClick={close}
            ref={closeRef}
            aria-label="तस्वीर बंद करें"
          >
            <FiX aria-hidden="true" />
          </button>

          <button
            type="button"
            className="gallery__nav gallery__nav--prev"
            aria-label="पिछली तस्वीर"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <figure className="gallery__stage" onClick={(event) => event.stopPropagation()}>
            <img src={photos[active]} alt={altText(active)} />
            <figcaption>
              <span>खुश परिवार — अन्श आयुर्वेद</span>
              <em>
                {active + 1} / {total}
              </em>
            </figcaption>
          </figure>

          <button
            type="button"
            className="gallery__nav gallery__nav--next"
            aria-label="अगली तस्वीर"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
