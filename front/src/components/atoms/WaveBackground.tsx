import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface WaveBackgroundProps {
  cubeSize?: number;
  propagationDuration?: number;
  pauseDuration?: number;
}

export const WaveBackground = ({
  cubeSize = 78,
  propagationDuration = 10000,
  pauseDuration = 30000,
}: WaveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let startTime: number | null = null

    const baseTile = {
      width: 52,
      height: 60,
      lines: [
        { x1: 26, y1: 60, x2: 26, y2: 30 }, { x1: 0, y1: 15, x2: 26, y2: 30 },
        { x1: 26, y1: 30, x2: 52, y2: 15 }, { x1: 26, y1: 0, x2: 26, y2: 30 },
        { x1: 0, y1: 45, x2: 26, y2: 30 }, { x1: 26, y1: 30, x2: 52, y2: 45 },
      ],
    }
    const scale = cubeSize / baseTile.width
    const tileWidth = baseTile.width * scale
    const tileHeight = baseTile.height * scale
    const tileLines = baseTile.lines.map(line => ({
      x1: line.x1 * scale, y1: line.y1 * scale,
      x2: line.x2 * scale, y2: line.y2 * scale,
    }))

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }
      const elapsedTime = timestamp - startTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const baseColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.1)'
      const highlightColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.3)'
      const waveWidth = 30

      const totalCycleDuration = propagationDuration + pauseDuration
      const timeInCycle = elapsedTime % totalCycleDuration
      const waveIsActive = timeInCycle < propagationDuration
      let wavePosition = 0

      if (waveIsActive) {
        const progress = timeInCycle / propagationDuration
        const maxManhattanDistance = canvas.width + canvas.height
        wavePosition = progress * (maxManhattanDistance + 200) - 100
      }

      const rowHeight = tileHeight * 0.75
      let rowIdx = 0
      for (let y = -tileHeight; y < canvas.height; y += rowHeight) {
        for (let x = -tileWidth; x < canvas.width; x += tileWidth) {
          const offsetX = rowIdx % 2 === 0 ? 0 : tileWidth / 2

          tileLines.forEach(line => {
            const startX = x + line.x1 + offsetX
            const startY = y + line.y1
            const endX = x + line.x2 + offsetX
            const endY = y + line.y2

            const manhattanStart = startX + startY
            const manhattanEnd = endX + endY
            const distanceToWaveStart = Math.abs(manhattanStart - wavePosition)
            const distanceToWaveEnd = Math.abs(manhattanEnd - wavePosition)

            if (
              waveIsActive && (
                distanceToWaveStart < waveWidth ||
                distanceToWaveEnd < waveWidth ||
                (manhattanStart < wavePosition && manhattanEnd > wavePosition) ||
                (manhattanStart > wavePosition && manhattanEnd < wavePosition)
              )
            ) {
              ctx.strokeStyle = highlightColor
            } else {
              ctx.strokeStyle = baseColor
            }

            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.stroke()
          })
        }
        rowIdx++
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // 初回実行時にキャンバスサイズを設定
    resizeCanvas()
    requestAnimationFrame(animate)

    // ウィンドウリサイズ時にもキャンバスサイズを更新
    window.addEventListener('resize', resizeCanvas)

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme, cubeSize, propagationDuration, pauseDuration])

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950">
      <canvas ref={canvasRef} />
    </div>
  )
}