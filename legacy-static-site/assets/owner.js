(function () {
  const STORAGE_KEY = "uru-bookings";
  // 簡易的な合言葉です。実際の運用では本物の認証に置き換えてください。
  const PASSCODE = "uru2026";

  const gate = document.getElementById("owner-gate");
  const gateForm = document.getElementById("owner-gate-form");
  const content = document.getElementById("owner-content");
  const tableBody = document.getElementById("owner-table-body");
  const emptyMsg = document.getElementById("owner-empty");
  const countEl = document.getElementById("owner-count");
  const refreshBtn = document.getElementById("owner-refresh");

  if (!gateForm) return;

  function getBookings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }

  function formatCreatedAt(iso) {
    const d = new Date(iso);
    return d.toLocaleString("ja-JP");
  }

  function render() {
    const bookings = getBookings().sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.time < b.time ? -1 : 1;
    });

    tableBody.innerHTML = "";
    countEl.textContent = `予約件数: ${bookings.length}件`;
    emptyMsg.hidden = bookings.length > 0;

    bookings.forEach((b) => {
      const tr = document.createElement("tr");

      [b.date.replace(/-/g, "/"), b.time, b.name, b.contact, b.memo || "-", formatCreatedAt(b.createdAt)].forEach(
        (text) => {
          const td = document.createElement("td");
          td.textContent = text;
          tr.appendChild(td);
        }
      );

      const actionTd = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn btn-secondary owner-delete-btn";
      delBtn.textContent = "削除";
      delBtn.addEventListener("click", () => {
        saveBookings(getBookings().filter((x) => x.id !== b.id));
        render();
      });
      actionTd.appendChild(delBtn);
      tr.appendChild(actionTd);

      tableBody.appendChild(tr);
    });
  }

  gateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.getElementById("owner-passcode").value;
    if (value === PASSCODE) {
      gate.hidden = true;
      content.hidden = false;
      render();
    } else {
      alert("合言葉が違います。");
    }
  });

  refreshBtn.addEventListener("click", render);
})();
