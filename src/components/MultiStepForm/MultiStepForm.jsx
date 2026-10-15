import { useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiLoader,
  FiRefreshCw,
} from 'react-icons/fi';
import { trackEvent } from '../../lib/pixel.js';
import './MultiStepForm.css';

const PRODUCT_OPTIONS = [
  { value: 'men', label: 'Ansh Ayurveda For Men' },
  { value: 'women', label: 'Ansh Ayurveda For Women' },
  { value: 'both', label: 'दोनों उत्पाद' },
  { value: 'info', label: 'पहले जानकारी चाहिए' },
];

const CONTACT_METHODS = [
  { value: 'phone', label: 'फ़ोन कॉल' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'ईमेल' },
];

const STEPS = ['आपकी जानकारी', 'उत्पाद चुनें', 'समीक्षा और पुष्टि'];

const initialValues = {
  name: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  product: '',
  quantity: '1',
  preferred: 'phone',
  message: '',
};

const isValidMobile = (value) => /^[6-9]\d{9}$/.test(value.trim());
const isValidPincode = (value) => /^[1-9]\d{5}$/.test(value.trim());

function Field({ label, name, value, error, onChange, textarea, ...rest }) {
  const id = `field-${name}`;
  return (
    <div className={`multi-step-form__field ${error ? 'multi-step-form__field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          rows="2"
          {...rest}
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          {...rest}
        />
      )}
      {error && <span className="multi-step-form__error">{error}</span>}
    </div>
  );
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (values.name.trim().length < 2) errs.name = 'कृपया अपना पूरा नाम लिखें।';
      if (!isValidMobile(values.phone)) errs.phone = 'कृपया 10 अंकों का सही भारतीय मोबाइल नंबर लिखें।';
      if (values.address.trim().length < 8) errs.address = 'कृपया पूरा पता लिखें।';
      if (!values.city.trim()) errs.city = 'कृपया शहर लिखें।';
      if (!values.state.trim()) errs.state = 'कृपया राज्य लिखें।';
      if (!isValidPincode(values.pincode)) errs.pincode = 'कृपया 6 अंकों का सही पिन कोड लिखें।';
    } else if (s === 2) {
      if (!values.product) errs.product = 'कृपया उत्पाद का विकल्प चुनें।';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const productLabel = PRODUCT_OPTIONS.find((o) => o.value === values.product)?.label || '—';
  const contactLabel = CONTACT_METHODS.find((o) => o.value === values.preferred)?.label || '—';

  const confirm = () => {
    setSubmitting(true);
    // Facebook Pixel इवेंट — Pixel ID .env की VITE_FB_PIXEL_ID से आता है।
    trackEvent('Lead', { content_name: productLabel, content_category: 'Ansh Ayurveda' });
    // यह एक फ्रंट-एंड डेमो है — कोई डेटा किसी सर्वर पर नहीं भेजा जाता।
    setTimeout(() => {
      setSubmitting(false);
      setComplete(true);
    }, 900);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setStep(1);
    setComplete(false);
  };

  return (
    <section className="multi-step-form section" id="order">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">जानकारी भेजें</p>
          <h2 className="section-title">अपनी जानकारी भरें</h2>
          <p className="section-subtitle">
            नीचे दिए गए फॉर्म को भरकर हमें अपनी आवश्यकता बताएँ। यह एक डेमो फॉर्म है — भरी गई जानकारी
            किसी सर्वर पर नहीं भेजी जाती।
          </p>
        </div>

        <div className="multi-step-form__card" data-reveal="zoom">
          <div className="multi-step-form__progress" aria-hidden="true">
            <div className="multi-step-form__steps">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const isDone = step > n;
                const isActive = step === n;
                return (
                  <div
                    className={`multi-step-form__step ${
                      isActive ? 'multi-step-form__step--active' : ''
                    } ${isDone ? 'multi-step-form__step--done' : ''}`}
                    key={label}
                  >
                    <span className="multi-step-form__dot">{isDone ? <FiCheck /> : n}</span>
                    <span className="multi-step-form__step-label">{label}</span>
                  </div>
                );
              })}
            </div>
            <div className="multi-step-form__track">
              <span style={{ width: `${((step - 1) / 2) * 100}%` }} />
            </div>
          </div>
          {complete ? (
            <div className="multi-step-form__success" role="status">
              <FiCheckCircle className="multi-step-form__success-icon" />
              <h3>धन्यवाद!</h3>
              <p>
                आपकी जानकारी इस डेमो फॉर्म में सफलतापूर्वक दर्ज हो गई है। यह जानकारी किसी सर्वर पर नहीं
                भेजी गई है।
              </p>
              <button type="button" className="btn btn--primary" onClick={resetForm}>
                <FiRefreshCw />
                नया फॉर्म भरें
              </button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="multi-step-form__fields">
                  <div className="multi-step-form__row">
                    <Field
                      label="पूरा नाम *"
                      name="name"
                      value={values.name}
                      error={errors.name}
                      onChange={update}
                      placeholder="अपना नाम लिखें"
                      autoComplete="name"
                    />
                    <Field
                      label="मोबाइल नंबर *"
                      name="phone"
                      value={values.phone}
                      error={errors.phone}
                      onChange={update}
                      placeholder="10 अंकों का मोबाइल नंबर"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel-national"
                    />
                  </div>

                  <Field
                    label="पूरा पता *"
                    name="address"
                    value={values.address}
                    error={errors.address}
                    onChange={update}
                    placeholder="मकान, सड़क, इलाका"
                    textarea
                    autoComplete="street-address"
                  />

                  <div className="multi-step-form__row multi-step-form__row--three">
                    <Field
                      label="शहर *"
                      name="city"
                      value={values.city}
                      error={errors.city}
                      onChange={update}
                      placeholder="शहर"
                      autoComplete="address-level2"
                    />
                    <Field
                      label="राज्य *"
                      name="state"
                      value={values.state}
                      error={errors.state}
                      onChange={update}
                      placeholder="राज्य"
                      autoComplete="address-level1"
                    />
                    <Field
                      label="पिन कोड *"
                      name="pincode"
                      value={values.pincode}
                      error={errors.pincode}
                      onChange={update}
                      placeholder="6 अंक"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="multi-step-form__fields">
                  <div className="multi-step-form__field">
                    <span className="multi-step-form__legend">उत्पाद चुनें *</span>
                    <div className="multi-step-form__options">
                      {PRODUCT_OPTIONS.map((opt) => (
                        <label
                          className={`multi-step-form__option ${
                            values.product === opt.value
                              ? 'multi-step-form__option--selected'
                              : ''
                          }`}
                          key={opt.value}
                        >
                          <input
                            type="radio"
                            name="product"
                            value={opt.value}
                            checked={values.product === opt.value}
                            onChange={update}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.product && (
                      <span className="multi-step-form__error">{errors.product}</span>
                    )}
                  </div>

                  <div className="multi-step-form__row">
                    <Field
                      label="मात्रा (Quantity)"
                      name="quantity"
                      type="number"
                      min="1"
                      max="99"
                      value={values.quantity}
                      onChange={update}
                    />
                    <div className="multi-step-form__field">
                      <span className="multi-step-form__legend">संपर्क का तरीका</span>
                      <div className="multi-step-form__options multi-step-form__options--inline">
                        {CONTACT_METHODS.map((method) => (
                          <label key={method.value} className="multi-step-form__option">
                            <input
                              type="radio"
                              name="preferred"
                              value={method.value}
                              checked={values.preferred === method.value}
                              onChange={update}
                            />
                            <span>{method.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Field
                    label="संदेश (वैकल्पिक)"
                    name="message"
                    value={values.message}
                    onChange={update}
                    placeholder="अपना संदेश यहाँ लिखें"
                    textarea
                  />
                </div>
              )}

              {step === 3 && (
                <div className="multi-step-form__summary">
                  <h3>अपनी जानकारी की समीक्षा करें</h3>
                  <dl>
                    <div><dt>पूरा नाम</dt><dd>{values.name}</dd></div>
                    <div><dt>मोबाइल नंबर</dt><dd>{values.phone}</dd></div>
                    <div><dt>पूरा पता</dt><dd>{values.address}</dd></div>
                    <div><dt>शहर</dt><dd>{values.city}</dd></div>
                    <div><dt>राज्य</dt><dd>{values.state}</dd></div>
                    <div><dt>पिन कोड</dt><dd>{values.pincode}</dd></div>
                    <div><dt>उत्पाद</dt><dd>{productLabel}</dd></div>
                    <div><dt>मात्रा</dt><dd>{values.quantity}</dd></div>
                    <div><dt>संपर्क का तरीका</dt><dd>{contactLabel}</dd></div>
                    {values.message && (
                      <div className="multi-step-form__summary-wide">
                        <dt>संदेश</dt>
                        <dd>{values.message}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              <div className="multi-step-form__actions">
                {step > 1 ? (
                  <button type="button" className="btn btn--outline" onClick={back}>
                    <FiArrowLeft />
                    पिछला चरण
                  </button>
                ) : (
                  <span />
                )}

                {step < 3 ? (
                  <button type="button" className="btn btn--primary" onClick={next}>
                    आगे बढ़ें
                    <FiArrowRight />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn--gold"
                    onClick={confirm}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <FiLoader className="multi-step-form__spin" />
                        प्रक्रिया जारी है…
                      </>
                    ) : (
                      <>
                        <FiCheckCircle />
                        जानकारी की पुष्टि करें
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
