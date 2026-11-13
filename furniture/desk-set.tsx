/**
 * 学習デスクセット（DeskSet）
 * デスク・モニター・Seat椅子・ベル型ランプ（Interactable）・マグカップ・ノート
 * 出典: XRiftワールド「六畳の寝室（夜）」v21
 * 依存: ./parts（Box / Puff / DrapeBlanket 等の共通部品）
 */
import * as THREE from 'three'
import { Interactable, Seat } from '@xrift/world-components'
import { Box, C, DustMotes, Puff, type TexSet } from './parts'

export const DeskSet: React.FC<{ tex: TexSet; lampOn: boolean; onToggleLamp: () => void }> = ({
  tex,
  lampOn,
  onToggleLamp,
}) => (
  <>
{/* ========== デスク＋椅子＋ランプ＋PC（南東） ========== */}
      <Box pos={[1.15, 0.72, 0.98]} size={[1.2, 0.05, 0.6]} tex={tex.wood} normalTex={tex.woodN} roughness={0.6} radius={0.012} />
      <Box pos={[0.6, 0.36, 0.98]} size={[0.05, 0.72, 0.55]} tex={tex.wood} color="#b39a7e" radius={0.008} />
      <Box pos={[1.7, 0.36, 0.98]} size={[0.05, 0.72, 0.55]} tex={tex.wood} color="#b39a7e" radius={0.008} />
      {/* 椅子（座れる） */}
      <Seat
        id="desk-chair"
        position={[1.15, 0.475, 0.36]}
        rotation={[0, Math.PI, 0]}
        exitOffset={{ forward: -0.55 }}
        interactionText="座る"
      >
        <Box pos={[0, -0.025, 0]} size={[0.42, 0.05, 0.42]} tex={tex.wood} normalTex={tex.woodN} color="#9a8474" radius={0.018} />
        <Box pos={[0, 0.375, 0.19]} size={[0.42, 0.85, 0.05]} tex={tex.wood} normalTex={tex.woodN} color="#9a8474" radius={0.015} />
        <Puff pos={[0, 0.022, 0]} size={[0.4, 0.06, 0.4]} color="#6f7d90" e={3} />
        <Puff pos={[0, 0.4, 0.163]} size={[0.38, 0.46, 0.065]} color="#6f7d90" e={3} />
        {[
          [0.17, 0.17],
          [-0.17, 0.17],
          [0.17, -0.17],
          [-0.17, -0.17],
        ].map(([lx, lz], i) => (
          <Box key={`chair-leg-${i}`} pos={[lx, -0.265, lz]} size={[0.04, 0.42, 0.04]} color={C.darkMetal} roughness={0.5} />
        ))}
      </Seat>
      {/* モニター */}
      <Box pos={[1.06, 0.752, 0.975]} size={[0.2, 0.014, 0.17]} color={C.darkMetal} collider={false} roughness={0.4} radius={0.006} />
      <Box pos={[1.06, 0.83, 0.988]} size={[0.045, 0.15, 0.03]} color={C.darkMetal} collider={false} roughness={0.4} />
      <Box pos={[1.06, 1.03, 0.967]} size={[0.58, 0.36, 0.018]} color="#14161a" collider={false} roughness={0.35} radius={0.008} />
      {/* 表示面（薄い箱＋自発光） */}
      <mesh position={[1.06, 1.03, 0.956]}>
        <boxGeometry args={[0.54, 0.32, 0.004]} />
        <meshStandardMaterial
          map={tex.monitor}
          emissive="#ffffff"
          emissiveMap={tex.monitor}
          emissiveIntensity={0.9}
          roughness={0.4}
        />
      </mesh>
      <Box pos={[1.06, 0.748, 0.85]} size={[0.76, 0.004, 0.34]} color="#3a3f46" collider={false} roughness={1} radius={0.002} />
      {/* キーボード・マウス */}
      <Box pos={[1.06, 0.758, 0.79]} size={[0.37, 0.016, 0.13]} color="#2e3138" collider={false} roughness={0.6} radius={0.006} />
      <Puff pos={[0.79, 0.764, 0.79]} size={[0.056, 0.032, 0.096]} color="#2e3138" e={2} roughness={0.5} />
      {/* ノートとマグカップ */}
      <Box pos={[1.37, 0.756, 0.84]} size={[0.2, 0.01, 0.28]} color="#f2efe8" collider={false} rotY={0.35} roughness={0.9} radius={0.004} />
      <group position={[0.72, 0.745, 1.1]}>
        <mesh position={[0, 0.0425, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.03, 0.085, 24, 1, true]} />
          <meshStandardMaterial color="#d9d2c4" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.031, 0.0285, 0.08, 24, 1, true]} />
          <meshStandardMaterial color="#c9c0ab" roughness={0.55} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0, 0.068, 0]}>
          <cylinderGeometry args={[0.031, 0.031, 0.003, 24]} />
          <meshStandardMaterial color="#3a2a1c" roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.0325, 0.0028, 10, 28]} />
          <meshStandardMaterial color="#d9d2c4" roughness={0.5} />
        </mesh>
        <mesh position={[0.042, 0.042, 0]} rotation={[0, 0, -2.4435]} castShadow>
          <torusGeometry args={[0.019, 0.0055, 10, 24, 4.8869]} />
          <meshStandardMaterial color="#d9d2c4" roughness={0.5} />
        </mesh>
      </group>
      {/* デスクランプ（円柱ベース＋丸アーム＋円錐シェード＋電球） */}
      <Interactable id="desk-lamp" onInteract={onToggleLamp} interactionText="ランプ">
      <mesh position={[1.58, 0.745, 1.05]} castShadow>
        <latheGeometry
          args={[
            [
              [0.001, 0.0],
              [0.095, 0.0],
              [0.095, 0.012],
              [0.055, 0.028],
              [0.02, 0.034],
              [0.001, 0.035],
            ].map(([px, py]) => new THREE.Vector2(px, py)),
            28,
          ]}
        />
        <meshStandardMaterial color={C.darkMetal} roughness={0.45} />
      </mesh>
      <mesh position={[1.58, 0.99, 1.05]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 0.44, 12]} />
        <meshStandardMaterial color={C.darkMetal} roughness={0.45} />
      </mesh>
      <mesh position={[1.52, 1.155, 1.02]} castShadow>
        <latheGeometry
          args={[
            [
              [0.018, 0.095],
              [0.045, 0.085],
              [0.085, 0.05],
              [0.12, 0.005],
              [0.135, -0.035],
            ].map(([px, py]) => new THREE.Vector2(px, py)),
            28,
          ]}
        />
        <meshStandardMaterial
          color="#ffdf9e"
          emissive="#ffb84d"
          emissiveIntensity={lampOn ? 1.5 : 0.05}
          side={THREE.DoubleSide}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[1.52, 1.16, 1.02]}>
        <sphereGeometry args={[0.032, 16, 12]} />
        <meshStandardMaterial color="#fff3cf" emissive="#ffc46b" emissiveIntensity={lampOn ? 2.6 : 0.05} />
      </mesh>
      </Interactable>

      {/* モニターの配線とコンセント */}
      <Box pos={[1.06, 0.89, 1.0]} size={[0.016, 0.28, 0.016]} color="#17181c" collider={false} roughness={0.7} />
      <Box pos={[1.2, 0.752, 1.18]} size={[0.3, 0.012, 0.016]} color="#17181c" collider={false} roughness={0.7} />
      <Box pos={[1.35, 0.52, 1.31]} size={[0.016, 0.46, 0.016]} color="#17181c" collider={false} roughness={0.7} />
      <Box pos={[1.35, 0.28, 1.35 - 0.012]} size={[0.13, 0.13, 0.014]} color={C.white} collider={false} roughness={0.5} radius={0.008} />
      <Box pos={[1.325, 0.28, 1.35 - 0.02]} size={[0.008, 0.03, 0.006]} color="#2b2b2b" collider={false} />
      <Box pos={[1.375, 0.28, 1.35 - 0.02]} size={[0.008, 0.03, 0.006]} color="#2b2b2b" collider={false} />
      <DustMotes active={lampOn} />

        </>
)

/** チェスト＋観葉植物＋ティッシュ（東壁） */
