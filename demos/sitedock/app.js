"use strict"
/* SiteDock MVP — 고객 사이트에 GitHub 기능 블록을 끌어 놓고 프롬프트로 설정하는 편집기 */

// ───────── 아이콘 ─────────
const ICONS = {
  chevron: '<path d="m6 9 6 6 6-6"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  upload: '<path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3M7 8l5-5 5 5M12 3v13"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  cube: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  search: '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.3-4.3"/>',
  cloud: '<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M12 12v9M8 16l4-4 4 4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
  chart: '<rect x="3" y="12" width="4.6" height="9" rx="1.3" fill="currentColor" stroke="none"/><rect x="9.7" y="7" width="4.6" height="14" rx="1.3" fill="currentColor" stroke="none"/><rect x="16.4" y="3" width="4.6" height="18" rx="1.3" fill="currentColor" stroke="none"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  doc: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  grip: '<circle cx="9" cy="6" r="1.3" fill="currentColor"/><circle cx="15" cy="6" r="1.3" fill="currentColor"/><circle cx="9" cy="12" r="1.3" fill="currentColor"/><circle cx="15" cy="12" r="1.3" fill="currentColor"/><circle cx="9" cy="18" r="1.3" fill="currentColor"/><circle cx="15" cy="18" r="1.3" fill="currentColor"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  width: '<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  reset: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/>',
  sparkle: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  star: '<path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9Z" fill="currentColor" stroke="none"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
}
function icon(name) {
  const t = document.createElement("template")
  t.innerHTML = `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`
  return t.content.firstChild
}
function el(tag, cls, text) {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  if (text !== undefined) n.textContent = text
  return n
}
function btn(cls, content, onClick, label) {
  const b = el("button", cls)
  b.type = "button"
  for (const c of [].concat(content)) b.append(typeof c === "string" && ICONS[c] && !c.includes(" ") && c.length < 10 && c === c.toLowerCase() ? icon(c) : c)
  if (label) { b.setAttribute("aria-label", label); b.title = label }
  if (onClick) b.addEventListener("click", onClick)
  return b
}
const $ = id => document.getElementById(id)

// ───────── 스킬 카탈로그 ─────────
const CDN = {
  chart: ["https://cdn.jsdelivr.net/npm/chart.js@4.4.6/dist/chart.umd.js"],
  calendar: ["https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js", "https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.15/locales/ko.global.min.js"],
  markdown: ["https://cdn.jsdelivr.net/npm/marked@14.1.3/marked.min.js"],
  map: ["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"]
}
const SKILLS = [
  { type: "chart", name: "Chart.js", repo: "chartjs/Chart.js", stars: 67800, icon: "chart", label: "방문 통계", version: "4.4.6" },
  { type: "markdown", name: "Marked", repo: "markedjs/marked", stars: 37200, icon: "doc", label: "공지 · Markdown", version: "14.1.3" },
  { type: "calendar", name: "FullCalendar", repo: "fullcalendar/fullcalendar", stars: 20800, icon: "calendar", label: "예약 캘린더", version: "6.1.15" },
  { type: "map", name: "Leaflet", repo: "Leaflet/Leaflet", stars: null, icon: "pin", label: "매장 지도", version: "1.9.4" },
  { type: "model", name: "Model Viewer", repo: "mrdoob/three.js", stars: null, chip: "GLB", icon: "cube", label: "3D 상품 뷰어", version: "three 0.169" }
]
const skillOf = type => SKILLS.find(s => s.type === type)
const fmtStars = n => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

const COLORS = {
  green: { hex: "#3fbf2a", ko: "초록", re: /green|초록|녹색/i },
  lime: { hex: "#a6d70f", ko: "라임", re: /lime|라임|연두/i },
  blue: { hex: "#1f6bff", ko: "파랑", re: /blue|파랑|파란|블루/i },
  purple: { hex: "#7c4dff", ko: "보라", re: /purple|violet|보라|퍼플/i },
  orange: { hex: "#f06a1d", ko: "주황", re: /orange|주황|오렌지/i },
  red: { hex: "#e5484d", ko: "빨강", re: /\bred\b|빨강|빨간|레드/i },
  black: { hex: "#16181b", ko: "검정", re: /black|검정|검은|블랙/i }
}
const PLACES = {
  seongsu: { ko: "서울 성수동", at: [37.5446, 127.0559], re: /성수|seongsu|seoul|서울/i },
  pangyo: { ko: "성남 판교", at: [37.3947, 127.1112], re: /판교|pangyo/i },
  suwon: { ko: "수원 행궁동", at: [37.2830, 127.0146], re: /수원|suwon/i },
  busan: { ko: "부산 해운대", at: [35.1631, 129.1636], re: /부산|해운대|busan/i },
  jeju: { ko: "제주시", at: [33.4996, 126.5312], re: /제주|jeju/i }
}
const PRODUCTS = {
  lamp: { name: "Arc Desk Lamp", file: "arc-desk-lamp", price: 189000, poster: "assets/products/arc-desk-lamp.webp" },
  chair: { name: "Lounge Chair", file: "lounge-chair", price: 649000, poster: "assets/products/lounge-chair.webp" }
}
const VIEWS = { dayGridMonth: "월간", timeGridWeek: "주간", listMonth: "목록" }

function defaults(type, extra = {}) {
  const base = {
    chart: { title: "Visitor Analytics", period: 6, color: "blue", kind: "bar" },
    calendar: { title: "쇼룸 방문 예약", view: "dayGridMonth", offset: 0, color: "lime", weekends: true },
    markdown: { title: "공지", md: "## 11월 쇼룸 운영 안내\n- 평일 **10:00–19:00** 운영\n- 토요일은 예약한 분만 방문할 수 있습니다.\n\n예약은 아래 캘린더에서 신청해 주세요.", editable: true },
    model: { title: PRODUCTS.lamp.name, model: "lamp", angle: 0, dragRotate: false, autoRotate: false, price: PRODUCTS.lamp.price },
    map: { title: "쇼룸 오시는 길", place: "seongsu", zoom: 15 }
  }[type]
  return { ...base, ...extra }
}

// ───────── 상태 ─────────
const STORE = "sitedock-mvp-v1"
let uid = 0
const newId = () => `b${Date.now().toString(36)}${(uid++).toString(36)}`
const clone = v => JSON.parse(JSON.stringify(v))
const blockOf = (type, cfg = {}, wide = false) => ({ id: newId(), type, wide, cfg: defaults(type, cfg), prompt: "", history: [], applied: [] })

function demoSites() {
  const lampBlock = blockOf("model")
  lampBlock.prompt = "Rotate on drag. Start at 30°."
  const chartBlock = blockOf("chart")
  chartBlock.prompt = "Show the last 3 months in green."
  const studio = { id: "studio-on", name: "Studio On", domain: "studioon.example", blocks: [lampBlock, chartBlock], versions: [], selected: chartBlock.id, cart: 0 }
  studio.versions.push({ v: 1, at: "2026-11-10T10:20:00+09:00", note: "상품 뷰어와 방문 통계로 첫 게시", blocks: strip(studio.blocks) })
  const notice = blockOf("markdown", { title: "Forma Lab 소식", md: "## 세라믹 원데이 클래스\n매주 토요일 오후 2시에 열립니다.\n\n- 재료비 포함 **₩58,000**\n- 정원 8명" }, true)
  const map = blockOf("map", { title: "공방 위치", place: "suwon", zoom: 16 })
  const fchart = blockOf("chart", { title: "클래스 신청", color: "purple", kind: "line", period: 6 })
  const forma = { id: "forma-lab", name: "Forma Lab", domain: "formalab.example", blocks: [notice, map, fchart], versions: [], selected: notice.id, cart: 0 }
  return [studio, forma]
}
function strip(blocks) { return blocks.map(({ id, type, wide, cfg }) => clone({ id, type, wide, cfg })) }

let sites, currentId
try {
  const saved = JSON.parse(localStorage.getItem(STORE) || "null")
  if (saved?.sites?.length) { sites = saved.sites; currentId = saved.currentId }
} catch { /* 저장소를 쓸 수 없는 환경에서는 기본 데모로 시작 */ }
if (!sites) { sites = demoSites(); currentId = sites[0].id }
const site = () => sites.find(s => s.id === currentId) || sites[0]
const uploads = new Map() // 업로드한 GLB는 현재 탭 메모리에만 보관

let saveTimer
function save() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORE, JSON.stringify({ sites, currentId })) } catch { /* 무시 */ }
  }, 250)
  renderStatus()
}

// ───────── 데이터 (예시) ─────────
const VISITS = {
  "studio-on": [7800, 8400, 9100, 8700, 10200, 11600, 12400, 11900, 13800, 12100, 19400, 26200],
  "forma-lab": [120, 140, 135, 160, 210, 190, 230, 260, 240, 310, 290, 350]
}
function monthLabels(n) {
  const now = new Date()
  return Array.from({ length: n }, (_, i) => new Date(now.getFullYear(), now.getMonth() - n + 1 + i, 1).getMonth() + 1 + "월")
}

// ───────── 외부 스크립트 로더 ─────────
const scriptCache = new Map()
function loadScript(src) {
  if (!scriptCache.has(src)) {
    scriptCache.set(src, new Promise((resolve, reject) => {
      const s = document.createElement("script")
      s.src = src
      s.onload = resolve
      s.onerror = () => { scriptCache.delete(src); reject(new Error(src)) }
      document.head.append(s)
    }))
  }
  return scriptCache.get(src)
}
async function loadSkill(type) {
  const [main, ...rest] = CDN[type] || []
  if (main) await loadScript(main)
  for (const src of rest) await loadScript(src).catch(() => {})
}
function loading(body, text = "기능을 불러오는 중") {
  const box = el("div", "loading")
  box.append(el("span", "spinner"), el("span", "", text))
  body.replaceChildren(box)
}
function failed(body, skill) {
  const box = el("div", "loading error")
  box.append(el("span", "", `${skill.name}을(를) 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 주소창의 새로고침 버튼을 누르세요.`))
  body.replaceChildren(box)
}

// ───────── 위젯 ─────────
const widgets = {
  chart: {
    async mount(body, b) {
      loading(body)
      await loadSkill("chart")
      const { period, color, kind } = b.cfg
      const values = (VISITS[currentId] || VISITS["studio-on"]).slice(-period)
      const labels = monthLabels(period)
      const total = values.reduce((a, v) => a + v, 0)
      const growth = values.length > 1 ? Math.round((values.at(-1) / values.at(-2) - 1) * 100) : 0
      const legend = el("div", "chart-legend")
      const sum = el("b", "", total.toLocaleString("ko-KR"))
      const sub = el("span")
      sub.append(`최근 ${period}개월 방문 · 전월 대비 `, el("span", growth >= 0 ? "up" : "", `${growth >= 0 ? "+" : ""}${growth}%`))
      legend.append(sum, sub)
      const box = el("div", "chart-box")
      const canvas = el("canvas")
      canvas.setAttribute("role", "img")
      canvas.setAttribute("aria-label", `최근 ${period}개월 월별 방문자 수 ${labels.map((l, i) => `${l} ${values[i]}명`).join(", ")}`)
      box.append(canvas)
      body.replaceChildren(legend, box, el("p", "block-note", "예시 방문 데이터 · 실제 서비스에서는 호스팅 접속 로그와 연결"))
      const hex = COLORS[color]?.hex || COLORS.blue.hex
      Chart.defaults.font.family = "Paperlogy, sans-serif"
      Chart.defaults.color = "#5b5f66"
      const chart = new Chart(canvas, {
        type: kind === "line" ? "line" : "bar",
        data: {
          labels,
          datasets: [{
            data: values, backgroundColor: kind === "line" ? hex + "26" : hex, borderColor: hex,
            borderRadius: 6, maxBarThickness: 64, borderWidth: kind === "line" ? 3 : 0,
            fill: kind === "line", tension: 0.35, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2.5
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, animation: { duration: 600 },
          plugins: { legend: { display: false }, tooltip: { backgroundColor: "#16181b", padding: 10, callbacks: { label: c => ` ${c.parsed.y.toLocaleString("ko-KR")}명` } } },
          scales: {
            y: { beginAtZero: true, grid: { color: "#ece9e1" }, border: { display: false }, ticks: { maxTicksLimit: 4, callback: v => v >= 1000 ? `${v / 1000}K` : v } },
            x: { grid: { display: false }, border: { color: "#d9d5ca" }, ticks: { maxRotation: 0, autoSkipPadding: 6 } }
          }
        }
      })
      return { destroy: () => chart.destroy() }
    }
  },

  calendar: {
    async mount(body, b) {
      loading(body)
      await loadSkill("calendar")
      const { view, offset, color, weekends } = b.cfg
      const now = new Date()
      const ym = (m, d) => new Date(now.getFullYear(), now.getMonth() + m, d)
      const iso = (date, time) => {
        const p = n => String(n).padStart(2, "0")
        return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}${time ? "T" + time : ""}`
      }
      const sample = [[0, 4, "쇼룸 방문 상담", "14:00"], [0, 11, "B2B 견적 미팅", "10:30"], [0, 18, "신제품 촬영"], [0, 21, "쇼룸 방문 상담", "16:00"], [0, 26, "정기 점검", "09:00"],
        [1, 3, "연말 프로모션 준비"], [1, 9, "쇼룸 방문 상담", "11:00"], [1, 16, "B2B 견적 미팅", "15:00"], [1, 23, "쇼룸 방문 상담", "13:30"]]
      const hex = COLORS[color]?.hex || COLORS.lime.hex
      const wrap = el("div", "cal-wrap")
      const host = el("div")
      const pick = el("div", "cal-pick")
      pick.append(el("span", "", "날짜를 눌러 예약을 요청해 보세요."))
      wrap.append(host, pick)
      body.replaceChildren(wrap, el("p", "block-note", "예시 일정 · 예약 요청은 현재 탭에만 추가됩니다"))
      const cal = new FullCalendar.Calendar(host, {
        initialView: view, initialDate: ym(offset, 1), locale: "ko", firstDay: 0, weekends,
        headerToolbar: { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,listMonth" },
        buttonText: { today: "오늘", month: "월간", week: "주간", list: "목록" },
        height: "auto", dayMaxEvents: 2, slotMinTime: "09:00:00", slotMaxTime: "20:00:00", allDaySlot: true, nowIndicator: true,
        eventColor: hex, eventTextColor: color === "lime" ? "#16181b" : "#fff",
        events: sample.map(([m, d, title, time]) => ({ title, start: iso(ym(m, d), time && time + ":00"), allDay: !time })),
        dateClick(info) {
          host.querySelectorAll(".fc-day-selected").forEach(n => n.classList.remove("fc-day-selected"))
          info.dayEl.classList.add("fc-day-selected")
          const label = info.date.toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" })
          const go = btn("", "예약 요청", () => {
            cal.addEvent({ title: "예약 요청", start: info.dateStr, allDay: info.allDay })
            pick.replaceChildren(el("span", "", `${label} 예약 요청을 추가했습니다.`))
            toast(`${label} 예약 요청을 캘린더에 추가했습니다.`)
          })
          pick.replaceChildren(el("b", "", label), go)
        },
        eventClick(info) { toast(`${info.event.title} · ${info.event.start.toLocaleString("ko-KR", { month: "long", day: "numeric", hour: info.event.allDay ? undefined : "numeric", minute: info.event.allDay ? undefined : "2-digit" })}`) }
      })
      cal.render()
      const ro = new ResizeObserver(() => cal.updateSize())
      ro.observe(host)
      return { destroy: () => { ro.disconnect(); cal.destroy() } }
    }
  },

  markdown: {
    async mount(body, b) {
      loading(body)
      await loadSkill("markdown")
      const out = el("div", "md-out")
      const draw = () => { out.innerHTML = marked.parse(b.cfg.md.replace(/&/g, "&amp;").replace(/</g, "&lt;"), { breaks: true }) }
      const parts = []
      if (b.cfg.editable) {
        const src = el("textarea", "md-edit")
        src.value = b.cfg.md
        src.setAttribute("aria-label", "공지 Markdown 원문")
        src.rows = 5
        src.addEventListener("input", () => {
          b.cfg.md = src.value
          const m = mounted.get(b.id)
          if (m) m.sig = sigOf(b)
          draw()
          save()
        })
        parts.push(src)
      } else {
        const lock = el("p", "block-note")
        lock.append("읽기 전용 · 편집하려면 프롬프트에 “편집 허용”")
        parts.push(lock)
      }
      draw()
      body.replaceChildren(...parts, out)
      return { destroy() {} }
    }
  },

  model: {
    async mount(body, b) {
      const { model, angle, dragRotate, autoRotate, price } = b.cfg
      const upload = model.startsWith?.("upload:") ? uploads.get(model.slice(7)) : null
      const product = PRODUCTS[model]
      const viewer = el("div", "viewer")
      const poster = el("div", "poster")
      if (product) {
        const plinth = el("img", "plinth"); plinth.src = "assets/products/limestone-plinth.webp"; plinth.alt = ""
        const obj = el("img", "obj"); obj.src = product.poster; obj.alt = product.name
        poster.append(plinth, obj)
      } else poster.append(el("span", "spinner"))
      const tag = el("span", "chip hl vtag", upload ? upload.name : model.startsWith("upload:") ? "GLB 다시 업로드 필요" : `${product?.file || "model"} · 3D`)
      const stateTag = el("span", "vstate", dragRotate ? "드래그해서 회전" : "회전 잠김")
      const bar = el("div", "vbar")
      let handle = null
      const spin = btn("", ["rotate", el("span", "", "자동 회전")], () => {
        b.cfg.autoRotate = !b.cfg.autoRotate
        spin.setAttribute("aria-pressed", String(b.cfg.autoRotate))
        const m = mounted.get(b.id); if (m) m.sig = sigOf(b)
        handle?.update({ autoRotate: b.cfg.autoRotate })
        save()
        if (selectedId() === b.id) renderInspector()
      })
      spin.setAttribute("aria-pressed", String(!!autoRotate))
      const reset = btn("", ["reset", el("span", "", `${angle}°로`)], () => handle?.reset(), "시작 각도로 되돌리기")
      bar.append(spin, reset)
      viewer.append(poster, tag, stateTag, bar)

      const buy = el("div", "buy")
      const priceBox = el("div", "price", `₩${(price || 0).toLocaleString("ko-KR")}`)
      priceBox.append(el("small", "", "예시 상품 · 무료 배송"))
      buy.append(priceBox, btn("", "장바구니 담기", () => addToCart(b.cfg.title)))
      body.replaceChildren(viewer, buy)

      let alive = true
      if (window.SiteDock3D) {
        const source = upload ? { id: upload.id, buffer: upload.buffer } : (product ? model : "lamp")
        SiteDock3D.mount(viewer, { model: source, angle, dragRotate, autoRotate })
          .then(h => { if (!alive) return h.dispose(); handle = h; viewer.classList.add("ready") })
          .catch(err => { console.warn(err); stateTag.textContent = "3D 엔진 연결 실패 · 이미지로 표시" })
      }
      return { destroy() { alive = false; handle?.dispose() } }
    }
  },

  map: {
    async mount(body, b) {
      loading(body)
      await loadSkill("map")
      const place = PLACES[b.cfg.place] || PLACES.seongsu
      const box = el("div", "map")
      const meta = el("div", "map-meta")
      const link = el("a", "", "OpenStreetMap에서 보기 ↗")
      link.href = `https://www.openstreetmap.org/?mlat=${place.at[0]}&mlon=${place.at[1]}#map=${b.cfg.zoom}/${place.at[0]}/${place.at[1]}`
      link.target = "_blank"; link.rel = "noopener"
      meta.append(el("span", "", `${place.ko} · 예시 위치`), link)
      body.replaceChildren(box, meta)
      const map = L.map(box, { scrollWheelZoom: false, attributionControl: true }).setView(place.at, b.cfg.zoom)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap" }).addTo(map)
      const pinIcon = L.divIcon({ className: "", html: '<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#c8f031;border:3px solid #16181b;transform:rotate(-45deg);box-shadow:0 4px 10px #0003"></div>', iconSize: [22, 22], iconAnchor: [11, 22] })
      L.marker(place.at, { icon: pinIcon }).addTo(map).bindPopup(`<b>${site().name}</b><br>${place.ko}`)
      const ro = new ResizeObserver(() => map.invalidateSize())
      ro.observe(box)
      return { destroy: () => { ro.disconnect(); map.remove() } }
    }
  }
}

// ───────── 캔버스 ─────────
const mounted = new Map() // id → { el, body, inst, sig }
const sigOf = b => JSON.stringify([b.type, b.cfg])
const selectedId = () => site().selected
let previewing = false

function blockElement(b) {
  const skill = skillOf(b.type)
  const card = el("article", `block${b.type === "model" ? " product" : ""}`)
  card.dataset.id = b.id
  card.dataset.type = b.type
  const head = el("div", "block-head")
  const h = el("h3")
  if (b.type === "model") { const u = el("u", "", b.cfg.title); h.append(u) } else {
    const ic = el("span", "bico"); ic.append(icon(skill.icon)); head.append(ic)
    h.textContent = b.cfg.title
  }
  head.append(h)
  const tools = el("div", "tools")
  const grip = btn("grip", "grip", null, "끌어서 순서 바꾸기")
  grip.style.touchAction = "none"
  grip.addEventListener("pointerdown", e => pointerDrag(e, { kind: "block", id: b.id }))
  tools.append(
    grip,
    btn("", "width", () => { b.wide = !b.wide; renderCanvas(); save() }, "너비 바꾸기 (절반/전체)"),
    btn("", "up", () => moveBlock(b.id, indexOf(b.id) - 1), "앞으로 이동"),
    btn("", "down", () => moveBlock(b.id, indexOf(b.id) + 2), "뒤로 이동"),
    btn("", "trash", () => removeBlock(b.id), "블록 삭제")
  )
  head.append(tools)
  const body = el("div", "block-body")
  card.append(head, body)
  card.addEventListener("pointerdown", () => { if (!previewing && selectedId() !== b.id) select(b.id) })
  return { card, body }
}

function renderCanvas() {
  const s = site()
  const grid = $("grid")
  const keep = new Set(s.blocks.map(b => b.id))
  for (const [id, m] of mounted) if (!keep.has(id)) { m.inst?.destroy?.(); mounted.delete(id) }
  const nodes = s.blocks.map((b, i) => {
    let m = mounted.get(b.id)
    const sig = sigOf(b)
    if (m && m.sig !== sig) { m.inst?.destroy?.(); mounted.delete(b.id); m = null }
    if (!m) {
      const { card, body } = blockElement(b)
      m = { el: card, body, sig, inst: null }
      mounted.set(b.id, m)
      const ref = m
      widgets[b.type].mount(body, b)
        .then(inst => { if (mounted.get(b.id) === ref) ref.inst = inst; else inst?.destroy?.() })
        .catch(err => { console.warn(err); failed(body, skillOf(b.type)) })
    }
    m.el.classList.toggle("wide", !!b.wide)
    m.el.classList.toggle("selected", b.id === s.selected)
    const [up, down] = [m.el.querySelector('[aria-label="앞으로 이동"]'), m.el.querySelector('[aria-label="뒤로 이동"]')]
    up.disabled = i === 0
    down.disabled = i === s.blocks.length - 1
    return m.el
  })
  grid.replaceChildren(...nodes)
  $("drop").querySelector("small").textContent = s.blocks.length ? "라이브러리의 기능을 이곳으로 끌어 놓으세요" : "빈 페이지입니다. 왼쪽 라이브러리에서 첫 기능을 끌어 놓으세요"
}
function clearMounted() { for (const m of mounted.values()) m.inst?.destroy?.(); mounted.clear() }

const indexOf = id => site().blocks.findIndex(b => b.id === id)
function addBlock(type, index = site().blocks.length, cfg = {}) {
  const s = site()
  const b = blockOf(type, cfg, type === "calendar" || type === "markdown")
  s.blocks.splice(Math.max(0, Math.min(index, s.blocks.length)), 0, b)
  s.selected = b.id
  renderCanvas(); renderInspector(); save()
  toast(`${skillOf(type).name} 블록을 추가했습니다.`)
  requestAnimationFrame(() => mounted.get(b.id)?.el.scrollIntoView({ behavior: "smooth", block: "nearest" }))
  return b
}
function moveBlock(id, index) {
  const s = site()
  const from = indexOf(id)
  if (from < 0) return
  const [b] = s.blocks.splice(from, 1)
  const to = Math.max(0, Math.min(index > from ? index - 1 : index, s.blocks.length))
  s.blocks.splice(to, 0, b)
  renderCanvas(); save()
  if (to !== from) toast("블록 순서를 바꿨습니다.")
}
function removeBlock(id) {
  const s = site()
  const i = indexOf(id)
  const [b] = s.blocks.splice(i, 1)
  if (s.selected === id) s.selected = s.blocks[Math.min(i, s.blocks.length - 1)]?.id ?? null
  renderCanvas(); renderInspector(); save()
  toast(`${b.cfg.title} 블록을 삭제했습니다.`)
}
function select(id) {
  site().selected = id
  for (const [bid, m] of mounted) m.el.classList.toggle("selected", bid === id)
  renderInspector(); save()
}
function addToCart(title) {
  const s = site()
  s.cart = (s.cart || 0) + 1
  renderCart(true)
  toast(`${title}을(를) 장바구니에 담았습니다.`)
  save()
}
function renderCart(bump) {
  const c = $("cart")
  c.textContent = `Cart (${site().cart || 0})`
  if (bump) { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump") }
}

// ───────── 프롬프트 해석 ─────────
const QUOTE = /["“”'‘’「」]/
function quoted(text, keys) {
  const re = new RegExp(`(?:${keys})\\s*(?:을|를|은|는|:|=|to|as)?\\s*["“'‘「]([^"”'’」]{1,400})["”'’」]`, "i")
  return re.exec(text)?.[1]?.trim()
}
function pickColor(text) { return Object.entries(COLORS).find(([, c]) => c.re.test(text))?.[0] }

const PARSERS = {
  chart(t, c) {
    const out = {}
    const m = /(\d{1,2})\s*(?:개월|달|months?|mos?)/i.exec(t)
    if (m) out.period = [3, 6, 12].reduce((a, v) => Math.abs(v - m[1]) < Math.abs(a - m[1]) ? v : a, 6)
    else if (/1\s*년|일\s*년|a\s*year|last\s*year|12/i.test(t) && /년|year/i.test(t)) out.period = 12
    if (/꺾은선|선\s*그래프|라인|line|추세/i.test(t)) out.kind = "line"
    else if (/막대|bar/i.test(t)) out.kind = "bar"
    const color = pickColor(t); if (color) out.color = color
    return out
  },
  calendar(t) {
    const out = {}
    if (/다음\s*달|next\s*month/i.test(t)) out.offset = 1
    else if (/지난\s*달|last\s*month|previous\s*month/i.test(t)) out.offset = -1
    else if (/이번\s*달|this\s*month/i.test(t)) out.offset = 0
    if (/주간|week(?!end)|weekly/i.test(t)) out.view = "timeGridWeek"
    else if (/목록|리스트|list/i.test(t)) out.view = "listMonth"
    else if (/월간|month\s*view|monthly/i.test(t)) out.view = "dayGridMonth"
    if (/주말\s*(?:은|을|는)?\s*(?:숨|제외|빼|없)|hide\s*weekends?|no\s*weekends?|weekdays?\s*only|평일만/i.test(t)) out.weekends = false
    else if (/주말\s*(?:은|을|도)?\s*(?:표시|보이|포함|보여)|show\s*weekends?/i.test(t)) out.weekends = true
    const color = pickColor(t); if (color) out.color = color
    return out
  },
  markdown(t, c) {
    const out = {}
    if (/읽기\s*전용|미리보기만|편집\s*(?:금지|막|잠|불가)|read[-\s]?only|lock/i.test(t)) out.editable = false
    else if (/편집\s*(?:허용|가능)|editable|allow\s*edit/i.test(t)) out.editable = true
    const body = quoted(t, "내용|본문|content|text")
    if (body) out.md = body.replace(/\\n/g, "\n")
    const add = quoted(t, "추가|append|add")
    if (add) out.md = `${out.md ?? c.md}\n- ${add}`
    return out
  },
  model(t) {
    const out = {}
    const a = /(\d{1,3})\s*(?:°|도|deg|degrees?)/i.exec(t)
    if (a) out.angle = Number(a[1]) % 360
    if (/(?:자동\s*회전|auto[-\s]?rotat\w*)\s*(?:을|은)?\s*(?:꺼|끄|중지|멈|정지|off)|(?:stop|disable|turn\s*off)\s*auto[-\s]?rotat/i.test(t)) out.autoRotate = false
    else if (/자동\s*회전|auto[-\s]?rotat|turntable|빙글/i.test(t)) out.autoRotate = true
    if (/회전\s*(?:을)?\s*(?:금지|잠|끄|막|고정)|(?:disable|lock|no)\s*rotat|고정/i.test(t) && !/자동\s*회전\s*(?:을)?\s*(?:꺼|끄)/.test(t)) out.dragRotate = false
    else if (/드래그|drag/i.test(t)) out.dragRotate = true
    if (/의자|체어|chair/i.test(t)) out.model = "chair"
    else if (/조명|램프|스탠드|lamp/i.test(t)) out.model = "lamp"
    const p = /(?:가격|price)\D{0,8}([\d,]{3,})/i.exec(t)
    if (p) out.price = Number(p[1].replace(/,/g, ""))
    if (out.model && out.model !== undefined) {
      const prod = PRODUCTS[out.model]
      out.title ??= prod.name
      out.price ??= prod.price
    }
    return out
  },
  map(t, c) {
    const out = {}
    const place = Object.entries(PLACES).find(([, p]) => p.re.test(t))?.[0]
    if (place) out.place = place
    const z = /(?:확대|줌|zoom|레벨|level)\D{0,6}(\d{1,2})/i.exec(t)
    if (z) out.zoom = Math.max(10, Math.min(18, Number(z[1])))
    else if (/더\s*확대|zoom\s*in|가깝게/i.test(t)) out.zoom = Math.min(18, c.zoom + 2)
    else if (/축소|zoom\s*out|넓게|멀리/i.test(t)) out.zoom = Math.max(10, c.zoom - 2)
    return out
  }
}
const LABELS = { title: "제목", period: "기간", color: "색상", kind: "형태", offset: "표시 월", view: "보기", weekends: "주말", md: "본문", editable: "편집", angle: "시작 각도", dragRotate: "드래그 회전", autoRotate: "자동 회전", model: "상품", price: "가격", place: "위치", zoom: "확대" }
function show(key, v) {
  switch (key) {
    case "period": return `${v}개월`
    case "color": return COLORS[v]?.ko ?? v
    case "kind": return v === "line" ? "꺾은선" : "막대"
    case "offset": return v === 1 ? "다음 달" : v === -1 ? "지난 달" : "이번 달"
    case "view": return VIEWS[v]
    case "weekends": return v ? "표시" : "숨김"
    case "editable": return v ? "허용" : "읽기 전용"
    case "md": return v.length > 22 ? v.slice(0, 22).replace(/\n/g, " ") + "…" : v.replace(/\n/g, " ")
    case "angle": return `${v}°`
    case "dragRotate": case "autoRotate": return v ? "켜짐" : "꺼짐"
    case "model": return PRODUCTS[v]?.name ?? (uploads.get(String(v).slice(7))?.name || "업로드 GLB")
    case "price": return `₩${Number(v).toLocaleString("ko-KR")}`
    case "place": return PLACES[v]?.ko ?? v
    case "zoom": return `${v}단계`
    default: return String(v)
  }
}
function applyPrompt(b, text) {
  const parsed = PARSERS[b.type](text, b.cfg)
  const title = quoted(text, "제목|title|이름|name")
  if (title) parsed.title = title.slice(0, 60)
  const changes = Object.entries(parsed).filter(([k, v]) => JSON.stringify(b.cfg[k]) !== JSON.stringify(v))
  if (!changes.length) {
    const same = Object.entries(parsed).map(([key, v]) => ({ key, from: "", to: show(key, v), same: true }))
    if (same.length) b.applied = same
    return same.length ? { same } : []
  }
  b.history.push(clone(b.cfg))
  if (b.history.length > 20) b.history.shift()
  const applied = changes.map(([key, to]) => ({ key, from: show(key, b.cfg[key]), to: show(key, to) }))
  Object.assign(b.cfg, Object.fromEntries(changes))
  b.applied = applied
  return applied
}

const EXAMPLES = {
  chart: ["Show the last 3 months in green.", "최근 12개월을 꺾은선으로 보여줘", "제목 “월별 방문자” 보라색 막대"],
  calendar: ["다음 달을 주간 보기로, 주말은 숨겨줘", "Show next month in purple.", "제목 “쇼룸 예약 현황” 목록으로"],
  markdown: ["읽기 전용으로 바꿔줘", "추가 “주차는 건물 뒤편을 이용해 주세요.”", "편집 허용, 제목 “이용 안내”"],
  model: ["Rotate on drag. Start at 30°.", "의자로 바꾸고 자동 회전 켜줘", "시작 각도 120도, 회전 잠금"],
  map: ["부산 매장으로 바꾸고 확대 16", "Zoom 13, Suwon", "제목 “성수 쇼룸 오시는 길” 더 확대"]
}
const GUIDE = {
  chart: "기간(3·6·12개월), 색상, 막대/꺾은선, 제목",
  calendar: "이번 달/다음 달, 월간·주간·목록, 주말 숨김, 색상, 제목",
  markdown: "읽기 전용/편집 허용, 내용 “…”, 추가 “…”, 제목",
  model: "드래그 회전, 시작 각도(°), 자동 회전, 의자/조명, 가격, 제목",
  map: "서울 성수·판교·수원·부산·제주, 확대 10–18, 제목"
}

// ───────── 인스펙터 ─────────
function renderInspector() {
  const root = $("inspector")
  const s = site()
  const b = s.blocks.find(x => x.id === s.selected)
  if (!b) {
    const blank = el("div", "blank")
    blank.append(icon("box"), el("p", "", "캔버스에서 블록을 선택하거나 라이브러리에서 기능을 끌어 놓으면 이곳에서 프롬프트로 설정할 수 있습니다."))
    root.replaceChildren(blank)
    return
  }
  const skill = skillOf(b.type)
  const sel = el("div", "sel")
  const ic = el("span", "ico"); ic.append(icon(skill.icon))
  const ok = el("span", "check"); ok.append(icon("check"))
  sel.append(ic, el("strong", "", b.cfg.title), ok)

  const srcLabel = el("span", "field-label", "Source")
  const src = el("div", "source")
  const sic = el("span", "ico"); sic.append(icon(skill.icon))
  const gh = el("a"); gh.href = `https://github.com/${skill.repo}`; gh.target = "_blank"; gh.rel = "noopener"
  gh.append(skill.repo.split("/")[1], icon("ext"))
  src.append(sic, el("span", "", `${skill.name} ${skill.version}`), gh)

  const form = el("form")
  const ta = el("textarea", "prompt")
  ta.id = "prompt"
  ta.value = b.prompt
  ta.placeholder = EXAMPLES[b.type][0]
  ta.maxLength = 500
  ta.setAttribute("aria-label", "프롬프트")
  ta.addEventListener("input", () => { b.prompt = ta.value; save() })
  ta.addEventListener("keydown", e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) form.requestSubmit() })
  const ex = el("div", "examples")
  for (const text of EXAMPLES[b.type]) ex.append(btn("", text, () => { ta.value = text; b.prompt = text; ta.focus(); save() }))
  const apply = btn("lime apply", ["sparkle", el("span", "", "프롬프트 적용")])
  apply.type = "submit"
  const hint = el("p", "hint", `지원 명령 · ${GUIDE[b.type]}. 한국어·영어 모두 가능하며 Ctrl+Enter로 적용합니다.`)
  form.append(ta, ex, apply, hint)
  form.addEventListener("submit", e => {
    e.preventDefault()
    const text = ta.value.trim() || ta.placeholder
    if (!ta.value.trim()) { ta.value = text; b.prompt = text }
    const changes = applyPrompt(b, text)
    if (changes.same) { renderInspector(); toast("이미 같은 설정으로 동작하고 있습니다."); return }
    if (!changes.length) { toast("바꿀 설정을 찾지 못했습니다. 아래 예시 문장을 눌러 보세요.", true); return }
    renderCanvas(); renderInspector(); save()
    toast(`설정 ${changes.length}개를 적용했습니다.`)
  })

  const applied = el("div", "applied")
  const ah = el("div", "applied-head")
  const aok = el("span", "check"); aok.append(icon("check"))
  ah.append(aok, el("span", "", "Applied"))
  if (b.history.length) ah.append(btn("undo", ["undo", el("span", "", "되돌리기")], () => {
    b.cfg = b.history.pop()
    b.applied = []
    renderCanvas(); renderInspector(); save()
    toast("직전 설정으로 되돌렸습니다.")
  }))
  applied.append(ah)
  if (b.applied.length) {
    const ul = el("ul")
    for (const c of b.applied) {
      const li = el("li")
      const k = el("span", "check"); k.append(icon("check"))
      const del = c.same ? el("small", "kept", "유지") : el("del", "", c.from)
      li.append(k, el("b", "", LABELS[c.key] ?? c.key), el("span", "", "·"), el("span", "", c.to), del)
      ul.append(li)
    }
    applied.append(ul)
  } else applied.append(el("p", "none", "아직 적용한 프롬프트가 없습니다."))

  const settings = el("div", "settings")
  settings.append(el("span", "field-label", "현재 설정"))
  const dl = el("dl")
  for (const [k, v] of Object.entries(b.cfg)) {
    if (k === "md") continue
    dl.append(el("dt", "", LABELS[k] ?? k), el("dd", "", show(k, v)))
  }
  dl.append(el("dt", "", "너비"), el("dd", "", b.wide ? "전체" : "절반"))
  settings.append(dl)

  root.replaceChildren(sel, srcLabel, src, form, applied, settings)
}

// ───────── 라이브러리 ─────────
function renderSkills() {
  const q = $("search").value.trim().toLowerCase()
  const sort = $("sort").value
  const list = SKILLS.filter(s => [s.name, s.repo, s.label].some(v => v.toLowerCase().includes(q)))
    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : (b.live ?? b.stars ?? -1) - (a.live ?? a.stars ?? -1))
  const root = $("skills")
  root.replaceChildren(...list.map(s => {
    const card = el("article", "skill")
    card.dataset.type = s.type
    const ic = el("span", "ico"); ic.append(icon(s.icon))
    const info = el("div")
    const meta = el("div", "meta")
    if (s.chip) {
      meta.append(el("span", "chip", s.chip), el("span", "", s.label))
    } else {
      const a = el("a")
      a.href = `https://github.com/${s.repo}`; a.target = "_blank"; a.rel = "noopener"; a.draggable = false
      const star = icon("star"); star.classList.add("star")
      const n = s.live ?? s.stars
      a.append(star, n ? fmtStars(n) : "GitHub")
      a.title = s.live ? "GitHub API 실시간 값" : "2026-11-11 스냅샷"
      meta.append(a, el("span", "", `· ${s.label}`))
    }
    info.append(el("strong", "", s.name), meta)
    card.append(ic, info, btn("add", "plus", () => addBlock(s.type), `${s.name} 추가`))
    card.addEventListener("pointerdown", e => { if (!e.target.closest("button,a")) pointerDrag(e, { kind: "skill", type: s.type }) })
    return card
  }))
  if (!list.length) root.append(el("p", "empty", "검색 결과가 없습니다."))
}

async function refreshStars() {
  const KEY = "sitedock-stars"
  let cache = {}
  try { cache = JSON.parse(sessionStorage.getItem(KEY) || "{}") } catch { }
  const targets = SKILLS.filter(s => !s.chip)
  await Promise.all(targets.map(async s => {
    if (cache[s.repo]) { s.live = cache[s.repo]; return }
    try {
      const r = await fetch(`https://api.github.com/repos/${s.repo}`, { headers: { Accept: "application/vnd.github+json" } })
      if (!r.ok) return
      const j = await r.json()
      if (typeof j.stargazers_count === "number") { s.live = j.stargazers_count; cache[s.repo] = s.live }
    } catch { }
  }))
  try { sessionStorage.setItem(KEY, JSON.stringify(cache)) } catch { }
  if (targets.some(s => s.live)) {
    $("stars-note").textContent = `★ GitHub API에서 ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}에 받은 값입니다.`
    renderSkills()
  }
}

function renderAssets() {
  const s = site()
  const sel = s.blocks.find(b => b.id === s.selected && b.type === "model")
  const items = [
    ...Object.entries(PRODUCTS).map(([key, p]) => ({ key, name: p.name, poster: p.poster })),
    ...[...uploads.values()].map(u => ({ key: `upload:${u.id}`, name: u.name, upload: true }))
  ]
  $("assets").replaceChildren(...items.map(a => {
    const tile = btn("asset", [], () => useAsset(a.key), `${a.name} 상품 뷰어에 적용`)
    const th = el("span", "thumb")
    if (a.poster) { const img = el("img"); img.src = a.poster; img.alt = ""; th.append(img) } else th.append(icon("cube"))
    tile.append(th, el("span", "", a.name))
    if (a.upload) tile.append(el("span", "chip hl tag", "GLB"))
    tile.setAttribute("aria-pressed", String(sel?.cfg.model === a.key))
    tile.addEventListener("pointerdown", e => pointerDrag(e, { kind: "asset", key: a.key, name: a.name }))
    return tile
  }))
}
function assetCfg(key) {
  const p = PRODUCTS[key]
  return p ? { model: key, title: p.name, price: p.price } : { model: key, title: uploads.get(key.slice(7))?.name.replace(/\.glb$/i, "") || "업로드 모델", price: 0 }
}
function assignAsset(b, key) {
  if (b.cfg.model === key) return
  b.history.push(clone(b.cfg))
  const next = assetCfg(key)
  b.applied = Object.entries(next).filter(([k, v]) => b.cfg[k] !== v).map(([k, v]) => ({ key: k, from: show(k, b.cfg[k]), to: show(k, v) }))
  Object.assign(b.cfg, next)
  site().selected = b.id
  renderCanvas(); renderInspector(); renderAssets(); save()
  toast(`${next.title}을(를) 상품 뷰어에 적용했습니다.`)
}
function useAsset(key, index) {
  const s = site()
  const target = s.blocks.find(b => b.id === s.selected && b.type === "model") || s.blocks.find(b => b.type === "model")
  if (target && index === undefined) assignAsset(target, key)
  else addBlock("model", index, assetCfg(key))
  renderAssets()
}

async function handleUpload(file) {
  if (!file) return
  if (file.size > 50 * 1024 * 1024) return toast("50MB 이하 GLB 파일을 사용하세요.", true)
  const buffer = await file.arrayBuffer()
  if (new TextDecoder().decode(buffer.slice(0, 4)) !== "glTF") return toast("GLB(바이너리 glTF) 파일이 아닙니다.", true)
  const id = Date.now().toString(36)
  uploads.set(id, { id, name: file.name, buffer })
  renderAssets()
  useAsset(`upload:${id}`)
  toast(`${file.name}을(를) 불러왔습니다. 새로고침하면 다시 업로드해야 합니다.`)
}

// ───────── 끌어 놓기 (포인터 기반: 마우스·펜) ─────────
let drag = null
function pointerDrag(e, payload) {
  if (e.button !== 0 || previewing) return
  const sx = e.clientX, sy = e.clientY
  const move = ev => {
    if (!drag) {
      if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return
      beginDrag(payload)
    }
    ev.preventDefault()
    drag.ghost.style.left = ev.clientX + 14 + "px"
    drag.ghost.style.top = ev.clientY + 10 + "px"
    updateTarget(ev.clientX, ev.clientY)
  }
  const end = ok => () => {
    removeEventListener("pointermove", move)
    removeEventListener("pointerup", up)
    removeEventListener("pointercancel", cancel)
    removeEventListener("keydown", esc)
    if (drag) finishDrag(ok)
  }
  const up = end(true), cancel = end(false)
  const esc = ev => { if (ev.key === "Escape") cancel() }
  addEventListener("pointermove", move, { passive: false })
  addEventListener("pointerup", up)
  addEventListener("pointercancel", cancel)
  addEventListener("keydown", esc)
}
function beginDrag(payload) {
  const ghost = el("div", "ghost-card")
  const ic = el("span", "ico")
  let name
  if (payload.kind === "skill") { const s = skillOf(payload.type); ic.append(icon(s.icon)); name = s.name }
  else if (payload.kind === "asset") { ic.append(icon("cube")); name = payload.name }
  else { const b = site().blocks.find(x => x.id === payload.id); ic.append(icon(skillOf(b.type).icon)); name = b.cfg.title; mounted.get(b.id)?.el.classList.add("dragging") }
  ghost.append(ic, el("span", "", name))
  document.body.append(ghost)
  document.body.style.userSelect = "none"
  document.querySelector(`.skill[data-type="${payload.type}"]`)?.classList.add("dragging")
  drag = { payload, ghost, target: null }
}
function clearMarks() {
  document.querySelectorAll(".drop-before,.drop-after,.drop-asset").forEach(n => n.classList.remove("drop-before", "drop-after", "drop-asset", "v"))
  $("drop").classList.remove("over")
}
function updateTarget(x, y) {
  clearMarks()
  drag.target = null
  const hit = document.elementFromPoint(x, y)
  if (!hit) return
  const blocks = site().blocks
  if (drag.payload.kind === "asset") {
    const mEl = hit.closest('#grid .block[data-type="model"]')
    if (mEl) { mEl.classList.add("drop-asset"); drag.target = { kind: "assign", id: mEl.dataset.id }; return }
  }
  if (hit.closest("#drop")) { $("drop").classList.add("over"); drag.target = { kind: "insert", index: blocks.length }; return }
  const bEl = hit.closest("#grid .block")
  if (bEl && !(drag.payload.kind === "block" && bEl.dataset.id === drag.payload.id)) {
    const r = bEl.getBoundingClientRect()
    const vertical = bEl.classList.contains("wide") || $("browser").classList.contains("mobile") || innerWidth <= 760
    const after = vertical ? y > r.top + r.height / 2 : x > r.left + r.width / 2
    bEl.classList.add(after ? "drop-after" : "drop-before")
    if (vertical) bEl.classList.add("v")
    drag.target = { kind: "insert", index: indexOf(bEl.dataset.id) + (after ? 1 : 0) }
    return
  }
  if (hit.closest("#site")) { $("drop").classList.add("over"); drag.target = { kind: "insert", index: blocks.length } }
}
function finishDrag(ok) {
  const { payload, ghost, target } = drag
  ghost.remove()
  clearMarks()
  document.body.style.userSelect = ""
  document.querySelectorAll(".dragging").forEach(n => n.classList.remove("dragging"))
  drag = null
  if (!ok || !target) return
  if (payload.kind === "skill") addBlock(payload.type, target.index)
  else if (payload.kind === "block") moveBlock(payload.id, target.index)
  else if (payload.kind === "asset") {
    if (target.kind === "assign") assignAsset(site().blocks.find(b => b.id === target.id), payload.key)
    else useAsset(payload.key, target.index)
  }
}

// ───────── 상단·사이드 패널 ─────────
function isDirty(s) {
  const latest = s.versions[0]
  return JSON.stringify(strip(s.blocks)) !== JSON.stringify(latest?.blocks ?? [])
}
function renderStatus() {
  const s = site()
  const d = $("draft")
  const dirty = isDirty(s)
  d.className = `draft ${dirty ? "dirty" : s.versions.length ? "live" : ""}`
  d.querySelector("span").textContent = dirty ? "Draft · 변경 있음" : s.versions.length ? `게시됨 v${s.versions[0].v}` : "Draft"
  $("publish-btn").disabled = !dirty
  renderSiteMenu()
  if (!$("deploy-view").hidden) renderDeploy()
}
function renderSiteMenu() {
  const menu = $("site-menu")
  menu.replaceChildren(...sites.map(s => {
    const li = el("li")
    const b = btn("", [], () => switchSite(s.id))
    b.setAttribute("role", "option")
    b.setAttribute("aria-selected", String(s.id === currentId))
    const dot = el("span", `dot${isDirty(s) ? " draft" : ""}`)
    const txt = el("span"); txt.append(s.name, el("small", "", s.domain))
    b.append(dot, txt)
    li.append(b)
    return li
  }), (() => {
    const li = el("li")
    const b = btn("", [el("span", "dot"), el("span", "", "데모 초기화")], () => {
      if (!confirm("모든 사이트의 블록·게시 기록을 처음 상태로 되돌릴까요?")) return
      clearMounted(); sites = demoSites(); currentId = sites[0].id; renderAll(); save(); toast("데모를 처음 상태로 되돌렸습니다.")
    })
    b.querySelector(".dot").style.background = "#d9d5ca"
    li.style.borderTop = "1px solid var(--line)"; li.style.marginTop = "4px"; li.style.paddingTop = "4px"
    li.append(b)
    return li
  })())
}
function switchSite(id) {
  toggleMenu(false)
  if (id === currentId) return
  clearMounted()
  currentId = id
  renderAll(); save()
  toast(`${site().name} 사이트로 전환했습니다.`)
}
function toggleMenu(open) {
  const menu = $("site-menu")
  open ??= menu.hidden
  menu.hidden = !open
  $("site-switch").setAttribute("aria-expanded", String(open))
}

function publish() {
  const s = site()
  if (!isDirty(s)) return
  const v = (s.versions[0]?.v ?? 0) + 1
  const names = s.blocks.map(b => b.cfg.title)
  s.versions.unshift({ v, at: new Date().toISOString(), note: `블록 ${s.blocks.length}개 · ${names.slice(0, 3).join(", ")}${names.length > 3 ? " 외" : ""}`, blocks: strip(s.blocks) })
  save()
  toast(`v${v}을(를) ${s.domain}에 게시했습니다. (데모: 실제 배포는 하지 않습니다)`)
}
function rollback(v) {
  const s = site()
  const ver = s.versions.find(x => x.v === v)
  if (!ver) return
  clearMounted()
  s.blocks = clone(ver.blocks).map(b => ({ ...b, prompt: "", history: [], applied: [] }))
  s.selected = s.blocks[0]?.id ?? null
  renderCanvas(); renderInspector(); renderAssets(); save()
  toast(`v${v} 구성을 초안으로 불러왔습니다. 게시하면 사이트에 반영됩니다.`)
}
function renderDeploy() {
  const s = site()
  const t = $("deploy-target")
  const row = (k, v) => { const r = el("div", "row"); r.append(el("span", "", k), el("span", "", v)); return r }
  t.replaceChildren(row("도메인", s.domain), row("게시 버전", s.versions[0] ? `v${s.versions[0].v}` : "없음"), row("초안", isDirty(s) ? "게시 안 된 변경 있음" : "게시본과 같음"), row("배포 방식", "브라우저 데모"))
  const list = $("versions")
  list.replaceChildren(...s.versions.map((ver, i) => {
    const li = el("li")
    const h = el("div", "v-head")
    h.append(el("b", "", `v${ver.v}`))
    if (i === 0) h.append(el("span", "chip hl", "LIVE"))
    const time = el("time", "", new Date(ver.at).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }))
    time.dateTime = ver.at
    h.append(time)
    li.append(h, el("p", "", ver.note), btn("", i === 0 ? "게시본으로 초안 되돌리기" : "이 버전으로 되돌리기", () => rollback(ver.v)))
    return li
  }))
  if (!s.versions.length) list.append(el("li", "", "아직 게시한 버전이 없습니다."))
}
function renderTeam() {
  const people = [["운영자 (나)", "owner@sitedock.example", "Owner", "#c8f031"], ["고객사 담당자", "client@studioon.example", "Editor", "#b8d4ff"], ["외주 디자이너", "design@partner.example", "Viewer", "#ffd7b0"]]
  $("team").replaceChildren(...people.map(([name, mail, role, bg]) => {
    const li = el("li")
    const av = el("span", "avatar", name[0]); av.style.background = bg
    const t = el("div"); t.append(el("strong", "", name), el("small", "", mail))
    li.append(av, t, el("span", "chip role", role))
    return li
  }))
}

function setRail(view) {
  document.querySelectorAll("[data-rail]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.rail === view)))
  document.querySelectorAll(".side-view").forEach(v => { v.hidden = v.dataset.view !== view })
  if (view === "deploy") renderDeploy()
}
function setPreview(on) {
  previewing = on
  document.body.classList.toggle("previewing", on)
  $("site").classList.toggle("editing", !on)
  const b = $("preview-btn")
  b.setAttribute("aria-pressed", String(on))
  b.querySelector("span").textContent = on ? "편집으로" : "미리보기"
  if (on) toast("고객에게 보이는 화면입니다. Esc로 편집 화면에 돌아갑니다.")
}

let toastTimer
function toast(msg, warn) {
  const t = $("toast")
  t.replaceChildren(icon(warn ? "sparkle" : "check"), el("span", "", msg))
  t.classList.add("show")
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => t.classList.remove("show"), 3200)
}

function renderAll() {
  const s = site()
  $("site-name").textContent = s.name
  $("site-logo").textContent = s.name
  $("url").textContent = s.domain
  document.title = `${s.name} · SiteDock`
  $("site-foot").replaceChildren(el("span", "", `© 2026 ${s.name}`), el("span", "", `${s.domain} · SiteDock으로 운영 중`))
  renderCart()
  renderCanvas(); renderInspector(); renderAssets(); renderStatus()
}

// ───────── 시작 ─────────
document.querySelectorAll("[data-icon]").forEach(n => n.replaceWith(icon(n.dataset.icon)))
document.querySelector('.side-view[data-view="deploy"]').id = "deploy-view"
$("site").classList.add("editing")
$("search").addEventListener("input", renderSkills)
$("sort").addEventListener("change", renderSkills)
$("site-switch").addEventListener("click", e => { e.stopPropagation(); toggleMenu() })
document.addEventListener("click", e => { if (!e.target.closest(".switcher")) toggleMenu(false) })
$("publish-btn").addEventListener("click", publish)
$("preview-btn").addEventListener("click", () => setPreview(!previewing))
document.addEventListener("keydown", e => { if (e.key === "Escape") { if (previewing) setPreview(false); toggleMenu(false) } })
document.querySelectorAll("[data-rail]").forEach(b => b.addEventListener("click", () => setRail(b.dataset.rail)))
document.querySelectorAll("[data-width]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-width]").forEach(x => x.setAttribute("aria-pressed", String(x === b)))
  $("browser").classList.toggle("mobile", b.dataset.width === "mobile")
}))
$("reload").addEventListener("click", () => { clearMounted(); renderCanvas(); toast("사이트를 다시 그렸습니다.") })
$("cart").addEventListener("click", () => toast(`장바구니에 ${site().cart || 0}개가 있습니다. (예시 화면)`))
const up = $("upload")
$("glb-input").addEventListener("change", e => { handleUpload(e.target.files[0]); e.target.value = "" })
up.addEventListener("dragover", e => { e.preventDefault(); up.classList.add("over") })
up.addEventListener("dragleave", () => up.classList.remove("over"))
up.addEventListener("drop", e => { e.preventDefault(); up.classList.remove("over"); handleUpload(e.dataTransfer.files[0]) })

renderSkills()
renderTeam()
renderAll()
refreshStars()
window.SiteDock3D?.preload().catch(() => {})
