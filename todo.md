# Kingdom Executor Studio Mobile App - TODO

## Core Features

### Dashboard
- [x] Dashboard screen layout with active ecosystem indicator
- [x] Quick stats cards (active workflows, scheduled posts, blueprint versions)
- [x] Recent activity list
- [x] Quick action buttons

### Ecosystems Management
- [x] Ecosystems screen with list of ecosystems
- [ ] Add new ecosystem functionality
- [ ] Edit ecosystem details
- [x] Set active ecosystem
- [ ] Delete ecosystem

### Blueprint Vault
- [ ] Blueprint Vault screen layout
- [ ] PDF upload functionality
- [ ] PDF parsing and guardrails extraction
- [ ] Display extracted guardrails
- [ ] Conflict detection logic
- [ ] Version history tracking
- [ ] Edit and approve guardrails

### Workflow Management
- [x] Workflow screen with active tasks list
- [ ] Create new workflow task
- [ ] Task dependencies management
- [x] Active-limit governor (max 3 tasks)
- [ ] Task completion marking
- [ ] Edit task details
- [ ] Delete task
- [x] Visual indicator of active task count

### Ad Generator
- [x] Ad Generator screen layout
- [x] Template selection interface
- [ ] Asset library carousel
- [x] Text editing in templates
- [ ] Safe-crop tool for images
- [ ] Background neutralization toggle
- [x] Preview mockup generation
- [ ] Save ad to library
- [ ] Export ad functionality

### Scheduler
- [x] Scheduler screen with queued posts list
- [ ] Add new scheduled post
- [ ] Set publish time
- [x] Hard-law blocks enforcement
- [ ] Edit scheduled post
- [ ] Delete scheduled post
- [ ] Export schedule as CSV
- [ ] Visual calendar view (optional)

### Integrations
- [x] Integrations screen layout
- [x] Webhook configuration UI
- [x] Service selection (Zapier, Make, Buffer, Hootsuite, Notion, Sheets)
- [x] Connection status indicators
- [ ] Test webhook functionality

## Data Management

- [ ] Local storage (AsyncStorage) for app state
- [ ] Ecosystem data persistence
- [ ] Workflow state management
- [ ] Scheduler queue persistence
- [ ] Blueprint vault data storage

## UI/UX Polish

- [x] App icon and branding
- [x] Splash screen
- [ ] Loading states and spinners
- [ ] Empty state messages
- [ ] Error handling and alerts
- [ ] Haptic feedback on interactions
- [x] Dark mode support
- [x] Responsive layout for various screen sizes

## Navigation

- [x] Tab bar with 6 main screens
- [ ] Deep linking support
- [ ] Back navigation handling
- [ ] Modal sheets for forms

## Testing & Delivery

- [ ] End-to-end flow testing
- [ ] Cross-platform testing (iOS, Android, Web)
- [ ] Performance optimization
- [ ] Accessibility review
- [ ] Create checkpoint for delivery
