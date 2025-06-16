# Healthy Meals Project Context

## 🛠 Tech Stack
- **Frontend**: React 19.1 + TypeScript 5.8.3 + Vite 6.3
- **State Management**: Zustand 5.0.5 (with persistence)
- **API Management**: React Query (TanStack Query) 5.80.6 + Axios
- **Backend**: Laravel with Sanctum (cookie-based auth)
- **UI Framework**: Tailwind CSS 4.1 + Tailwind Merge + clsx
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router 7.6
- **Icons**: Lucide React + React Icons
- **Utils**: Lodash, date-fns, numeral

## 📁 Project Structure
```
---src
    |   App.tsx
    |   main.tsx
    |   
    +---assets
    |   +---images
    |   |           
    |   \---styles
    |           main.css
    |           
    +---components
    |   +---common
    |   |   +---button
    |   |   |       ButtonCustom.tsx
    |   |   |       buttonVariants.ts
    |   |   |       
    |   |   +---footer
    |   |   |       Footer.tsx
    |   |   |       
    |   |   +---header
    |   |   |       Header.tsx
    |   |   |       useHeaderProps.ts
    |   |   |       
    |   |   +---loading
    |   |   |       index.ts
    |   |   |       LoadingSpinner.tsx
    |   |   |       
    |   |   +---navbar
    |   |   |       navItem.tsx
    |   |   |       
    |   |   \---search
    |   |           SearchBar.tsx
    |   |           useDelaySearch.ts
    |   |           useSearchBarProps.ts
    |   |           
    |   +---contact
    |   +---homepage
    |   |   +---carousel
    |   |   |       CarouselHome.tsx
    |   |   |       carouselHomeItems.ts
    |   |   |       
    |   |   +---section-five
    |   |   |       SectionFive.tsx
    |   |   |       sectionFiveItems.ts
    |   |   |       useSectionFiveProps.ts
    |   |   |       
    |   |   +---section-four
    |   |   |       SectionFour.tsx
    |   |   |       
    |   |   +---section-search
    |   |   |       SectionSearch.tsx
    |   |   |       
    |   |   +---section-six
    |   |   |       SectionSix.tsx
    |   |   |       
    |   |   +---section-three
    |   |   |       SectionThree.tsx
    |   |   |       sectionThreeItems.ts
    |   |   |       
    |   |   \---section-two
    |   |           SectionTwo.tsx
    |   |           sectionTwoItems.ts
    |   |           
    |   +---layouts
    |   |       MainLayout.tsx
    |   |       
    |   +---meal-menu
    |   \---meal-planner
    +---data
    |       nutrition.json
    |       
    +---hooks
    |   |   useClickOutSide.ts
    |   |   useFilters.ts            # Global filter logic
    |   |   useMealActions.ts        # Global meal actions
    |   |   
    |   \---react-query
    |           useAuthQuery.ts
    |           useMealQuery.ts
    |           
    +---libs
    |   \---shadcn
    |       \---ui
    |               carousel.tsx
    |               
    +---pages
    |       Homepage.tsx
    |       
    +---providers
    |       AuthInitialize.tsx    # Auth initialization provider
    |       QueryProvider.tsx      # React Query provider
    |       
    +---routes
    |       AppRoute.tsx       # Main app routes
    |       GuestRoute.tsx    # Guest-only routes
    |       ProtectedRoute.tsx    # Protected routes requiring auth
    |       
    +---services
    |   |   nutritionCalc.service.ts              # Nutrition calculator service
    |   |   
    |   \---api
    |           auth.service.ts                   # Auth endpoints & hooks
    |           client.ts                         # Axios client with Sanctum config
    |           protectedMeal.service.ts          # Protected meal endpoints & hooks
    |           publicMeal.service.ts             # Public meal endpoints & hooks
    |           
    +---stores
    |       authStore.ts              # Zustand auth state
    |       mealStore.ts              # Zustand meals state
    |       
    +---types
    |       api.types.ts          # API response types
    |       auth.types.ts         # Auth-related types
    |       meals.types.ts        # Meal-related types
    |       search.type.ts        # Search component prop types
    |       vite-env.d.ts
    |       
    \---utils
        |   cn.ts              # Tailwind merge utility
        |   
        \---helpers
                format.helper.ts  # Images formatting helpers
```

## ✅ Completed Components

### 1. **Header Component**
- Responsive navigation
- Auth state integration

### 2. **SearchBar Component**
- Controlled/Uncontrolled modes
- Debounced search
- Clear button
- Keyboard shortcuts (ESC to clear)
- Fully typed with TypeScript

### 3. **LoadingSpinner Component**
- Multiple sizes (sm, md, lg)
- Fullscreen mode
- Tailwind styling

### API Client Setup
- Axios instance with credentials
- CSRF cookie handling
- Base URL configuration

## 🏗 Code Patterns

### 1. **Component Logic Separation**
```typescript
// Component file (UI only)
components/ComponentName/ComponentName.tsx

// Logic hook (business logic)
components/ComponentName/useComponentNameLogic.ts
```

### 2. **Global vs Component Hooks**
- **Global hooks** (`/hooks`): Shared logic across components
- **Component hooks** (`/components/X/useXLogic`): Component-specific logic

### 3. **API Service Pattern**
```typescript
// Service functions
const mealsService = {
  getAllMeals: async () => {...},
}

// React Query hooks
export function useMeals() {
  return useQuery({...})
}
```

### 4. **Zustand Store Pattern**
- Using `useShallow` for multiple selectors
- Persistence for specific fields only
- Separate stores by domain

## 🗄 Database Schema Notes
- User ID format: `USER-XXXX` (e.g., USER-1234)
- Relationships: User hasOne Profile via `profile_id = user_id`
- Response format: `{ success: boolean, data: T, message?: string }`

## 🐛 Current Issues
1. **npm audit** warnings - ignored as dev dependencies only

## 📝 API Endpoints Structure
- Public: `/meal`, `/recipe`, `/tag`
- Protected (auth required): `/user/*`
- Admin only: `/admin/*`

## 🎯 Next Steps
- [ ] Create MealCard component
- [ ] Implement HomePage with meal grid
- [ ] Add meal filtering UI
- [ ] Create MealDetail page
- [ ] Implement favorites functionality
- [ ] Add nutrition calculator
- [ ] Create feedback form
- [ ] Implement contact page

## 💡 Development Notes
- Using React 19.1 (latest)
- Cookie-based auth with Laravel Sanctum
- All meal-related types match Laravel database schema
- Using Zustand instead of Redux for simplicity
- React Query for server state management

## 🔗 Useful Commands
```bash
# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Fix npm audit (if needed)
npm audit fix

# Clear cache if path issues
rm -rf node_modules package-lock.json && npm install
```

---
*Last updated: [Current date]*
*Chat reference: [Previous chat context]*