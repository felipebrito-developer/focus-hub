# Component Registry

> **Status:** Final (living document — update when components added/changed)
> **Scope:** Cross-cutting UI spec — inventory of existing frontend components

> Before creating any new UI component, SEARCH this registry. Prefer compound components and existing atoms/molecules.

## Atoms (fundamental building blocks)

| Component | Tags | Description |
| :--- | :--- | :--- |
| `Button.tsx` | action, interaction, compound-ready | Standard clickable element |
| `FAB.tsx` | floating, action, primary | Floating action button for main screen actions |
| `Input.tsx` | form, text, text-input | Standard text input field |
| `Select.tsx` | form, dropdown, choice | Dropdown selection component |
| `Typography.tsx` | text, heading, paragraph | All text rendering. Strict neuro-inclusive font scaling |

## Molecules (compound building blocks)

| Component | Tags | Description |
| :--- | :--- | :--- |
| `Accordion.tsx` | layout, expandable, compound | Expandable list section |
| `Card.tsx` | container, surface, compound-ready | Base surface for grouping related information |
| `EmptyState.tsx` | feedback, placeholder, neuro-ui | Visual feedback when lists/data are empty |
| `FormField.tsx` | form, compound | Composes Input or Select with labels and error messages |
| `ProgressPizza.tsx` | visualization, chart, adhd-friendly | Visual representation of task/goal completion |
| `ScreenHeader.tsx` | navigation, layout | Standardized top header for screens |
| `UserIdentityCard.tsx` | profile, user | Displays user avatar and high-level info |

## Organisms (complex feature components)

| Component | Tags | Description |
| :--- | :--- | :--- |
| `GlobalDrawerContent.tsx` | navigation, global | Side drawer navigation menu |
| `GoalCreationModal.tsx` | modal, form, meaning | Modal flow for creating a new goal |
| `LogisticalGateOverlay.tsx` | overlay, adhd, preflight | Preflight checklist/barrier before starting a focus block |
| `MeaningCreationModal.tsx` | modal, form, meaning | Modal flow for creating new meaning pillars |
| `TaskCreationModal.tsx` | modal, form, action | Modal flow for creating a new task |
| `WIPScreen.tsx` | placeholder, dev | Work in progress screen placeholder |

## Feature-Specific Components

| Feature Folder | Components | Status |
| :--- | :--- | :--- |
| `features/auth/` | LoginScreen, RegisterScreen, WelcomeScreen | Exists (mocked local auth) |

> **Note:** Feature-specific components not yet inventoried for other features. Update this table as features are implemented.
