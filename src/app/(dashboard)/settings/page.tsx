"use client";

import { TopBar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Building2,
  Users,
  Bell,
  Plug,
  Shield,
  Database,
  Save,
  Check,
  X,
  Key,
  Download,
} from "lucide-react";

const settingsNav = [
  { label: "Profile", value: "profile", icon: User },
  { label: "Organization", value: "organization", icon: Building2 },
  { label: "Users & Roles", value: "users", icon: Users },
  { label: "Notifications", value: "notifications", icon: Bell },
  { label: "Integrations", value: "integrations", icon: Plug },
  { label: "Security", value: "security", icon: Shield },
  { label: "Data & Privacy", value: "data", icon: Database },
];

const mockUsers = [
  { name: "Dr. Sanjay Mishra", email: "sanjay@upicon.in", role: "Consultant", division: "Consultancy", lastActive: "2 hrs ago", active: true },
  { name: "Anjali Trivedi", email: "anjali@upicon.in", role: "Consultant", division: "Consultancy", lastActive: "5 hrs ago", active: true },
  { name: "Anil Sharma", email: "anil@upicon.in", role: "Field Executive", division: "Banking", lastActive: "1 hr ago", active: true },
  { name: "Priya Yadav", email: "priya@upicon.in", role: "Field Executive", division: "Banking", lastActive: "3 hrs ago", active: true },
  { name: "Sunita Yadav", email: "sunita.y@upicon.in", role: "Trainer", division: "Training", lastActive: "Yesterday", active: false },
];

const roleColors: Record<string, string> = {
  Consultant: "bg-purple-100 text-purple-700",
  "Field Executive": "bg-blue-100 text-blue-700",
  Trainer: "bg-green-100 text-green-700",
  "Division Head": "bg-indigo-100 text-indigo-700",
  Finance: "bg-amber-100 text-amber-700",
  Admin: "bg-slate-100 text-slate-700",
};

interface ToggleProps {
  defaultChecked?: boolean;
  label: string;
  description?: string;
}

function Toggle({ defaultChecked = false, label, description }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className={`w-10 h-6 rounded-full flex items-center cursor-pointer transition-colors ${defaultChecked ? "bg-upicon-600" : "bg-slate-200"} shrink-0`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${defaultChecked ? "translate-x-5" : "translate-x-1"}`} />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Settings"
        subtitle="Manage profile, users, notifications, integrations, and security"
      />

      <div className="flex flex-1 overflow-hidden">
        <Tabs defaultValue="profile" orientation="vertical" className="flex flex-1 overflow-hidden">
          {/* Left nav */}
          <TabsList className="flex flex-col h-full w-52 bg-white border-r border-slate-200 rounded-none p-2 gap-1 shrink-0 items-stretch justify-start overflow-y-auto">
            {settingsNav.map((nav) => {
              const IconComp = nav.icon;
              return (
                <TabsTrigger
                  key={nav.value}
                  value={nav.value}
                  className="justify-start gap-2.5 text-sm font-medium h-9 px-3 text-slate-600 data-[state=active]:bg-upicon-50 data-[state=active]:text-upicon-700 rounded-lg"
                >
                  <IconComp className="h-4 w-4 shrink-0" />
                  {nav.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile */}
            <TabsContent value="profile" className="mt-0 max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Profile Settings</h2>
                <p className="text-sm text-slate-500">Manage your personal information and account details</p>
              </div>
              <Card>
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="w-16 h-16 bg-upicon-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      MD
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">MD Office</p>
                      <p className="text-xs text-slate-500">Managing Director, UPICON</p>
                      <Button variant="outline" size="sm" className="h-7 text-xs mt-2">
                        Change Photo
                      </Button>
                    </div>
                  </div>
                  {[
                    { label: "Full Name", value: "MD — UPICON", type: "text" },
                    { label: "Email", value: "md@upicon.in", type: "email" },
                    { label: "Phone", value: "+91 9999999999", type: "tel" },
                    { label: "District", value: "Lucknow", type: "text" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-xs font-medium text-slate-700 block mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500"
                        defaultValue={field.value}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1.5">Role</label>
                    <input
                      className="w-full h-9 px-3 text-sm bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed text-slate-500"
                      value="Managing Director (read-only)"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1.5">Division</label>
                    <select className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500">
                      <option>MD Office</option>
                      <option>Banking</option>
                      <option>Consultancy</option>
                      <option>Training</option>
                    </select>
                  </div>
                  <Button className="gap-1.5">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organization */}
            <TabsContent value="organization" className="mt-0 max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Organization Settings</h2>
                <p className="text-sm text-slate-500">Manage organization-wide configuration</p>
              </div>
              <Card>
                <CardContent className="p-6 space-y-5">
                  {[
                    { label: "Organization Name", value: "UPICON" },
                    { label: "Full Name", value: "Uttar Pradesh Institute of Consulting" },
                    { label: "Headquarters", value: "Lucknow, Uttar Pradesh" },
                    { label: "Primary Domain", value: "upicon.in" },
                    { label: "Support Email", value: "support@upicon.in" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-xs font-medium text-slate-700 block mb-1.5">{field.label}</label>
                      <input
                        className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500"
                        defaultValue={field.value}
                      />
                    </div>
                  ))}
                  <Button className="gap-1.5">
                    <Save className="h-4 w-4" />
                    Save Organization
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users & Roles */}
            <TabsContent value="users" className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Users & Roles</h2>
                  <p className="text-sm text-slate-500">Manage team members and their permissions</p>
                </div>
                <Button size="sm" className="h-8 gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Invite User
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">User</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Role</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Division</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Last Active</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Status</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockUsers.map((user) => (
                        <tr key={user.email} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-upicon-100 rounded-full flex items-center justify-center text-upicon-700 text-xs font-bold shrink-0">
                                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                                <p className="text-[10px] text-slate-400">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleColors[user.role] ?? "bg-slate-100 text-slate-600"}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs text-slate-600">{user.division}</span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs text-slate-500">{user.lastActive}</span>
                          </td>
                          <td className="px-5 py-3">
                            <Badge variant={user.active ? "success" : "secondary"} className="text-[10px]">
                              {user.active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-1 justify-end">
                              <Button
                                variant={user.active ? "outline" : "ghost"}
                                size="sm"
                                className={`h-7 text-xs gap-1 ${user.active ? "text-red-600 border-red-200 hover:bg-red-50" : "text-emerald-600 hover:text-emerald-700"}`}
                              >
                                {user.active ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                                {user.active ? "Disable" : "Enable"}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="mt-0 max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Notification Settings</h2>
                <p className="text-sm text-slate-500">Choose which notifications you receive</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "BC Onboarding", items: [
                    { label: "New BC lead assigned", desc: "Notify when a new BC lead is assigned to your district", checked: true },
                    { label: "SLA breach alert", desc: "Alert when onboarding task exceeds SLA threshold", checked: true },
                    { label: "Kiosk activation complete", desc: "Notify when BC kiosk is successfully activated", checked: false },
                  ]},
                  { title: "DPR & TEV", items: [
                    { label: "Review loop assigned", desc: "Notify when a DPR review is assigned to you", checked: true },
                    { label: "Approval status change", desc: "Alert on DPR/TEV approval or rejection", checked: true },
                    { label: "Draft approaching deadline", desc: "Reminder 48 hours before DPR due date", checked: true },
                  ]},
                  { title: "Training", items: [
                    { label: "Batch attendance below 75%", desc: "Alert when batch attendance drops below threshold", checked: true },
                    { label: "Assessment results ready", desc: "Notify when batch assessment scores are published", checked: false },
                    { label: "At-risk beneficiary flagged", desc: "Alert when a beneficiary is marked as at-risk", checked: true },
                  ]},
                  { title: "System", items: [
                    { label: "Weekly digest", desc: "Summary email every Monday at 8 AM", checked: true },
                    { label: "Workflow approvals", desc: "Notify when pending approval requires your action", checked: true },
                  ]},
                ].map((section) => (
                  <Card key={section.title}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-slate-700">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {section.items.map((item) => (
                        <Toggle key={item.label} label={item.label} description={item.desc} defaultChecked={item.checked} />
                      ))}
                    </CardContent>
                  </Card>
                ))}
                <Button className="gap-1.5">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </TabsContent>

            {/* Integrations */}
            <TabsContent value="integrations" className="mt-0 max-w-2xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Integrations</h2>
                <p className="text-sm text-slate-500">Connect UPICON Platform with external services</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: "PFMS (Public Financial Management)", status: "connected", type: "Government" },
                  { name: "GeM Portal", status: "connected", type: "Government" },
                  { name: "SIDBI Loan APIs", status: "pending", type: "Banking" },
                  { name: "WhatsApp Business API", status: "connected", type: "Communication" },
                  { name: "National Career Service Portal", status: "disconnected", type: "Government" },
                  { name: "DigiLocker", status: "connected", type: "Government" },
                ].map((int) => (
                  <div key={int.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Plug className="h-4.5 w-4.5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{int.name}</p>
                        <p className="text-xs text-slate-500">{int.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={int.status === "connected" ? "success" : int.status === "pending" ? "warning" : "secondary"}
                        className="text-[10px] capitalize"
                      >
                        {int.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        {int.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="mt-0 max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
                <p className="text-sm text-slate-500">Manage passwords, 2FA, and session security</p>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="text-xs font-medium text-slate-700 block mb-1">{label}</label>
                        <input
                          type="password"
                          className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500"
                          placeholder="••••••••"
                        />
                      </div>
                    ))}
                    <Button className="gap-1.5">
                      <Key className="h-4 w-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Toggle
                      label="Enable 2FA via OTP"
                      description="Receive OTP on your registered mobile for login verification"
                      defaultChecked={true}
                    />
                    <Toggle
                      label="Session timeout (30 min)"
                      description="Auto-logout after 30 minutes of inactivity"
                      defaultChecked={true}
                    />
                    <Toggle
                      label="Login notifications"
                      description="Email alert on new device login"
                      defaultChecked={false}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data & Privacy */}
            <TabsContent value="data" className="mt-0 max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Data & Privacy</h2>
                <p className="text-sm text-slate-500">Manage data retention, exports, and privacy settings (DPDP Act 2023)</p>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Data Retention</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "BC Transaction Data", value: "7 years" },
                      { label: "Training Records", value: "5 years" },
                      { label: "Audit Logs", value: "3 years" },
                      { label: "Chat History (AI)", value: "1 year" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">{item.label}</span>
                        <Badge variant="secondary" className="text-xs">{item.value}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Privacy Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Toggle label="Share anonymized analytics" description="Help improve UPICON Platform features" defaultChecked={false} />
                    <Toggle label="DPDP consent mode" description="Require explicit consent for data processing" defaultChecked={true} />
                  </CardContent>
                </Card>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-1.5">
                    <Download className="h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50">
                    <X className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
