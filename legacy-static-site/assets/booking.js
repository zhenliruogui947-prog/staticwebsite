(function () {
  const STORAGE_KEY = "uru-bookings";
  const OPEN_HOUR = 10;
  const LAST_START_HOUR = 18;
  const CLOSED_WEEKDAY = 1; // 0=日,1=月,...
  const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

  const calGrid = document.getElementById("cal-grid");
  if (!calGrid) return;

  const monthLabel = document.getElementById("cal-month-label");
  const prevBtn = document.getElementById("cal-prev");
  const nextBtn = document.getElementById("cal-next");
  const placeholder = document.getElementById("booking-placeholder");
  const stepTime = document.getElementById("booking-step-time");
  const selectedDateEl = document.getElementById("booking-selected-date");
  const timeSlotsEl = document.getElementById("time-slots");
  const form = document.getElementById("booking-form");
  const summaryEl = document.getElementById("booking-summary");
  const backBtn = document.getElementById("booking-back");
  const confirmEl = document.getElementById("booking-confirm");
  const confirmDetail = document.getElementById("booking-confirm-detail");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;

  function getBookings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveBooking(entry) {
    const bookings = getBookings();
    bookings.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }

  function toDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function timeSlotsForDate(dateKey) {
    const slots = [];
    for (let h = OPEN_HOUR; h <= LAST_START_HOUR; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
    }
    const booked = getBookings()
      .filter((b) => b.date === dateKey)
      .map((b) => b.time);
    return slots.map((time) => ({ time, booked: booked.includes(time) }));
  }

  function renderCalendar() {
    calGrid.innerHTML = "";
    monthLabel.textContent = `${viewYear}年 ${viewMonth + 1}月`;

    const firstDay = new Date(viewYear, viewMonth, 1);
    const startOffset = (firstDay.getDay() + 6) % 7; // 月曜始まりに変換
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement("div");
      empty.className = "calendar-day is-empty";
      calGrid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      const dateKey = toDateKey(date);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "calendar-day";
      cell.textContent = String(d);

      const isPast = date < today;
      const isClosed = date.getDay() === CLOSED_WEEKDAY;
      const slots = timeSlotsForDate(dateKey);
      const isFull = slots.every((s) => s.booked);

      if (isPast || isClosed) {
        cell.classList.add("is-disabled");
        cell.disabled = true;
      } else if (isFull) {
        cell.classList.add("is-full");
        cell.disabled = true;
      } else {
        cell.addEventListener("click", () => selectDate(date));
      }

      if (selectedDate && dateKey === toDateKey(selectedDate)) {
        cell.classList.add("is-selected");
      }

      calGrid.appendChild(cell);
    }
  }

  function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    renderTimeSlots();
    placeholder.hidden = true;
    stepTime.hidden = false;
    form.hidden = true;
    confirmEl.hidden = true;
  }

  function renderTimeSlots() {
    const dateKey = toDateKey(selectedDate);
    selectedDateEl.textContent = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日(${WEEKDAY_LABELS[selectedDate.getDay()]}) の空き時間`;

    timeSlotsEl.innerHTML = "";
    timeSlotsForDate(dateKey).forEach(({ time, booked }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "time-slot" + (booked ? " is-booked" : "");
      btn.textContent = time;
      btn.disabled = booked;
      if (!booked) {
        btn.addEventListener("click", () => selectTime(time));
      }
      timeSlotsEl.appendChild(btn);
    });
  }

  function selectTime(time) {
    summaryEl.textContent = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日(${WEEKDAY_LABELS[selectedDate.getDay()]}) ${time}〜`;
    form.dataset.time = time;
    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  backBtn.addEventListener("click", () => {
    form.hidden = true;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const time = form.dataset.time;
    if (!selectedDate || !time) return;

    const name = document.getElementById("booking-name").value.trim();
    const contact = document.getElementById("booking-contact").value.trim();
    const memo = document.getElementById("booking-memo").value.trim();

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: toDateKey(selectedDate),
      time,
      name,
      contact,
      memo,
      createdAt: new Date().toISOString(),
    };
    saveBooking(entry);

    confirmDetail.textContent = `${entry.date.replace(/-/g, "/")}(${WEEKDAY_LABELS[selectedDate.getDay()]}) ${entry.time}〜 / ${name} 様`;

    form.reset();
    form.hidden = true;
    stepTime.hidden = true;
    confirmEl.hidden = false;

    selectedDate = null;
    renderCalendar();
  });

  prevBtn.addEventListener("click", () => {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderCalendar();
  });

  renderCalendar();
})();
