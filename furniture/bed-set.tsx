/**
 * シングルベッドセット（BedSet）
 * ドレープする掛け布団・4分割クッションパッド・枕・スロー・文庫本・スリッパ
 * 出典: XRiftワールド「六畳の寝室（夜）」v21
 * 依存: ./parts（Box / Puff / DrapeBlanket 等の共通部品）
 */
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { Box, C, DrapeBlanket, Puff, type TexSet } from './parts'

export const BedSet: React.FC<{ tex: TexSet }> = ({ tex }) => (
  <>
{/* ========== ベッド（北西・シングル） ========== */}
      <Box pos={[-0.78, 0.24, -0.83]} size={[1.95, 0.28, 0.99]} tex={tex.wood} normalTex={tex.woodN} color="#9a8474" radius={0.02} />
      <Box pos={[-1.72, 0.6, -0.83]} size={[0.07, 1.2, 0.99]} tex={tex.wood} normalTex={tex.woodN} color="#9a8474" radius={0.025} />
      <Box pos={[-1.68, 0.05, -1.25]} size={[0.07, 0.1, 0.07]} color="#5d4a38" roughness={0.8} />
      <Box pos={[0.12, 0.05, -1.25]} size={[0.07, 0.1, 0.07]} color="#5d4a38" roughness={0.8} />
      <Box pos={[-1.68, 0.05, -0.41]} size={[0.07, 0.1, 0.07]} color="#5d4a38" roughness={0.8} />
      {/* ヘッドボードの柱・笠木・クッションパッド */}
      <Box pos={[-1.72, 0.65, -1.28]} size={[0.09, 1.3, 0.09]} tex={tex.wood} normalTex={tex.woodN} radius={0.02} />
      <Box pos={[-1.72, 0.65, -0.38]} size={[0.09, 1.3, 0.09]} tex={tex.wood} normalTex={tex.woodN} radius={0.02} />
      <Box pos={[-1.72, 1.26, -0.83]} size={[0.1, 0.09, 1.08]} tex={tex.wood} normalTex={tex.woodN} radius={0.02} />
      <Puff pos={[-1.64, 0.7, -1.07]} size={[0.1, 0.22, 0.42]} color="#8798b0" e={3.2} />
      <Puff pos={[-1.64, 0.93, -1.07]} size={[0.1, 0.22, 0.42]} color="#8798b0" e={3.2} />
      <Puff pos={[-1.64, 0.7, -0.59]} size={[0.1, 0.22, 0.42]} color="#8798b0" e={3.2} />
      <Puff pos={[-1.64, 0.93, -0.59]} size={[0.1, 0.22, 0.42]} color="#8798b0" e={3.2} />
      <Box pos={[0.12, 0.05, -0.41]} size={[0.07, 0.1, 0.07]} color="#5d4a38" roughness={0.8} />
      <Box pos={[-0.76, 0.46, -0.83]} size={[1.9, 0.16, 0.94]} color={C.mattress} roughness={1} radius={0.05} />
      <DrapeBlanket tex={tex.blanket} normalTex={tex.blanketN} />
      <RigidBody type="fixed" restitution={0} friction={1}>
        <CuboidCollider args={[0.68, 0.03, 0.46]} position={[-0.46, 0.565, -0.8]} />
      </RigidBody>
      {/* 布団の折り返し */}
      <Puff pos={[-1.1, 0.6, -0.8]} size={[0.17, 0.15, 1.0]} color="#7d9bbd" e={2.8} />
      {/* 足元のスロー */}
      <Puff pos={[0.06, 0.585, -0.8]} size={[0.26, 0.12, 1.0]} color="#d9cfc0" e={2.8} />
      {/* ベッドの上の文庫本 */}
      <Box pos={[0.02, 0.646, -0.62]} size={[0.16, 0.005, 0.23]} color={C.bookColors[0]} collider={false} roughness={0.85} radius={0.002} rotY={0.4} />
      <Box pos={[0.02, 0.656, -0.62]} size={[0.15, 0.02, 0.215]} color="#f3eee1" collider={false} roughness={0.95} radius={0.002} rotY={0.4} />
      <Box pos={[0.02, 0.668, -0.62]} size={[0.16, 0.005, 0.23]} color={C.bookColors[0]} collider={false} roughness={0.85} radius={0.002} rotY={0.4} />
      {/* 枕（ふっくら） */}
      <Puff pos={[-1.42, 0.575, -0.83]} size={[0.52, 0.15, 0.62]} color={C.pillow} e={3} rotY={0.05} />
      {/* 飾りクッション */}
      <Puff pos={[-0.72, 0.63, -0.68]} size={[0.44, 0.1, 0.34]} color="#cbb79e" e={3.2} rotY={0.5} />
      {/* スリッパ */}
      <group position={[-0.44, 0, 0.05]}>
        <Box pos={[0, 0.026, 0]} size={[0.11, 0.024, 0.28]} color="#7f9c8d" collider={false} roughness={1} radius={0.011} />
        <Box pos={[0, 0.05, -0.06]} size={[0.11, 0.03, 0.1]} color="#93b3a1" collider={false} roughness={1} radius={0.013} />
      </group>
      <group position={[-0.27, 0, 0.05]}>
        <Box pos={[0, 0.026, 0]} size={[0.11, 0.024, 0.28]} color="#7f9c8d" collider={false} roughness={1} radius={0.011} />
        <Box pos={[0, 0.05, -0.06]} size={[0.11, 0.03, 0.1]} color="#93b3a1" collider={false} roughness={1} radius={0.013} />
      </group>

        </>
)

/** デスク＋椅子＋ランプ＋PC（南東） */
