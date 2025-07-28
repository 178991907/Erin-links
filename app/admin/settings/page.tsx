import { db } from "@/lib/db"
import { SettingsForm } from "@/components/admin/settings-form"
import { initializeDatabase } from "@/lib/db/init-db"

export default async function SettingsPage() {
  // Initialize database first
  await initializeDatabase()

  let settings = null

  try {
    settings = await db.query.settings.findFirst()
  } catch (error) {
    console.error("Error loading settings:", error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-green-600">Settings</h1>
        <p className="text-muted-foreground">Manage your site configuration and preferences.</p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  )
}
