# UI Structure — Navigation & Folder Hierarchy

> **Status:** Final
> **Scope:** Cross-cutting UI spec — feature-based folder structure + navigation stack

## Feature-Based Folder Structure

Code folders use short names (not display names):

```
src/features/
├── auth/              # Local auth (mocked login)
├── drawer/            # Drawer & Profile Card
├── focus/             # Focus Timer, Day Progress, Day Tasks, Mental Dump
├── goals/             # Meanings, Goals, Habits, Activities, Tasks, Week Retrospective
├── store/             # Resources, Inventory Log, Financial Overview, Requirements
├── fitness/           # Exercise Plans, Workout Execution
├── life-logs/         # Journaling (deferred)
└── settings/          # User Profile & Theme
```

## Navigation Hierarchy

```
Root: DrawerNavigator
  ├── FocusStack:     BottomTabNavigator (3-4 tabs)
  ├── GoalsStack:     BottomTabNavigator (3-4 tabs)
  ├── StoreStack:     BottomTabNavigator (3-4 tabs)
  ├── FitnessStack:   BottomTabNavigator (3-4 tabs)
  └── SettingsScreen:  Single View (no tabs)
```

## Drawer

- **Header:** User Identity Card (avatar + name + age) — reinforces self-identity, combats time-blindness.
- **Navigation List:** Focus, Goals Management, Store, Fitness, Settings.
- **Footer:** App version + logout (secondary prominence to avoid accidental exits).

## Tab Mapping (per module)

### Focus Module (display: "Now")
| Tab | Feature |
| :--- | :--- |
| Day Progress | Pizza graphs for daily overall progress |
| Day Tasks | Filtered task list (`isForToday=true`) + calendar events |
| Focus Timer | Zero-distraction focus mode (older "Now") |
| Mental Dump | Quick-entry text + daily reflection |

### Goals Module (display: "Mental Backlog")
| Tab | Feature |
| :--- | :--- |
| Goals Dashboard | Pizza graph progress per goal |
| Meanings | Define intrinsic motivations |
| Habits | Recurring habit tracking + streaks |
| Tasks Backlog | Master task list (filterable) |
| Week Retrospective | Weekly review + mood vs activity correlation |

### Store Module (display: "Home Inventory")
| Tab | Feature |
| :--- | :--- |
| Resource Dashboard | Categorized cards, inventory health |
| Management Store | Resource CRUD + FAB |
| Resource Audit | Transaction history |

### Fitness Module (display: "Body Care")
| Tab | Feature |
| :--- | :--- |
| Fitness Dashboard | Weekly progress + today's exercise |
| Execution Screen | Neuro-visual pacer, circular rest timer, tactile controls |
| Planning | Task-tree view for body-part-specific sessions |

> **Code folders vs display names (Q2):** Code uses short names (`focus`, `goals`, `store`, `fitness`). Display names ("Now", "Mental Backlog", "Home Inventory", "Body Care") are UI labels only. See [ui-modules.md](ui-modules.md) for the mapping.
