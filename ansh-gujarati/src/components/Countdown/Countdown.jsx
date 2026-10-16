import { useEffect, useState } from 'react';
import './Countdown.css';

// आज रात 12 बजे (स्थानीय समय) तक बचा समय निकालता है।
function msUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, midnight.getTime() - now.getTime());
}

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown({ label = 'આજનો ઓફર પૂરો થવામાં' }) {
  const [remaining, setRemaining] = useState(() => msUntilMidnight());

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(msUntilMidnight()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = pad(Math.floor(totalSeconds / 3600));
  const minutes = pad(Math.floor((totalSeconds % 3600) / 60));
  const seconds = pad(totalSeconds % 60);

  return (
    <div className="countdown">
      <span className="countdown__label">{label}</span>
      <div className="countdown__clock" role="timer" aria-live="off">
        <span className="countdown__unit">
          <strong>{hours}</strong>
          <em>કલાક</em>
        </span>
        <span className="countdown__sep" aria-hidden="true">
          :
        </span>
        <span className="countdown__unit">
          <strong>{minutes}</strong>
          <em>મિનિટ</em>
        </span>
        <span className="countdown__sep" aria-hidden="true">
          :
        </span>
        <span className="countdown__unit">
          <strong>{seconds}</strong>
          <em>સેકન્ડ</em>
        </span>
      </div>
    </div>
  );
}
