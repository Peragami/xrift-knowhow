/**
 * ドーム型シーリングライト（CeilingLight）
 * Lathe回転体のドーム＋発光面。ceilingOnで点灯/消灯
 * 出典: XRiftワールド「六畳の寝室（夜）」v21
 * 依存: ./parts（Box / Puff / DrapeBlanket 等の共通部品）
 */
import * as THREE from 'three'
import { C } from './parts'

export const CeilingLight: React.FC<{ ceilingOn: boolean }> = ({ ceilingOn }) => (
  <>
{/* ========== シーリングライト ========== */}
      <mesh position={[0, 2.325, 0]}>
        <latheGeometry
          args={[
            [
              [0.001, 0.075],
              [0.12, 0.072],
              [0.24, 0.062],
              [0.34, 0.045],
              [0.41, 0.02],
              [0.44, 0.0],
            ].map(([px, py]) => new THREE.Vector2(px, py)),
            40,
          ]}
        />
        <meshStandardMaterial color={C.white} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.3875, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.025, 20]} />
        <meshStandardMaterial color={C.white} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 40]} />
        <meshStandardMaterial
          color="#fff6e0"
          emissive="#ffc978"
          emissiveIntensity={ceilingOn ? 1.7 : 0.02}
          roughness={0.6}
        />
      </mesh>

        </>
)

/** ベッド一式（北西） */
