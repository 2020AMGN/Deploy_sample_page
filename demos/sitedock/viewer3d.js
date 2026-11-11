"use strict"
/*
 * SiteDock Model Viewer 스킬 — three.js(mrdoob/three.js) 기반 상품 3D 뷰어.
 * 기본 상품(Arc Desk Lamp · Lounge Chair)은 코드로 만든 3D 형상이고, 업로드한 GLB는 GLTFLoader로 읽습니다.
 * index.html의 importmap이 three와 three/addons 경로를 지정합니다.
 */
window.SiteDock3D = (() => {
  let libs = null
  function load() {
    libs ??= Promise.all([
      import("three"),
      import("three/addons/controls/OrbitControls.js"),
      import("three/addons/loaders/GLTFLoader.js"),
      import("three/addons/environments/RoomEnvironment.js")
    ]).then(([THREE, { OrbitControls }, { GLTFLoader }, { RoomEnvironment }]) => ({ THREE, OrbitControls, GLTFLoader, RoomEnvironment }))
    return libs
  }

  function lamp(T) {
    const g = new T.Group()
    const lime = new T.MeshPhysicalMaterial({ color: 0x9fcc00, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.06 })
    const base = new T.Mesh(new T.LatheGeometry([
      [0, 0], [0.5, 0], [0.57, 0.025], [0.59, 0.07], [0.55, 0.12], [0.4, 0.158], [0.18, 0.172], [0, 0.175]
    ].map(([x, y]) => new T.Vector2(x, y)), 96), lime)
    base.position.x = 0.12
    g.add(base)

    const curve = new T.CatmullRomCurve3([
      [0.16, 0.12], [0.36, 0.45], [0.45, 0.85], [0.34, 1.21], [0.08, 1.44], [-0.24, 1.47]
    ].map(([x, y]) => new T.Vector3(x, y, 0)))
    g.add(new T.Mesh(new T.TubeGeometry(curve, 160, 0.068, 28), lime))
    for (const p of [curve.getPoint(0), curve.getPoint(1)]) {
      const cap = new T.Mesh(new T.SphereGeometry(0.068, 24, 16), lime)
      cap.position.copy(p)
      g.add(cap)
    }

    const shade = new T.Group()
    const dome = new T.SphereGeometry(0.53, 72, 36, 0, Math.PI * 2, 0, Math.PI / 2)
    const outer = new T.Mesh(dome, lime)
    const inner = new T.Mesh(dome, new T.MeshStandardMaterial({ color: 0xfff6df, emissive: 0xffe9b8, emissiveIntensity: 0.55, roughness: 0.6, side: T.BackSide }))
    inner.scale.setScalar(0.985)
    const glow = new T.Mesh(new T.CircleGeometry(0.46, 64), new T.MeshStandardMaterial({ color: 0xfffaf0, emissive: 0xfff1cf, emissiveIntensity: 1.4, side: T.DoubleSide }))
    glow.rotation.x = Math.PI / 2
    glow.position.y = 0.06
    const rim = new T.Mesh(new T.TorusGeometry(0.53, 0.016, 12, 96), lime)
    rim.rotation.x = Math.PI / 2
    const bulb = new T.PointLight(0xffe2a8, 1.6, 2.6, 1.6)
    bulb.position.y = -0.05
    shade.add(outer, inner, glow, rim, bulb)
    shade.scale.set(1, 0.6, 1)
    shade.rotation.z = -0.44
    shade.position.set(-0.46, 1.2, 0)
    g.add(shade)
    return g
  }

  function chair(T) {
    const g = new T.Group()
    const fabric = new T.MeshPhysicalMaterial({ color: 0xe8dec9, roughness: 0.95, sheen: 0.6, sheenColor: 0xffffff, sheenRoughness: 0.8 })
    const walnut = new T.MeshStandardMaterial({ color: 0x4a3122, roughness: 0.45 })
    const rad = d => d * Math.PI / 180
    const ring = new T.Shape()
    ring.absarc(0, 0, 0.64, rad(-38), rad(218), false)
    ring.absarc(0, 0, 0.5, rad(218), rad(-38), true)
    const shellGeo = new T.ExtrudeGeometry(ring, { depth: 0.46, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 6, curveSegments: 72 })
    const shell = new T.Mesh(shellGeo, fabric)
    shell.rotation.x = -Math.PI / 2
    shell.position.y = 0.36
    const seatShape = new T.Shape()
    seatShape.absarc(0, 0, 0.5, 0, Math.PI * 2, false)
    const seat = new T.Mesh(new T.ExtrudeGeometry(seatShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.055, bevelSize: 0.05, bevelSegments: 6, curveSegments: 72 }), fabric)
    seat.rotation.x = -Math.PI / 2
    seat.position.set(0, 0.42, 0.03)
    const plate = new T.Mesh(new T.CylinderGeometry(0.56, 0.56, 0.06, 64), walnut)
    plate.position.y = 0.33
    g.add(shell, seat, plate)
    for (const a of [45, 135, 225, 315]) {
      const leg = new T.Mesh(new T.CylinderGeometry(0.036, 0.02, 0.34, 20), walnut)
      const x = Math.cos(rad(a)) * 0.4, z = Math.sin(rad(a)) * 0.4
      leg.position.set(x * 1.08, 0.165, z * 1.08)
      leg.rotation.set(z * 0.22, 0, -x * 0.22)
      g.add(leg)
    }
    return g
  }

  async function mount(container, options) {
    const { THREE: T, OrbitControls, GLTFLoader, RoomEnvironment } = await load()
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.outputColorSpace = T.SRGBColorSpace
    renderer.toneMapping = T.NeutralToneMapping
    renderer.toneMappingExposure = 0.95
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = T.PCFSoftShadowMap
    container.prepend(renderer.domElement)

    const scene = new T.Scene()
    const pmrem = new T.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = 0.75
    const camera = new T.PerspectiveCamera(30, 1, 0.1, 50)
    const target = new T.Vector3(0, 0.92, 0)
    const sun = new T.DirectionalLight(0xffffff, 1.6)
    sun.position.set(-2.5, 5, 3)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    sun.shadow.camera.left = sun.shadow.camera.bottom = -2
    sun.shadow.camera.right = sun.shadow.camera.top = 2
    sun.shadow.radius = 6
    sun.shadow.bias = -0.0004
    scene.add(sun, new T.HemisphereLight(0xffffff, 0xe9e3d4, 0.6))

    const plinth = new T.Mesh(new T.CylinderGeometry(1.06, 1.1, 0.22, 120), new T.MeshStandardMaterial({ color: 0xe4dccb, roughness: 0.9 }))
    plinth.position.y = 0.11
    plinth.receiveShadow = true
    scene.add(plinth)
    const floor = new T.Mesh(new T.CircleGeometry(3, 64), new T.ShadowMaterial({ opacity: 0.07 }))
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.copy(target)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false
    controls.minPolarAngle = 0.9
    controls.maxPolarAngle = 1.5
    controls.autoRotateSpeed = 2.2

    let current = null
    let state = {}
    let modelKey = null

    function fit(obj) {
      obj.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
      const box = new T.Box3().setFromObject(obj)
      const size = box.getSize(new T.Vector3())
      const s = Math.min(1.6 / (size.y || 1), 1.85 / (Math.max(size.x, size.z) || 1))
      obj.scale.multiplyScalar(s)
      const fitted = new T.Box3().setFromObject(obj)
      const c = fitted.getCenter(new T.Vector3())
      obj.position.x -= c.x
      obj.position.z -= c.z
      obj.position.y += 0.22 - fitted.min.y
      const h = fitted.max.y - fitted.min.y
      target.set(0, 0.22 + h * 0.48, 0)
      controls.target.copy(target)
    }

    function disposeObject(obj) {
      obj.traverse(o => {
        if (!o.isMesh) return
        o.geometry.dispose()
        for (const m of [].concat(o.material)) { for (const k in m) if (m[k]?.isTexture) m[k].dispose(); m.dispose() }
      })
    }

    async function setModel(model) {
      const key = typeof model === "string" ? model : model?.id
      if (key === modelKey) return
      modelKey = key
      let obj
      if (model === "lamp") obj = lamp(T)
      else if (model === "chair") obj = chair(T)
      else if (model?.buffer) obj = (await new GLTFLoader().parseAsync(model.buffer.slice(0), "")).scene
      else obj = lamp(T)
      if (key !== modelKey) { disposeObject(obj); return }
      if (current) { scene.remove(current); disposeObject(current) }
      current = obj
      const wrap = new T.Group()
      wrap.add(obj)
      fit(wrap)
      current = wrap
      scene.add(wrap)
    }

    function placeCamera() {
      const theta = (state.angle ?? 30) * Math.PI / 180
      const phi = 1.3, r = 5.6
      camera.position.set(
        target.x + r * Math.sin(phi) * Math.sin(theta),
        target.y + r * Math.cos(phi),
        target.z + r * Math.sin(phi) * Math.cos(theta)
      )
      controls.update()
    }

    async function update(next) {
      const prev = state
      state = { ...state, ...next }
      await setModel(state.model)
      controls.enableRotate = state.dragRotate !== false
      controls.autoRotate = !!state.autoRotate
      if (prev.angle !== state.angle || prev.model !== state.model) placeCamera()
    }

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(container)
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth, h = container.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(container)
    renderer.setAnimationLoop(() => {
      if (!visible) return
      controls.update()
      renderer.render(scene, camera)
    })

    await update(options)
    return {
      update,
      reset() { placeCamera() },
      angle() { return Math.round(((controls.getAzimuthalAngle() * 180 / Math.PI) + 360) % 360) },
      dispose() {
        renderer.setAnimationLoop(null)
        io.disconnect(); ro.disconnect(); controls.dispose()
        if (current) disposeObject(current)
        plinth.geometry.dispose(); plinth.material.dispose()
        pmrem.dispose(); renderer.dispose(); renderer.forceContextLoss()
        renderer.domElement.remove()
      }
    }
  }

  return { mount, preload: load }
})()
