import { ChangePasswordForm } from "@/components/admin/change-password"

export default function PasswordPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Security Settings</h1>
      <div className="max-w-md">
        <ChangePasswordForm />
      </div>
    </div>
  )
}
