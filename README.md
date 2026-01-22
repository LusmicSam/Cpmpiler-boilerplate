# Online Code Compiler (Frontend)

A powerful, modern, and production-ready online code compiler built with Next.js 14. This application allows users to write, compile, and execute code in various programming languages directly from the browser (or Electron environment).

## 🚀 Features

-   **Multi-Language Support**: Compile and run Python, JavaScript, C, C++, and Java.
-   **Monaco Editor Integration**: Full-featured code editor with syntax highlighting, formatting, and minimap.
-   **File Management**: Create, rename, delete, and switch between multiple files.
-   **Custom Themes**: Toggle between Dark and Light modes for a comfortable coding experience.
-   **Secure Execution**: Code execution is sandboxed via an external API (Judge0-based).
-   **Keyboard Accessibility**: Fully accessible custom dropdowns and keyboard shortcuts.
-   **Responsive Design**: Works seamlessly on desktop and responsive layouts.
-   **Download Support**: Download individual files or the entire project as a ZIP archive.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Languages**: React, JavaScript (ES6+)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Utilities**: `jszip` (compression), `clsx`, `tailwind-merge`

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css        # Global styles and Tailwind directives
│   ├── layout.jsx         # Root layout structure
│   └── page.jsx           # Main application controller (State & Logic)
├── components/
│   ├── Editor.jsx         # Monaco Editor wrapper
│   ├── FileNamePopup.jsx  # Modal for creating new files
│   ├── FileTabs.jsx       # Tab bar for managing open files
│   ├── LanguageSelector.jsx # Custom accessible dropdown for languages
│   ├── Navbar.jsx         # Top navigation bar
│   └── OutputPanel.jsx    # Displays execution output and stdin
├── utils/
│   ├── base64.js          # Helper for encoding/decoding Base64
│   └── templates.js       # Boilerplate code templates for languages
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## ⚡ Getting Started

### Prerequisites

-   Node.js 18.x or higher
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd compiler-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:3000` to see the application.

## 📖 Usage Guide

-   **Select Language**: Use the dropdown in the top bar to choose your programming language.
-   **Run Code**: Press `Ctrl + Enter` or click the "Compile & Run" button.
-   **Format Code**: Press `Ctrl + S` or right-click context menu "Format Document" (auto-formatting enabled).
-   **Manage Files**:
    -   Click **"+ New File"** to add a helper file.
    -   Double-click a tab to **Rename**.
    -   Hover and click 'X' to **Delete**.
-   **Input/Output**: Switch tabs in the bottom/right panel to provide Standard Input (stdin) or view the Output.

## 🤝 Contribution

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
