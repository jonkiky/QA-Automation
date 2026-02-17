import Link from 'next/link';
import { BarChart3, FileText, TestTube, Code, Play, Settings, LayoutDashboard } from 'lucide-react';

export default function Home() {
  const navigationLinks = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', description: 'View metrics and activity' },
    { href: '/projects', icon: BarChart3, label: 'Test Projects', description: 'Manage test projects' },
    { href: '/requirements', icon: FileText, label: 'Requirements', description: 'Requirements management' },
    { href: '/test-cases', icon: TestTube, label: 'Test Cases', description: 'View and review test cases' },
    { href: '/scripts', icon: Code, label: 'Automation Scripts', description: 'Generated test scripts' },
    { href: '/executions', icon: Play, label: 'Executions', description: 'Test execution monitor' },
    { href: '/settings', icon: Settings, label: 'Settings', description: 'Platform settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            QA Automation Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered test automation with deterministic generation, traceability, and governance controls
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300 group-hover:text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg shadow-md px-6 py-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Tech Stack:</span>{' '}
              Next.js 14 • React 19 • TypeScript • Tailwind CSS • Recharts • React Flow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
