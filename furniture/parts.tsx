import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

export type Tex = THREE.Texture

/** ワールドで使うテクスチャ一式 */
export interface TexSet {
  floor: Tex
  wall: Tex
  wood: Tex
  rug: Tex
  blanket: Tex
  curtain: Tex
  sky: Tex
  monitor: Tex
  poster: Tex
  floorN: Tex
  wallN: Tex
  woodN: Tex
  rugN: Tex
  blanketN: Tex
  curtainN: Tex
}

export const C = {
  ceiling: '#f2ede2',
  mattress: '#f5f2ea',
  pillow: '#ffffff',
  moon: '#f4ecd8',
  white: '#f7f4ec',
  baseboard: '#ded4bf',
  darkMetal: '#3c3f45',
  bookColors: ['#b5524a', '#4a7ab5', '#5da364', '#d9a441', '#7a5fa0'],
} as const


/** 箱型オブジェクト（見た目＋当たり判定）。radius を渡すと角丸になる */
export const Box: React.FC<{
  pos: [number, number, number]
  size: [number, number, number]
  color?: string
  tex?: Tex
  normalTex?: Tex
  collider?: boolean
  emissive?: string
  emissiveIntensity?: number
  roughness?: number
  rotY?: number
  rotX?: number
  radius?: number
}> = ({
  pos,
  size,
  color = '#ffffff',
  tex,
  normalTex,
  collider = true,
  emissive,
  emissiveIntensity = 0,
  roughness = 0.95,
  rotY = 0,
  rotX = 0,
  radius = 0,
}) => {
  const material = (
    <meshStandardMaterial
      color={color}
      map={tex ?? null}
      normalMap={normalTex ?? null}
      roughness={roughness}
      emissive={emissive ?? '#000000'}
      emissiveIntensity={emissiveIntensity}
    />
  )
  const mesh =
    radius > 0 ? (
      <RoundedBox
        args={size}
        radius={radius}
        smoothness={4}
        position={pos}
        rotation={[rotX, rotY, 0]}
        receiveShadow
        castShadow
      >
        {material}
      </RoundedBox>
    ) : (
      <mesh position={pos} rotation={[rotX, rotY, 0]} receiveShadow castShadow>
        <boxGeometry args={size} />
        {material}
      </mesh>
    )
  if (!collider) return mesh
  return (
    <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={1}>
      {mesh}
    </RigidBody>
  )
}

/** ひだのあるカーテン（細かく波打たせた平面） */
export const Curtain: React.FC<{ pos: [number, number, number]; tex: Tex; normalTex: Tex }> = ({ pos, tex, normalTex }) => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.38, 1.46, 48, 12)
    const p = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i)
      const y = p.getY(i)
      p.setZ(i, Math.sin((x / 0.38 + 0.5) * Math.PI * 5) * 0.034 + Math.sin(y * 2.4) * 0.004)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh position={pos} geometry={geo} castShadow>
      <meshStandardMaterial map={tex} normalMap={normalTex} side={THREE.DoubleSide} roughness={1} />
    </mesh>
  )
}

/** ランプの光の中を漂うホコリ（さりげない空気感） */
export const DustMotes: React.FC<{ active: boolean }> = ({ active }) => {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(70 * 3)
    let seed = 7
    const rnd = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < 70; i++) {
      arr[i * 3] = 0.4 + rnd() * 1.35
      arr[i * 3 + 1] = 0.4 + rnd() * 1.7
      arr[i * 3 + 2] = rnd() * 1.3
    }
    return arr
  }, [])
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.008
    ref.current.position.y = Math.sin(t * 0.12) * 0.03
  })
  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.011}
        color="#ffdca8"
        transparent
        opacity={active ? 0.32 : 0.1}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/** 超楕円体ジオメトリ（e>2 で「角の丸い箱」= 膨らんだクッション形） */
const puffGeometry = (w: number, h: number, d: number, e = 3, wseg = 22, hseg = 16): THREE.BufferGeometry => {
  const sp = (x: number, p: number) => Math.sign(x) * Math.pow(Math.abs(x), p)
  const pw = 2 / e
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  for (let j = 0; j <= hseg; j++) {
    const u = -Math.PI / 2 + (j / hseg) * Math.PI
    for (let i = 0; i <= wseg; i++) {
      const v = -Math.PI + (i / wseg) * Math.PI * 2
      const cu = Math.cos(u)
      positions.push(
        (w / 2) * sp(cu, pw) * sp(Math.cos(v), pw),
        (h / 2) * sp(Math.sin(u), pw),
        (d / 2) * sp(cu, pw) * sp(Math.sin(v), pw),
      )
      uvs.push(i / wseg, j / hseg)
    }
  }
  for (let j = 0; j < hseg; j++) {
    for (let i = 0; i < wseg; i++) {
      const a = j * (wseg + 1) + i
      const b = a + wseg + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  g.setIndex(indices)
  g.computeVertexNormals()
  return g
}

/** 膨らんだ柔らかい物（枕・クッション・パッド用、見た目のみ） */
export const Puff: React.FC<{
  pos: [number, number, number]
  size: [number, number, number]
  color?: string
  e?: number
  rotY?: number
  roughness?: number
}> = ({ pos, size, color = '#ffffff', e = 3, rotY = 0, roughness = 1 }) => {
  const geo = useMemo(() => puffGeometry(size[0], size[1], size[2], e), [size, e])
  return (
    <mesh position={pos} rotation={[0, rotY, 0]} geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  )
}

/**
 * 掛け布団（格子メッシュを縁で垂らす）
 * マットレス: x -1.71..0.19 / z -1.30..-0.36 / 上面 y 0.54。布団上面 y 0.585。
 * 足側（x）と手前側（z）の縁だけ、スムーズステップで 0.17m 垂れる。
 */
export const DrapeBlanket: React.FC<{ tex: Tex; normalTex: Tex }> = ({ tex, normalTex }) => {
  const geo = useMemo(() => {
    const x0 = -1.18
    const x1 = 0.265
    const z0 = -1.3
    const z1 = -0.285
    const topY = 0.585
    const segX = 56
    const segZ = 40
    const smooth = (t: number) => t * t * (3 - 2 * t)
    const positions: number[] = []
    const uvs: number[] = []
    const indices: number[] = []
    for (let j = 0; j <= segZ; j++) {
      const z = z0 + (j / segZ) * (z1 - z0)
      for (let i = 0; i <= segX; i++) {
        const x = x0 + (i / segX) * (x1 - x0)
        const tx = THREE.MathUtils.clamp((x - 0.19) / 0.075, 0, 1)
        const tz = THREE.MathUtils.clamp((z + 0.36) / 0.075, 0, 1)
        const dx = 0.17 * smooth(tx) * (1 + 0.022 * Math.sin(z * 4.5) + 0.012 * Math.sin(z * 11.7 + 2.0))
        const dz = 0.17 * smooth(tz) * (1 + 0.022 * Math.sin(x * 4.5 + 1.2) + 0.012 * Math.sin(x * 11.7 + 4.0))
        let y = topY - (Math.max(dx, dz) + 0.15 * Math.min(dx, dz))
        const flat = 1 - Math.max(tx, tz)
        y += 0.0035 * Math.sin(x * 26 + 1.7) * Math.sin(z * 19) * flat
        y += 0.0045 * Math.sin(x * 30 + 0.8) * tz * (1 - tz) * 4 * 0.25
        y += 0.0045 * Math.sin(z * 30) * tx * (1 - tx) * 4 * 0.25
        positions.push(x, y, z)
        uvs.push(((x - x0) / (x1 - x0)) * 1.15, ((z - z0) / (z1 - z0)) * 1.05)
      }
    }
    for (let j = 0; j < segZ; j++) {
      for (let i = 0; i < segX; i++) {
        const a = j * (segX + 1) + i
        const b = a + segX + 1
        indices.push(a, a + 1, b, b, a + 1, b + 1)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    g.setIndex(indices)
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial map={tex} normalMap={normalTex} roughness={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

/** ティッシュの飛び出し（小さな波打ち平面） */
export const TissueSheet: React.FC<{ pos: [number, number, number] }> = ({ pos }) => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.085, 0.055, 14, 6)
    const pp = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pp.count; i++) {
      pp.setZ(i, Math.sin(pp.getX(i) * 60) * 0.006 + Math.cos(pp.getY(i) * 40) * 0.004)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh position={pos} rotation={[-0.6, 0, 0.15]} geometry={geo}>
      <meshStandardMaterial color="#ffffff" roughness={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

