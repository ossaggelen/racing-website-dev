import { Studio } from 'sanity'
import config from '../sanity/sanity.config' // Dosya yolunun doğru olduğundan emin ol

export default function AdminPanel() {
  return (
    // Panelin tüm ekranı kaplaması için height ve width değerleri önemli
    <div style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  )
}