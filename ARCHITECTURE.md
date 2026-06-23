# 🏗️ ARCHITECTURE DOCUMENTATION

ProfesorApp - Complete System Architecture & Design

---

## 📊 High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Tailwind)               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │   Lessons    │  │  AI Tutor    │      │
│  │  Progress    │  │  Exercises   │  │  Analytics   │      │
│  │  Gamification│  │  Quizzes     │  │  Leaderboard │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  React Router v6 │ Zustand Store │ Tailwind CSS             │
└─────────────────────────────────────────────────────────────┘
         │                       │                 │
         └───────────────────────┼─────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Firebase Auth   │  │  Firestore DB    │  │  Claude API      │
│  - Email/Pass    │  │  - Users         │  │  - AI Tutor      │
│  - Google OAuth  │  │  - Progress      │  │  - Feedback      │
│  - Sessions      │  │  - Lessons       │  │  - Study Plans   │
└──────────────────┘  │  - Submissions   │  └──────────────────┘
                      │  - Leaderboard   │
                      │  - Chat history  │
                      └──────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  Vercel (Host)  │
                        │  - CDN           │
                        │  - SSL/HTTPS     │
                        │  - Auto deploy   │
                        └─────────────────┘
```

---

## 🧩 Component Architecture

### Layer 1: Pages (Route Components)

Each page handles a specific feature area:

```
pages/
├── Home.js                 # Landing page
├── Auth/
│   ├── Login.js           # Email/Google login
│   ├── Register.js        # New account creation
│   └── ForgotPassword.js  # Password reset
├── Dashboard.js           # Main student hub
├── ClassSelection.js      # Grade (1-8) selector
├── LessonView.js         # Individual lesson
├── ExercisesView.js      # Exercise problems
├── QuizView.js           # Quiz/test mode
├── AITutor.js            # Chat with Claude
├── Progress.js           # Analytics & charts
├── Leaderboard.js        # Rankings
├── ParentPortal.js       # Parent dashboard
├── TeacherPanel.js       # Teacher interface
└── AdminPanel.js         # Admin controls
```

### Layer 2: Components (Reusable)

```
components/
├── common/
│   ├── Navbar.js         # Top navigation
│   ├── Sidebar.js        # Left sidebar
│   ├── Loading.js        # Spinner
│   ├── Modal.js          # Modal dialog
│   └── Toast.js          # Notifications
├── learning/
│   ├── LessonCard.js     # Lesson preview
│   ├── ExerciseCard.js   # Problem display
│   ├── QuizCard.js       # Quiz container
│   └── FlashcardView.js  # Flashcard display
├── gamification/
│   ├── StreakCounter.js  # Study streak
│   ├── PointsDisplay.js  # Points earned
│   ├── BadgesList.js     # Achievement badges
│   └── Leaderboard.js    # Rankings table
└── ai/
    ├── AITutor.js        # Claude chat
    ├── AIFeedback.js     # Feedback display
    └── StudyPlan.js      # Generated plans
```

### Layer 3: Services (Business Logic)

```
services/
├── claudeService.js       # AI operations
│   ├── chatWithTutor()
│   ├── generateFeedback()
│   ├── generateStudyPlan()
│   └── predictExamScore()
├── firestoreService.js    # Database operations
│   ├── CRUD for all collections
│   ├── Real-time listeners
│   └── Batch operations
├── curriculumService.js   # Content management
│   ├── getLessons()
│   ├── getExercises()
│   └── getQuizzes()
└── authService.js         # Authentication
    ├── register()
    ├── login()
    ├── logout()
    └── updateProfile()
```

### Layer 4: State Management (Zustand)

```
store/
└── appStore.js
    ├── User state
    │   ├── currentUser
    │   ├── userRole
    │   └── profile
    ├── Progress state
    │   ├── scores
    │   ├── streak
    │   └── badges
    ├── Learning state
    │   ├── currentLesson
    │   ├── submissions
    │   └── progress
    └── Actions
        ├── setCurrentUser()
        ├── updateProgress()
        ├── addPoints()
        └── …many more
```

---

## 💾 Database Schema

### Firestore Collections

#### users
```javascript
{
  userId: "uid123",
  email: "student@example.com",
  name: "Ion Popescu",
  role: "student", // "student" | "parent" | "teacher" | "admin"
  class: "VI",     // Grade level
  school: "School name",
  profile: {
    avatar: "url",
    bio: "About me"
  },
  createdAt: timestamp,
  lastLogin: timestamp
}
```

#### student_progress
```javascript
{
  userId: "uid123",
  class: "VI",
  currentScore: 84,
  overallScore: 82,
  subjects: {
    romana: 87,
    matematica: 82,
    engleza: 85,
    stiinte: 80
  },
  streakDays: 12,
  points: 2850,
  badges: ["on_fire", "essay_master"],
  lessonsCompleted: ["lesson_001", "lesson_002"],
  exercisesAttempted: 45,
  averageQuizScore: 85,
  updatedAt: timestamp
}
```

#### lessons
```javascript
{
  lessonId: "lesson_001",
  class: "VI",
  subject: "romana",
  chapter: "chapter_002",
  title: "Analiza textului liric",
  description: "...",
  content: {
    theory: "HTML content",
    examples: ["example1", "example2"],
    keywords: ["liric", "vers", "rima"]
  },
  exercises: ["ex_001", "ex_002"],
  quiz: "quiz_001",
  duration: 45, // minutes
  createdAt: timestamp
}
```

#### exercises
```javascript
{
  exerciseId: "ex_001",
  class: "VI",
  subject: "romana",
  lessonId: "lesson_001",
  type: "open_question", // "multiple_choice" | "open_question" | "essay"
  question: "Care este tema operei?",
  difficulty: "medium",
  points: 10,
  hints: ["Hint 1", "Hint 2"],
  solution: "The main theme is...",
  explanation: "Long explanation..."
}
```

#### submissions
```javascript
{
  submissionId: "sub_001",
  userId: "uid123",
  exerciseId: "ex_001",
  lessonId: "lesson_001",
  answer: "Student's answer",
  isCorrect: true,
  score: 10,
  feedback: "Great job!",
  aiGeneratedFeedback: "...",
  submittedAt: timestamp
}
```

#### leaderboard
```javascript
{
  leaderboardId: "leader_VI_2025",
  class: "VI",
  period: "2025-01",
  rankings: [
    {
      rank: 1,
      userId: "uid456",
      name: "Ioana",
      points: 3200,
      score: 90,
      streak: 15
    },
    // ...more rankings
  ],
  updatedAt: timestamp
}
```

#### ai_feedback
```javascript
{
  feedbackId: "fb_001",
  userId: "uid123",
  submissionId: "sub_001",
  type: "essay_feedback", // "math", "grammar", etc.
  userInput: "Student's work",
  aiResponse: "Generated feedback",
  rating: 5, // 1-5 user satisfaction
  model: "claude-opus-4-6",
  tokensUsed: 234,
  createdAt: timestamp
}
```

---

## 🔄 Data Flow

### User Login Flow

```
1. User enters email/password
   └─> Login.js
         └─> authService.login()
             └─> Firebase.auth.signInWithEmailAndPassword()
   
2. Firebase verifies credentials
   └─> Returns user object
   
3. Store updates with user data
   └─> useAppStore.setCurrentUser()
   
4. Fetch user profile & progress
   └─> firestoreService.getUser()
   └─> firestoreService.getProgress()
   
5. Redirect to Dashboard
   └─> Dashboard.js
       └─> Shows personalized content
```

### Learning Flow

```
1. User selects lesson
   └─> LessonView.js
       └─> firestoreService.getLesson()
           └─> Firestore returns lesson content

2. Display lesson content
   └─> Show theory, examples, keywords

3. User does exercises
   └─> ExerciseView.js
       └─> User submits answer
           └─> firestoreService.saveSubmission()
   
4. AI generates feedback
   └─> claudeService.generateFeedback()
       └─> Call Claude API
           └─> Save response to Firestore

5. Update progress
   └─> Update scores, streak, badges
       └─> useAppStore.updateProgress()
```

### AI Tutor Flow

```
1. User opens AI Tutor
   └─> AITutor.js
       └─> Initialize chat interface

2. User sends message
   └─> claudeService.chatWithTutor()
       └─> Call Claude API with context
           - Student's class/grade
           - Subject matter
           - Conversation history
   
3. Claude generates response
   └─> Stream response to user
   
4. Save conversation
   └─> firestoreService.saveChatMessage()
       └─> Store for future reference
```

---

## 🔐 Security Architecture

### Authentication
- Firebase Auth handles credentials
- No passwords stored in app
- Session tokens managed by Firebase
- Multi-provider support (email, Google)

### Authorization
- Firestore Security Rules enforce access control
- Users can only access their own data
- Teachers can access students in their class
- Admins have full access

### Data Encryption
- Firebase provides encryption at rest
- HTTPS/SSL for all data in transit
- Environment variables never exposed to frontend

### API Security
- Claude API key stored securely (backend only)
- Rate limiting on API calls
- Budget alerts on Anthropic

---

## 📈 Scalability Considerations

### Current Architecture (for 1000+ users)
- Firestore can handle massive scale
- Real-time listeners optimized
- Vercel CDN handles traffic
- Claude API billed by usage

### Future Optimizations
- Database indexing for common queries
- Caching with Redis
- Background jobs with Cloud Functions
- Load testing and monitoring

---

## 🚀 Deployment Pipeline

```
Local Development
  ↓ (git push)
GitHub Repository
  ↓ (GitHub hook)
Vercel (Auto-detected)
  ├─ npm install
  ├─ npm run build
  ├─ Test build
  └─ Deploy
     ├─ CDN cache
     ├─ Set environment variables
     └─ HTTPS/SSL
        ↓
   Production URL
   (profesor-app.vercel.app)
```

---

## 🎯 Technology Decisions

### Why React?
- Component-based architecture
- Large ecosystem
- Good performance
- Great developer experience
- Easy to scale

### Why Firebase?
- No backend infrastructure needed
- Real-time database
- Built-in authentication
- Hosting support
- Scalable and reliable
- Free tier generous

### Why Zustand?
- Lightweight (3KB)
- Simple API
- No boilerplate
- Easy to learn
- Fast performance

### Why Claude API?
- Powerful language model
- Easy integration
- Good pricing
- Educational use case fit
- Support for streaming

### Why Vercel?
- Zero-config deployment
- Automatic SSL
- CDN included
- GitHub integration
- Free tier suitable

---

## 📊 Performance Metrics

### Target KPIs
- Page load: < 2 seconds
- AI response: < 5 seconds
- Database query: < 200ms
- 99.9% uptime
- Mobile friendly (Lighthouse 90+)

### Monitoring
- Vercel Analytics
- Firebase Monitoring
- Error tracking (Sentry)
- User analytics (Google Analytics)

---

## 🔄 Continuous Integration/Deployment

### GitHub Actions (Optional)

```yaml
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm test
```

---

## 📚 Design Patterns Used

### Component Patterns
- Container/Presentational (Smart/Dumb)
- Custom Hooks
- Higher-Order Components (optional)
- Render Props

### State Management
- Single source of truth (Zustand)
- Immutable updates
- Actions and effects

### Service Patterns
- Singleton services
- Dependency injection via params
- Error handling with try-catch

---

## 🧪 Testing Strategy

### Unit Tests
- Component tests with React Testing Library
- Service tests with Jest
- Coverage goal: 80%+

### Integration Tests
- API calls with Firebase
- User flows
- Authentication

### E2E Tests
- Cypress for user scenarios
- Lesson completion flow
- Grading flow

---

## 📖 Documentation Standards

- Code comments for complex logic
- README for setup
- SETUP.md for detailed installation
- ARCHITECTURE.md (this file) for system design
- CONTRIBUTING.md for developers

---

## 🔮 Future Architecture Considerations

- Microservices (if scale exceeds 100k users)
- GraphQL (if complex queries needed)
- Caching layer (Redis)
- Message queues (for heavy processing)
- Machine learning for personalization

---

**Last Updated:** January 2025
**Version:** 1.0
