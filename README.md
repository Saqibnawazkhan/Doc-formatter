# Word Document Formatting Web Application

A web-based application that allows users to upload Microsoft Word documents (.docx), select desired formatting options, and automatically reformat the document based on the selected rules.

## Features

### File Upload
- Upload Word (.docx) files
- File type and size validation
- Upload progress and success/error messages

### Formatting Options

#### Text Formatting
- Font family (Arial, Times New Roman, Calibri, etc.)
- Font size
- Font color
- Bold, Italic, Underline
- Line spacing (1.0, 1.15, 1.5, 2.0)
- Text alignment (Left, Center, Right, Justify)

#### Paragraph Formatting
- Paragraph spacing (before/after)
- Indentation (left/right, first-line)
- Bulleted and numbered lists
- Remove extra spaces and blank lines

#### Page Formatting
- Page size (A4, Letter)
- Margins (top, bottom, left, right)
- Header and footer formatting
- Page numbers (position and style)

#### Document Structure Formatting
- Heading styles (H1-H6)
- Automatic table of contents
- Consistent heading hierarchy
- Normalize formatting across the entire document

#### Cleanup & Standardization
- Remove inconsistent fonts
- Remove unnecessary styles
- Convert copied text into clean formatting
- Fix alignment issues

### Preview & Download
- Preview the formatted document
- Download the reformatted Word file
- Option to keep or discard the original formatting

## Technology Stack

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Shadcn/ui components

### Backend
- Python FastAPI
- python-docx for Word document processing
- uvicorn server

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/word-formatter-app.git
cd word-formatter-app
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## API Endpoints

- `POST /api/upload` - Upload a Word document
- `POST /api/format` - Format the uploaded document
- `GET /api/download/{file_id}` - Download the formatted document
- `GET /api/preview/{file_id}` - Get document preview

## Project Structure

```
word-formatter-app/
├── frontend/                 # Next.js frontend
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── lib/                  # Utility functions
│   └── styles/               # CSS styles
├── backend/                  # FastAPI backend
│   ├── main.py               # Main application
│   ├── routers/              # API routes
│   ├── services/             # Business logic
│   ├── models/               # Data models
│   └── uploads/              # Temporary file storage
└── README.md
```

## License

MIT License
