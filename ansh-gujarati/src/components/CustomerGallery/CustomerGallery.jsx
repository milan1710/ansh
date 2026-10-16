import { useCallback, useEffect, useRef, useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiUsers } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './CustomerGallery.css';

const photos = assets.gallery;

const altText = (index) => `અન્શ આયુર્વેદનો ખુશ પરિવાર — તસવીર ${index + 1}`;

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
          <p className="eyebrow">અમારા ખુશ ગ્રાહકો</p>
          <h2 className="section-title">Happy Customers — ખુશીઓની કેટલીક યાદગાર તસવીરો</h2>
          <p className="section-subtitle">
            દેશભરના હજારો દંપતીઓએ અન્શ આયુર્વેદ પર વિશ્વાસ કર્યો અને માતા-પિતા બનવાનું સુખ મેળવ્યું.
            તેમાંથી કેટલાક ખુશ પરિવારોની તસવીરો અહીં જુઓ.
          </p>
        </div>

        <div className="gallery__bar" data-reveal data-reveal-delay="120">
          <FiUsers aria-hidden="true" />
          <strong>3000+ ખુશ પરિવાર</strong>
          <span>{total} તસવીરો — મોટી કરીને જોવા માટે કોઈ પણ તસવીર પર ક્લિક કરો.</span>
        </div>

        <ul className="gallery__grid" data-reveal="zoom">
          {photos.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                className="gallery__item"
                onClick={() => setActive(index)}
                aria-label={`${altText(index)} — મોટી કરીને જુઓ`}
              >
                <img src={src} alt={altText(index)} loading="lazy" decoding="async" />
                <span className="gallery__overlay" aria-hidden="true">
                  <FiZoomIn />
                  <em>ખુશ પરિવાર</em>
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
          aria-label="ખુશ ગ્રાહકોની તસવીરો"
          onClick={close}
        >
          <button
            type="button"
            className="gallery__close"
            onClick={close}
            ref={closeRef}
            aria-label="તસવીર બંધ કરો"
          >
            <FiX aria-hidden="true" />
          </button>

          <button
            type="button"
            className="gallery__nav gallery__nav--prev"
            aria-label="પાછલી તસવીર"
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
              <span>ખુશ પરિવાર — અન્શ આયુર્વેદ</span>
              <em>
                {active + 1} / {total}
              </em>
            </figcaption>
          </figure>

          <button
            type="button"
            className="gallery__nav gallery__nav--next"
            aria-label="આગળની તસવીર"
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
