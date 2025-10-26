import './globals.css';

export const metadata = {
  title: '待办事项应用',
  description: '使用Next.js创建的待办事项应用',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}