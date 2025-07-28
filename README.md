# Link Hub 6

A modern link management system built with Next.js, TypeScript, and Tailwind CSS. Perfect for organizing and sharing your favorite links with a beautiful, responsive interface.

## ✨ Features

- 🔗 **Link Management**: Add, edit, and organize links by categories
- 📱 **Responsive Design**: Beautiful interface that works on all devices
- 🎨 **Modern UI**: Built with Tailwind CSS and Radix UI components
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🔍 **Search**: Quickly find links with built-in search functionality
- 👨‍💼 **Admin Panel**: Complete admin interface for managing content
- 🗄️ **Database**: Powered by Neon PostgreSQL database
- 🚀 **Fast Deployment**: Ready for Vercel deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- A Neon database account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/linkhub6.git
   cd linkhub6
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit `.env.local` and add your database URL:
   \`\`\`env
   DATABASE_URL="your-neon-database-url"
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Initialize the database**
   - Visit `http://localhost:3000/setup`
   - Follow the setup wizard to initialize your database

6. **Set up admin access**
   - Visit `http://localhost:3000/admin/login`
   - Set your admin password

## 📦 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your `DATABASE_URL` environment variable
   - Deploy!

3. **Initialize production database**
   - Visit your deployed site at `/setup`
   - Complete the database initialization

### Environment Variables

Make sure to set these environment variables in your deployment:

- `DATABASE_URL`: Your Neon PostgreSQL connection string

## 📁 Project Structure

\`\`\`
linkhub6/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # UI components
│   └── ...
├── lib/                  # Utility functions and database
│   ├── db/              # Database configuration and schema
│   └── ...
├── public/              # Static assets
└── scripts/             # Database scripts
\`\`\`

## 🎯 Usage

### Adding Links

1. Go to the admin panel (`/admin`)
2. Navigate to "Links" → "Add New Link"
3. Fill in the link details and assign a category
4. Save and publish

### Managing Categories

1. Go to "Categories" in the admin panel
2. Create new categories or edit existing ones
3. Organize your links by category

### Customizing Settings

1. Visit "Settings" in the admin panel
2. Update site information, welcome messages, and footer content
3. Customize the appearance to match your brand

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Neon](https://neon.tech/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [Your Name]
