"use strict"

const repositories = [
  { id: "chart", name: "Chart.js", repo: "chartjs/Chart.js", stars: "67.8k", icon: "▥", label: "방문 통계", sample: '제목 "고객 유입" 색상 초록 최근 3개월', guide: "제목, 색상, 최근 3개월 또는 최근 6개월" },
  { id: "markdown", name: "Marked", repo: "markedjs/marked", stars: "37.2k", icon: "≡", label: "공지 작성", sample: '제목 "이용 안내" 미리보기만', guide: "제목, 색상, 미리보기만 또는 편집 허용" },
  { id: "calendar", name: "FullCalendar", repo: "fullcalendar/fullcalendar", stars: "20.8k", icon: "▦", label: "상담 일정", sample: '제목 "상담 예약" 색상 보라 다음 달', guide: "제목, 색상, 이번 달 또는 다음 달" }
]

const colors = new Map([["파랑", "#244ee7"], ["초록", "#16825a"], ["보라", "#7650bf"], ["주황", "#a55010"]])
const blocks = []
let selected = null
let nextId = 1
let toastTimer
const byId = id => document.getElementById(id)

function element(tag, className, content) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (content !== undefined) node.textContent = content
  return node
}

function button(label, action, accessibleLabel) {
  const node = element("button", "", label)
  node.type = "button"
  if (accessibleLabel) node.setAttribute("aria-label", accessibleLabel)
  node.addEventListener("click", action)
  return node
}

function announce(message) {
  byId("toast").textContent = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { byId("toast").textContent = "" }, 2800)
}

function renderCatalog() {
  const query = byId("search").value.trim().toLowerCase()
  const visible = repositories.filter(repo => [repo.name, repo.repo, repo.label].some(value => value.toLowerCase().includes(query)))
  const catalog = byId("catalog")
  catalog.replaceChildren()
  for (const repo of visible) {
    const card = element("article", "repo")
    card.draggable = true
    card.dataset.repository = repo.id
    card.addEventListener("dragstart", event => {
      event.dataTransfer.setData("application/x-sitedock", repo.id)
      event.dataTransfer.effectAllowed = "copy"
    })
    const summary = element("div")
    const link = element("a", "", `GitHub ↗ · ★ ${repo.stars}`)
    link.href = `https://github.com/${repo.repo}`
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.draggable = false
    link.setAttribute("aria-label", `${repo.repo} 저장소 열기`)
    summary.append(element("strong", "", repo.name), link)
    card.append(element("span", "repo-icon", repo.icon), summary, button("+", () => add(repo.id), `${repo.name} 추가`))
    catalog.append(card)
  }
  if (!visible.length) catalog.append(element("p", "empty", "검색 결과가 없습니다."))
}

function add(repository, quiet = false) {
  const repo = repositories.find(item => item.id === repository)
  if (!repo) return
  const block = {
    id: nextId++, repo, title: repo.label, accent: colors.get("파랑"),
    range: 6, month: 0, day: null, readOnly: false, prompt: "",
    markdown: "# 고객 포털 안내\n새 소식은 이곳에서 확인하세요."
  }
  blocks.push(block)
  selected = block.id
  render()
  if (!quiet) announce(`${repo.name} 블록을 추가했습니다.`)
}

function move(block, step) {
  const index = blocks.indexOf(block)
  const target = index + step
  if (target < 0 || target >= blocks.length) return
  blocks.splice(index, 1)
  blocks.splice(target, 0, block)
  renderCanvas()
  announce("블록 순서를 변경했습니다.")
}

function remove(block) {
  const index = blocks.indexOf(block)
  blocks.splice(index, 1)
  if (selected === block.id) selected = blocks[Math.min(index, blocks.length - 1)]?.id ?? null
  render()
  announce("블록을 제거했습니다.")
}

function renderChart(block) {
  const area = element("div")
  const select = element("select")
  select.setAttribute("aria-label", "방문 통계 기간")
  for (const months of [3, 6]) {
    const option = element("option", "", `최근 ${months}개월`)
    option.value = months
    select.append(option)
  }
  select.value = block.range
  const chart = element("div", "chart")
  chart.setAttribute("aria-label", "월별 예시 방문자 수")
  const draw = () => {
    const current = new Date()
    const values = [28, 46, 39, 59, 53, 69].slice(-Number(select.value))
    chart.replaceChildren(...values.map((value, index) => {
      const month = new Date(current.getFullYear(), current.getMonth() - values.length + index + 1, 1).getMonth() + 1
      const cell = element("div", "bar-cell")
      const bar = element("span", "bar")
      bar.style.setProperty("--height", `${value}px`)
      cell.append(bar, element("span", "", `${month}월`))
      cell.title = `${month}월 · ${value * 10}명`
      return cell
    }))
  }
  select.addEventListener("change", () => { block.range = Number(select.value); draw() })
  draw()
  area.append(select, chart)
  return area
}

function renderCalendar(block) {
  const area = element("div")
  const toolbar = element("div", "calendar-head")
  const title = element("strong")
  const grid = element("div", "calendar-grid")
  const status = element("p", "hint")
  const changeMonth = step => { block.month += step; block.day = null; draw() }
  toolbar.append(button("‹", () => changeMonth(-1), "이전 달"), title, button("›", () => changeMonth(1), "다음 달"))
  area.append(toolbar, grid, status)
  function draw() {
    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth() + block.month, 1)
    const month = date.getMonth() + 1
    title.textContent = `${date.getFullYear()}년 ${month}월`
    grid.replaceChildren(..."일월화수목금토".split("").map(day => element("span", "", day)))
    for (let i = 0; i < date.getDay(); i++) grid.append(element("span"))
    const last = new Date(date.getFullYear(), month, 0).getDate()
    for (let day = 1; day <= last; day++) {
      const cell = button(String(day), () => { block.day = day; draw(); grid.querySelector('[aria-pressed="true"]').focus() }, `${month}월 ${day}일 선택`)
      cell.setAttribute("aria-pressed", String(day === block.day))
      grid.append(cell)
    }
    status.textContent = block.day ? `선택한 날짜 · ${month}월 ${block.day}일` : "날짜를 눌러 선택하세요."
  }
  draw()
  return area
}

function renderMarkdown(block) {
  const area = element("div")
  const output = element("div", "markdown-output")
  const draw = () => {
    output.replaceChildren(...block.markdown.split("\n").filter(line => line.trim()).map(line => {
      const heading = /^#{1,6}\s+(.+)$/.exec(line)
      return heading ? element("h4", "", heading[1]) : element("p", "", line)
    }))
  }
  if (!block.readOnly) {
    const input = element("textarea", "markdown-source")
    input.rows = 3
    input.value = block.markdown
    input.setAttribute("aria-label", "공지 Markdown 원문")
    input.addEventListener("input", () => { block.markdown = input.value; draw() })
    area.append(input)
  }
  draw()
  area.append(output)
  return area
}

const widgets = { chart: renderChart, calendar: renderCalendar, markdown: renderMarkdown }

function blockNode(block, editing) {
  const card = element("article", "block")
  card.style.setProperty("--accent", block.accent)
  const head = element("div", "block-head")
  const title = element("h3", "", block.title)
  title.style.color = block.accent
  head.append(title)
  if (editing) {
    const controls = element("div", "tools")
    const select = button(selected === block.id ? "선택됨" : "설정", () => {
      selected = block.id
      render()
      byId("prompt").focus()
    }, `${block.title} 설정`)
    const up = button("↑", () => move(block, -1), `${block.title} 위로 이동`)
    const down = button("↓", () => move(block, 1), `${block.title} 아래로 이동`)
    up.disabled = blocks[0] === block
    down.disabled = blocks.at(-1) === block
    controls.append(select, up, down, button("×", () => remove(block), `${block.title} 제거`))
    head.append(controls)
    card.classList.toggle("selected", selected === block.id)
  }
  card.append(head, widgets[block.repo.id](block))
  return card
}

function applyPrompt(block, prompt) {
  let changes = 0
  const title = /제목\s*(?:을|은|:)?\s*["“]([^"”]+)["”]/.exec(prompt)
  if (title?.[1].trim()) {
    block.title = title[1].trim().slice(0, 80)
    changes++
  }
  const color = /색상\s*(?:을|은|:)?\s*(파랑|초록|보라|주황)/.exec(prompt)
  if (color) {
    block.accent = colors.get(color[1])
    changes++
  }
  const option = {
    chart: /최근\s*([36])\s*개월/,
    calendar: /(이번\s*달|다음\s*달)/,
    markdown: /(미리보기만|편집\s*허용)/
  }[block.repo.id].exec(prompt)
  if (option) {
    if (block.repo.id === "chart") block.range = Number(option[1])
    if (block.repo.id === "calendar") { block.month = option[1].startsWith("다음") ? 1 : 0; block.day = null }
    if (block.repo.id === "markdown") block.readOnly = option[1] === "미리보기만"
    changes++
  }
  return changes
}

function renderEditor() {
  const editor = byId("editor")
  editor.replaceChildren()
  const block = blocks.find(item => item.id === selected)
  if (!block) {
    editor.append(element("p", "hint", "라이브러리에서 기능을 추가하거나 캔버스에서 블록을 선택하세요."))
    return
  }
  const identity = element("div", "selected-repo")
  identity.append(element("span", "repo-icon", block.repo.icon), element("strong", "", block.repo.name))
  const form = element("form", "prompt-form")
  const label = element("label", "", "기능을 어떻게 바꿀까요?")
  label.htmlFor = "prompt"
  const input = element("textarea")
  input.id = "prompt"
  input.required = true
  input.maxLength = 400
  input.value = block.prompt
  input.placeholder = block.repo.sample
  input.addEventListener("input", () => { block.prompt = input.value })
  const submit = element("button", "primary", "✦ 프롬프트 적용")
  submit.type = "submit"
  const sample = button("예시 프롬프트 넣기", () => {
    input.value = block.repo.sample
    block.prompt = input.value
    input.focus()
  })
  sample.className = "sample"
  const hint = element("p", "hint", `지원 명령 · ${block.repo.guide}. 제목은 따옴표로 묶으세요. 브라우저의 규칙 기반 처리입니다.`)
  form.append(label, input, submit, sample, hint)
  form.addEventListener("submit", event => {
    event.preventDefault()
    const count = applyPrompt(block, input.value)
    if (count) renderCanvas()
    announce(count ? `설정 ${count}개를 미리보기에 반영했습니다.` : "지원하는 명령을 찾지 못했습니다. 예시 프롬프트를 사용해 보세요.")
  })
  editor.append(identity, form)
}

function renderCanvas() {
  byId("blocks").replaceChildren(...blocks.map(block => blockNode(block, true)))
}

function render() {
  renderCanvas()
  renderEditor()
}

const browser = byId("browser")
const dropzone = byId("dropzone")
browser.addEventListener("dragover", event => {
  if (!event.dataTransfer.types.includes("application/x-sitedock")) return
  event.preventDefault()
  event.dataTransfer.dropEffect = "copy"
  dropzone.classList.add("over")
})
browser.addEventListener("dragleave", event => {
  if (!browser.contains(event.relatedTarget)) dropzone.classList.remove("over")
})
browser.addEventListener("drop", event => {
  event.preventDefault()
  dropzone.classList.remove("over")
  add(event.dataTransfer.getData("application/x-sitedock"))
})
document.addEventListener("dragend", () => dropzone.classList.remove("over"))
byId("search").addEventListener("input", renderCatalog)

for (const mode of ["desktop", "mobile"]) {
  byId(mode).addEventListener("click", () => {
    browser.classList.toggle("narrow", mode === "mobile")
    byId("desktop").setAttribute("aria-pressed", String(mode === "desktop"))
    byId("mobile").setAttribute("aria-pressed", String(mode === "mobile"))
  })
}

const previewDialog = byId("preview-dialog")
byId("view").addEventListener("click", () => {
  const preview = byId("preview")
  const list = element("div", "preview-blocks")
  // Preview interactions are independent from the editable canvas.
  list.append(...blocks.map(block => blockNode({ ...block }, false)))
  if (!blocks.length) list.append(element("p", "empty", "추가된 기능 블록이 없습니다."))
  preview.replaceChildren(byId("site").querySelector(".site-head").cloneNode(true), list)
  previewDialog.showModal()
})

renderCatalog()
add("chart", true)
