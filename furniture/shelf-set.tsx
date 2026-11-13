/**
 * 本棚（ShelfSet）
 * 2段本棚。立てた本・寄りかかる本・平積み・小物箱
 * 出典: XRiftワールド「六畳の寝室（夜）」v21
 * 依存: ./parts（Box / Puff / DrapeBlanket 等の共通部品）
 */
import { Box, C, type TexSet } from './parts'

export const ShelfSet: React.FC<{ tex: TexSet }> = ({ tex }) => (
  <>
{/* ========== 本棚（西壁） ========== */}
      <Box pos={[-1.76, 0.5, 0.75]} size={[0.04, 1.0, 0.8]} tex={tex.wood} color="#8a6f52" />
      <Box pos={[-1.58, 0.5, 0.37]} size={[0.35, 1.0, 0.04]} tex={tex.wood} radius={0.008} />
      <Box pos={[-1.58, 0.5, 1.13]} size={[0.35, 1.0, 0.04]} tex={tex.wood} radius={0.008} />
      <Box pos={[-1.58, 0.04, 0.75]} size={[0.35, 0.08, 0.8]} tex={tex.wood} radius={0.008} />
      <Box pos={[-1.58, 0.54, 0.75]} size={[0.35, 0.04, 0.8]} tex={tex.wood} radius={0.008} />
      <Box pos={[-1.58, 0.98, 0.75]} size={[0.35, 0.04, 0.8]} tex={tex.wood} radius={0.008} />
      {/* 本（中段） */}
      {[
        { z: 0.505, wdt: 0.09, hgt: 0.34, col: 0, lean: 0 },
        { z: 0.6025, wdt: 0.105, hgt: 0.29, col: 1, lean: 0 },
        { z: 0.695, wdt: 0.08, hgt: 0.36, col: 2, lean: 0 },
        { z: 0.79, wdt: 0.095, hgt: 0.27, col: 3, lean: 0.17 },
      ].map((bk, i) => (
        <Box
          key={`book-${i}`}
          pos={[-1.56, 0.56 + bk.hgt / 2 + (bk.lean ? 0.012 : 0), bk.z]}
          size={[0.3, bk.hgt, bk.wdt]}
          color={C.bookColors[bk.col]}
          collider={false}
          rotX={bk.lean}
          roughness={0.85}
          radius={0.01}
        />
      ))}
      {[
        { z: 0.505, wdt: 0.09, hgt: 0.34 },
        { z: 0.6025, wdt: 0.105, hgt: 0.29 },
        { z: 0.695, wdt: 0.08, hgt: 0.36 },
      ].map((bk, i) => (
        <Box
          key={`pages-${i}`}
          pos={[-1.57, 0.56 + bk.hgt + 0.005, bk.z]}
          size={[0.26, 0.01, bk.wdt * 0.8]}
          color="#f3eee1"
          collider={false}
          roughness={0.95}
          radius={0.003}
        />
      ))}
      {/* 本（下段） */}
      {[
        { z: 0.5, wdt: 0.08, hgt: 0.26, col: 4 },
        { z: 0.585, wdt: 0.09, hgt: 0.3, col: 0 },
        { z: 0.68, wdt: 0.1, hgt: 0.24, col: 1 },
      ].map((bk, i) => (
        <Box
          key={`book-low-${i}`}
          pos={[-1.56, 0.08 + bk.hgt / 2, bk.z]}
          size={[0.3, bk.hgt, bk.wdt]}
          color={C.bookColors[bk.col]}
          collider={false}
          roughness={0.85}
          radius={0.01}
        />
      ))}
      <Box pos={[-1.56, 0.098, 0.93]} size={[0.26, 0.035, 0.18]} color={C.bookColors[2]} collider={false} roughness={0.85} radius={0.008} />
      <Box pos={[-1.56, 0.133, 0.93]} size={[0.24, 0.035, 0.16]} color={C.bookColors[3]} collider={false} roughness={0.85} radius={0.008} />
      {/* 本（上段） */}
      {[
        { z: 0.52, wdt: 0.085, hgt: 0.3, col: 3 },
        { z: 0.615, wdt: 0.1, hgt: 0.25, col: 4 },
        { z: 0.715, wdt: 0.09, hgt: 0.32, col: 0 },
      ].map((bk, i) => (
        <Box
          key={`book-top-${i}`}
          pos={[-1.56, 1.0 + bk.hgt / 2, bk.z]}
          size={[0.3, bk.hgt, bk.wdt]}
          color={C.bookColors[bk.col]}
          collider={false}
          roughness={0.85}
          radius={0.01}
        />
      ))}
      <Box pos={[-1.56, 1.09, 0.95]} size={[0.26, 0.18, 0.2]} color="#8a97a5" collider={false} roughness={0.8} radius={0.01} />

        </>
)
