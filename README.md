# AI Tutor - Agentic AI Learning Assistant

A modern AI-powered tutoring system with a beautiful React frontend and FastAPI backend. The AI tutor adapts to your learning style, level, subject preference, and language to provide personalized educational assistance.

## Features

- 🎯 **Subject Selection**: Mathematics, Science, Computer Science, History, and more
- 📊 **Learning Levels**: From Beginner to Expert
- 🧠 **Learning Styles**: Visual, Auditory, Kinesthetic, Logical, and more
- 🌍 **Multi-Language Support**: Learn in your preferred language
- 🤖 **AI-Powered Responses**: Powered by OpenAI GPT models
- 💻 **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- ⚡ **Fast API**: High-performance FastAPI backend

## Project Structure

```
AI_Tutor/
├── backend/
│   └── main.py           # FastAPI backend application
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Tailwind CSS styles
│   ├── package.json      # Frontend dependencies
│   ├── tailwind.config.js
│   └── postcss.config.js
├── requirements.txt      # Backend dependencies
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- OpenAI API key

### Backend Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create a `.env` file in the root directory:**
   ```bash
   touch .env
   ```
   
   Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the FastAPI backend:**
   ```bash
   cd backend
   python main.py
   ```
   
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## Usage

1. **Access the Application**: Open your browser and go to `http://localhost:3000`

2. **Fill in the Form**:
   - **Subject**: Choose your subject area (Mathematics, Science, etc.)
   - **Level**: Select your skill level (Beginner to Expert)
   - **Learning Style**: Pick your preferred learning approach
   - **Language**: Choose your preferred language for responses
   - **Question**: Type your specific question

3. **Get AI Response**: Click "Get Answer" to receive a personalized, AI-generated response tailored to your specifications

4. **Ask More Questions**: Use "Ask Another Question" to reset the form and ask additional questions

## API Endpoints

### Backend API (http://localhost:5000)

- `GET /` - Health check
- `GET /health` - Service health status
- `POST /generate-answer` - Generate AI tutor response
- `GET /subjects` - Get available subjects
- `GET /levels` - Get learning levels
- `GET /learning-styles` - Get learning styles
- `GET /languages` - Get supported languages

### Example API Usage

```bash
curl -X POST "http://localhost:5000/generate-answer" \
     -H "Content-Type: application/json" \
     -d '{
       "subject": "Mathematics",
       "level": "Intermediate",
       "learning_style": "Visual",
       "language": "English",
       "question": "Explain quadratic equations"
     }'
```

## Environment Variables

Create a `.env` file in the root directory with:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API calls

### Backend
- **FastAPI**: Modern, fast web framework for APIs
- **OpenAI**: GPT models for AI responses
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server

## Development

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend Development
```bash
cd backend
python main.py     # Run with auto-reload
```

### Adding New Features

1. **Backend**: Add new endpoints in `backend/main.py`
2. **Frontend**: Update components in `frontend/src/App.js`
3. **Styling**: Modify Tailwind classes or add custom CSS in `frontend/src/index.css`

## Troubleshooting

1. **CORS Issues**: Make sure the frontend is running on port 3000 and backend on port 5000
2. **OpenAI API Issues**: Verify your API key is correct and has sufficient credits
3. **Dependencies**: Run `npm install` in frontend and `pip install -r requirements.txt` for backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Happy Learning! 🎓** 