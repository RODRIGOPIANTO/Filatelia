'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './CatalogGrid.module.css'

export default function CatalogGrid() {
  const [catalogs, setCatalogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/catalogs')
      .then(res => res.json())
      .then(data => {
        setCatalogs(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando catálogos...</p>
  if (catalogs.length === 0) return <p>No se encontraron catálogos activos.</p>

  return (
    <div className={styles.grid}>
      {catalogs.map((cat: any) => (
        <Link key={cat.id} href={`/catalogos/${cat.id}`} className={styles.card}>
          <div className={styles.cardContent}>
            <h3>{cat.title_es}</h3>
            <span className="badge badge--active">{cat.catalog_type}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
