'use client'
import catalogStyles from '@/styles/catalog.module.css'
import styles from './page.module.css'

interface StampImageData {
  url: string
  altEs: string
  isPrimary: boolean
}

interface CatalogNumber {
  system: string
  number: string
}

interface Stamp {
  id: string
  faceValue?: string
  color?: string
  perforation?: string
  catalogNumbers: CatalogNumber[]
  images: StampImageData[]
}

interface ColorMap {
  [key: string]: string
}

const COLOR_CLASS: ColorMap = {
  Azul: catalogStyles.stampCardBlue ?? '',
  Rojo: catalogStyles.stampCardRed ?? '',
  Verde: catalogStyles.stampCardGreen ?? '',
  Marrón: catalogStyles.stampCardBrown ?? '',
  Violeta: catalogStyles.stampCardViolet ?? '',
}

export default function StampCard({ stamp }: { stamp: Stamp }) {
  const colorClass = COLOR_CLASS[stamp.color ?? ''] ?? ''
  const primaryImg = stamp.images.find((i) => i.isPrimary)
  const scottNum = stamp.catalogNumbers.find((n) => n.system === 'SCOTT')
  const michelNum = stamp.catalogNumbers.find((n) => n.system === 'MICHEL')
  const yvertNum = stamp.catalogNumbers.find((n) => n.system === 'YVERT')

  return (
    <div
      className={`${catalogStyles.stampCard} ${colorClass}`}
      id={`stamp-${stamp.id}`}
      role="article"
      aria-label={`Sello ${scottNum?.number ?? stamp.id}`}
    >
      {/* Imagen */}
      <div className={catalogStyles.stampImageWrapper}>
        {primaryImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImg.url}
            alt={primaryImg.altEs}
            className={catalogStyles.stampImage}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                const placeholder = document.createElement('span')
                placeholder.textContent = '✦'
                placeholder.className = styles.stampPlaceholder
                parent.appendChild(placeholder)
              }
            }}
          />
        ) : (
          <span className={styles.stampPlaceholder}>✦</span>
        )}
      </div>

      {/* Info */}
      <div className={catalogStyles.stampInfo}>
        <p className={catalogStyles.stampLabel}>
          {stamp.faceValue}
          {stamp.color && ` · ${stamp.color}`}
        </p>
        <div className={catalogStyles.stampNumbers}>
          {scottNum && (
            <div className={catalogStyles.stampNumberRow}>
              <span className={catalogStyles.stampNumberSystem}>Scott</span>
              <span>{scottNum.number}</span>
            </div>
          )}
          {michelNum && (
            <div className={catalogStyles.stampNumberRow}>
              <span className={catalogStyles.stampNumberSystem}>Michel</span>
              <span>{michelNum.number}</span>
            </div>
          )}
          {yvertNum && (
            <div className={catalogStyles.stampNumberRow}>
              <span className={catalogStyles.stampNumberSystem}>Yvert</span>
              <span>{yvertNum.number}</span>
            </div>
          )}
          {stamp.perforation && (
            <div className={catalogStyles.stampNumberRow}>
              <span className={catalogStyles.stampNumberSystem}>Perf.</span>
              <span>{stamp.perforation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
