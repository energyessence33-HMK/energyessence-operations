# Kingdom Executor Studio Mobile App - Design Plan

## Overview
A mobile-first interface for managing multi-ecosystem content creation, workflows, and scheduling. Designed for one-handed use with portrait orientation (9:16).

## Screen List

1. **Dashboard** - Overview of active ecosystem, recent workflows, and quick stats
2. **Ecosystems** - Browse and manage multiple ecosystems (EnergyEssence, HitmaKING, THOUGHT2PONDER)
3. **Blueprint Vault** - Upload PDFs, view extracted guardrails, manage versions
4. **Workflow** - View active tasks, manage dependencies, enforce active-limit governor
5. **Ad Generator** - Create ads with templates, manage assets, preview mockups
6. **Scheduler** - Queue posts, set publish times, enforce hard-law blocks
7. **Integrations** - Configure webhooks and external connections

## Primary Content and Functionality

### Dashboard Screen
- **Active Ecosystem Indicator**: Large pill showing current ecosystem name
- **Quick Stats**: Cards showing active workflows, scheduled posts, blueprint versions
- **Recent Activity**: List of recent actions (last 5 items)
- **Action Buttons**: Quick access to "New Workflow", "New Post", "View Scheduler"

### Ecosystems Screen
- **Ecosystem List**: Cards for each ecosystem with name, description, status
- **Add Ecosystem**: Button to create new ecosystem
- **Ecosystem Details**: Tap to view/edit ecosystem settings
- **Active Indicator**: Visual indicator showing which ecosystem is active

### Blueprint Vault Screen
- **Upload Section**: Tap to upload PDF files
- **Blueprint List**: Cards showing uploaded PDFs with extraction status
- **Guardrails View**: Expandable section showing extracted rules per blueprint
- **Conflict Detection**: Alert badge if conflicts detected
- **Version History**: Timeline of blueprint versions

### Workflow Screen
- **Active Tasks List**: Cards showing active workflows (max 3 enforced)
- **Task Details**: Task name, dependencies, status, assigned ecosystem
- **Add Task**: Button to create new workflow task
- **Task Actions**: Edit, delete, complete, view dependencies
- **Governor Status**: Visual indicator of active task count vs. limit

### Ad Generator Screen
- **Template Selection**: Grid of available ad templates
- **Asset Library**: Carousel of available assets
- **Editor View**: Template with editable text fields
- **Safe Crop Tool**: Image cropping interface
- **Background Neutralization**: Toggle to neutralize background
- **Preview**: Mockup of final ad
- **Save/Export**: Save to library or export

### Scheduler Screen
- **Scheduled Posts List**: Cards showing queued posts with publish time
- **Add Post**: Button to create new scheduled post
- **Hard-Law Blocks**: Visual indicators of blocked publish times
- **Post Details**: Edit scheduled post, change time, view content
- **Export**: Button to export schedule as CSV

### Integrations Screen
- **Connected Services**: List of configured integrations
- **Webhook Configuration**: Input fields for webhook URLs
- **Service Selection**: Buttons for Zapier, Make, Buffer, Hootsuite, Notion, Sheets
- **Connection Status**: Visual indicator of connection health

## Key User Flows

### Create and Schedule a Post
1. User taps "New Post" on Dashboard
2. Selects ecosystem from Ecosystems screen
3. Chooses template from Ad Generator
4. Edits content and assets
5. Previews mockup
6. Saves to library
7. Navigates to Scheduler
8. Selects saved post
9. Sets publish time (checks hard-law blocks)
10. Confirms and queues

### Manage Workflows
1. User navigates to Workflow screen
2. Views active tasks (max 3)
3. Taps to view task details
4. Can edit dependencies or mark complete
5. New tasks queue if limit reached
6. Governor prevents exceeding 3 active tasks

### Upload and Extract Guardrails
1. User navigates to Blueprint Vault
2. Taps "Upload PDF"
3. Selects PDF from device
4. System extracts guardrails automatically
5. User reviews extracted rules
6. Conflict detection highlights issues
7. User can approve or edit guardrails
8. Version is saved

## Color Choices

**Brand Palette:**
- **Primary**: #0a7ea4 (Teal - action buttons, highlights)
- **Background**: #ffffff (Light) / #151718 (Dark)
- **Surface**: #f5f5f5 (Light) / #1e2022 (Dark)
- **Foreground**: #11181C (Light) / #ECEDEE (Dark)
- **Muted**: #687076 (Light) / #9BA1A6 (Dark)
- **Border**: #E5E7EB (Light) / #334155 (Dark)
- **Success**: #22C55E (Green - task completion)
- **Warning**: #F59E0B (Orange - conflicts, blocks)
- **Error**: #EF4444 (Red - failures)

## Navigation Structure

**Tab Bar** (Bottom Navigation):
1. Dashboard (home icon)
2. Ecosystems (grid icon)
3. Workflow (tasks icon)
4. Generator (sparkle icon)
5. Scheduler (calendar icon)
6. Integrations (link icon)

**Blueprint Vault**: Accessible via Dashboard card or separate tab if needed

## Mobile-Specific Considerations

- **One-handed usage**: All interactive elements within thumb reach
- **Touch targets**: Minimum 44pt (11mm) for all buttons
- **Scrollable lists**: Use FlatList for performance
- **Safe area**: Proper handling of notch and home indicator
- **Haptic feedback**: Light haptics on button taps, medium on successful actions
- **Loading states**: Spinner or skeleton screens during async operations
- **Empty states**: Helpful messages when no data available
