/**
 * 3段チェスト（ChestSet）
 * バーハンドル付き引き出し3段・観葉植物（Lathe鉢）・ティッシュ
 * 出典: XRiftワールド「六畳の寝室（夜）」v21
 * 依存: ./parts（Box / Puff / DrapeBlanket 等の共通部品）
 */
import * as THREE from 'three'
import { Box, C, TissueSheet, type TexSet } from './parts'

export const ChestSet: React.FC<{ tex: TexSet }> = ({ tex }) => (
  <>
{/* ========== チェスト（東壁）＋観葉植物＋ティッシュ ========== */}
      <Box pos={[1.52, 0.45, -0.72]} size={[0.45, 0.9, 1.1]} tex={tex.wood} normalTex={tex.woodN} roughness={0.6} radius={0.015} />
      {[0.22, 0.45, 0.68].map((dy, i) => (
        <Box key={`seam-${i}`} pos={[1.293, dy, -0.72]} size={[0.005, 0.235, 1.07]} color="#241a12" collider={false} />
      ))}
      {[0.22, 0.45, 0.68].map((dy, i) => (
        <Box
          key={`front-${i}`}
          pos={[1.287, dy, -0.72]}
          size={[0.014, 0.222, 1.065]}
          tex={tex.wood}
          normalTex={tex.woodN}
          collider={false}
          radius={0.008}
        />
      ))}
      {[0.22, 0.45, 0.68].map((dy, i) => (
        <group key={`drawer-${i}`}>
          <Box pos={[1.268, dy, -0.815]} size={[0.024, 0.022, 0.022]} color={C.darkMetal} collider={false} roughness={0.45} />
          <Box pos={[1.268, dy, -0.625]} size={[0.024, 0.022, 0.022]} color={C.darkMetal} collider={false} roughness={0.45} />
          <mesh position={[1.256, dy, -0.72]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.008, 0.21, 12]} />
            <meshStandardMaterial color={C.darkMetal} roughness={0.4} />
          </mesh>
        </group>
      ))}
      {/* 観葉植物（なめらかな球の葉） */}
      <mesh position={[1.52, 0.9, -1.02]} castShadow>
        <latheGeometry
          args={[
            [
              [0.001, 0.0],
              [0.042, 0.0],
              [0.05, 0.06],
              [0.061, 0.085],
              [0.058, 0.1],
            ].map(([px, py]) => new THREE.Vector2(px, py)),
            24,
          ]}
        />
        <meshStandardMaterial color="#a9603f" roughness={0.8} />
      </mesh>
      {[
        [1.52, 1.1, -1.02, 0.06, '#4a7c43'],
        [1.465, 1.05, -0.975, 0.044, '#5c9153'],
        [1.575, 1.06, -1.065, 0.047, '#3e6b38'],
      ].map(([px, py, pz, r, col], i) => (
        <mesh
          key={`leaf-${i}`}
          position={[px as number, py as number, pz as number]}
          scale={[1, 0.85, 1]}
          castShadow
        >
          <sphereGeometry args={[r as number, 20, 16]} />
          <meshStandardMaterial color={col as string} roughness={0.9} />
        </mesh>
      ))}
      {/* ティッシュ箱 */}
      <Box pos={[1.52, 0.937, -0.45]} size={[0.23, 0.075, 0.115]} color="#eef0f2" collider={false} roughness={0.7} radius={0.012} />
      <TissueSheet pos={[1.52, 0.985, -0.45]} />

        </>
)

/** 本棚（西壁） */
