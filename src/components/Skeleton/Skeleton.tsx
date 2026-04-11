import styles from './skeleton.module.css'

export function StampGroupSkeleton() {
  return (
    <div className={styles.group}>
      <div className={`${styles.pulse} ${styles.groupHeader}`} />
      <div className={styles.stampGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.pulse} ${styles.stampCard}`} />
        ))}
      </div>
    </div>
  )
}

export function CatalogHeaderSkeleton() {
  return (
    <div className={styles.catalogHeader}>
      <div className={`${styles.pulse} ${styles.breadcrumb}`} />
      <div className={`${styles.pulse} ${styles.title}`} />
      <div className={`${styles.pulse} ${styles.desc}`} />
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className={`${styles.pulse} ${styles.productCard}`} />
  )
}

export function StatCardSkeleton() {
  return (
    <div className={`${styles.pulse} ${styles.statCard}`} />
  )
}
