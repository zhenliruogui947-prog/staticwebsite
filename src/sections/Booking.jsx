import { useMemo, useState } from "react";
import {
  CLOSED_WEEKDAY,
  WEEKDAY_LABELS,
  saveBooking,
  timeSlotsForDate,
  toDateKey,
} from "../lib/bookings";

function buildCalendarDays(viewYear, viewMonth) {
  const firstDay = new Date(viewYear, viewMonth, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // 月曜始まりに変換
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const days = Array.from({ length: startOffset }, () => null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(viewYear, viewMonth, d));
  }
  return days;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function Booking() {
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [memo, setMemo] = useState("");

  const days = useMemo(() => buildCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setConfirmed(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: toDateKey(selectedDate),
      time: selectedTime,
      name: name.trim(),
      contact: contact.trim(),
      memo: memo.trim(),
      createdAt: new Date().toISOString(),
    };
    saveBooking(entry);

    setConfirmed({ ...entry, weekdayLabel: WEEKDAY_LABELS[selectedDate.getDay()] });
    setName("");
    setContact("");
    setMemo("");
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <section id="booking" className="section booking-section">
      <div className="section-heading">
        <p className="eyebrow">Reservation</p>
        <h2>ご希望の日時を選んでご予約ください。</h2>
      </div>
      <div className="booking-panel">
        <div className="booking-calendar">
          <div className="calendar-header">
            <button type="button" aria-label="前の月" onClick={goPrevMonth}>
              ‹
            </button>
            <p>
              {viewYear}年 {viewMonth + 1}月
            </p>
            <button type="button" aria-label="次の月" onClick={goNextMonth}>
              ›
            </button>
          </div>
          <div className="calendar-weekdays">
            <span>月</span>
            <span>火</span>
            <span>水</span>
            <span>木</span>
            <span>金</span>
            <span>土</span>
            <span>日</span>
          </div>
          <div className="calendar-grid">
            {days.map((date, i) => {
              if (!date) {
                return <div key={`empty-${i}`} className="calendar-day is-empty" />;
              }
              const dateKey = toDateKey(date);
              const isPast = date < today;
              const isClosed = date.getDay() === CLOSED_WEEKDAY;
              const slots = timeSlotsForDate(dateKey);
              const isFull = slots.every((s) => s.booked);
              const isSelected = selectedDate ? dateKey === toDateKey(selectedDate) : false;
              const disabled = isPast || isClosed || isFull;

              const classNames = ["calendar-day"];
              if (isPast || isClosed) classNames.push("is-disabled");
              else if (isFull) classNames.push("is-full");
              if (isSelected) classNames.push("is-selected");

              return (
                <button
                  key={dateKey}
                  type="button"
                  className={classNames.join(" ")}
                  disabled={disabled}
                  onClick={() => handleSelectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          <p className="calendar-note">定休日: 毎週月曜日 / 営業時間: 10:00〜19:00</p>
        </div>

        <div className="booking-form-area">
          {!selectedDate && !confirmed && (
            <p className="booking-placeholder">カレンダーから日付を選択してください。</p>
          )}

          {selectedDate && !selectedTime && (
            <div>
              <h3>
                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日(
                {WEEKDAY_LABELS[selectedDate.getDay()]}) の空き時間
              </h3>
              <div className="time-slots">
                {timeSlotsForDate(toDateKey(selectedDate)).map(({ time, booked }) => (
                  <button
                    key={time}
                    type="button"
                    className={"time-slot" + (booked ? " is-booked" : "")}
                    disabled={booked}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <form onSubmit={handleSubmit}>
              <h3>ご予約内容の確認</h3>
              <p>
                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日(
                {WEEKDAY_LABELS[selectedDate.getDay()]}) {selectedTime}〜
              </p>
              <label>
                お名前
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                電話番号またはメール
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </label>
              <label>
                ご要望など(任意)
                <textarea rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} />
              </label>
              <div className="booking-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedTime(null)}>
                  戻る
                </button>
                <button type="submit" className="btn btn-primary">
                  この内容で予約する
                </button>
              </div>
            </form>
          )}

          {confirmed && (
            <div className="booking-confirm">
              <p>ご予約ありがとうございます。以下の内容で受け付けました。</p>
              <p>
                {confirmed.date.replaceAll("-", "/")}({confirmed.weekdayLabel}) {confirmed.time}〜 /{" "}
                {confirmed.name} 様
              </p>
              <p className="booking-note-small">
                ※本サイトの予約フォームはデモ機能のため、内容はこのブラウザにのみ保存されます。確実なご予約は下記の外部予約サイトまたはお電話でも承っております。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
