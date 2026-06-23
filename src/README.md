# src/ Folder Structure

This folder contains your React application source code.

## Folder Organization

```
src/
├── config/
│   ├── firebase.js          # Firebase initialization
│   └── curriculum/          # Official curriculum data (JSON files)
│
├── services/
│   ├── claudeService.js     # Claude AI integration
│   ├── firestoreService.js  # Firebase database operations
│   ├── curriculumService.js # Content management
│   └── authService.js       # Authentication logic
│
├── store/
│   └── appStore.js          # Zustand state management
│
├── hooks/
│   ├── useAuth.js
│   ├── useProgress.js
│   └── useCurriculum.js
│
├── components/
│   ├── common/              # Reusable components
│   ├── learning/            # Learning-related components
│   ├── gamification/        # Gamification components
│   └── ai/                  # AI-related components
│
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── ClassSelection.js
│   ├── Lesson.js
│   ├── Exercises.js
│   ├── AITutor.js
│   ├── Progress.js
│   ├── Leaderboard.js
│   ├── ParentPortal.js
│   ├── TeacherPanel.js
│   └── AdminPanel.js
│
├── styles/
│   └── animations.css       # Additional CSS animations
│
├── App.js                   # Main app component
├── App.css                  # App styles
├── index.js                 # React entry point
└── index.css                # Global styles
```

## Getting Started

1. Read SETUP.md for detailed instructions
2. Install dependencies: `npm install`
3. Start development: `npm start`
4. Follow the component structure above

## Creating New Components

Example component structure:

```javascript
// src/components/MyComponent.js
import React from 'react'

export default function MyComponent({ prop1, prop2 }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">{prop1}</h2>
      <p>{prop2}</p>
    </div>
  )
}
```

## Services

Services handle business logic and API calls:

```javascript
// src/services/myService.js
export async function myFunction(data) {
  // Implementation
  return result
}
```

## State Management (Zustand)

```javascript
// src/store/appStore.js
import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // State
  user: null,
  
  // Actions
  setUser: (user) => set({ user }),
}))
```

## For More Information

See the documentation files:
- README.md - Features overview
- SETUP.md - Setup instructions
- ARCHITECTURE.md - System architecture
