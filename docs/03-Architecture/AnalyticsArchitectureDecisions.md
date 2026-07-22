# Analytics Architecture Decisions (AAD)

Project: EPSM Ecosystem

Product: EPSM Manager Analytics

Organization: È Pronto Si Mangia

Version: 1.0

Status: Approved

Last Updated: July 2026

---

# Purpose

This document records the architectural decisions that define the Analytics platform.

Unlike implementation details, these decisions are considered stable and should only change when a significant architectural evolution is approved.

The objective is to guarantee consistency, maintainability and long-term scalability.

---

# Decision Principles

All Architecture Decisions should:

- Preserve Business First principles.
- Keep Business Logic inside PostgreSQL.
- Minimize coupling.
- Maximize component independence.
- Favor long-term maintainability over short-term simplicity.
- Protect published contracts from breaking changes.

---

# AAD-001 — RPC Strategy

## Decision

Analytics exposes its business capabilities through independent PostgreSQL RPC functions.

The Dashboard never queries database tables directly.

Each RPC has a single responsibility and answers one business question.

Approved RPCs:

- rpc_get_dashboard_summary()
- rpc_get_dashboard_insights()
- rpc_get_daily_production()
- rpc_get_operator_performance()
- rpc_get_production_detail()
- rpc_get_dashboard_filters()

## Rationale

Independent RPCs provide:

- Component isolation.
- Easier troubleshooting.
- Better reuse.
- Independent refresh.
- Better scalability.

The Dashboard becomes a consumer of the Analytics API rather than the center of the architecture.

Status

Approved.

---

# AAD-002 — Universal Filter Contract

## Decision

Every Analytics RPC receives exactly the same Filter Contract.

The frontend never builds different parameter lists for different RPCs.

The Analytics Filter Contract defines:

- Date Range
- Comparison Options
- Business Filters
- Search Parameters

Future filters should extend the existing contract without changing RPC signatures.

## Rationale

A universal contract:

- Simplifies frontend implementation.
- Reduces coupling.
- Prevents API redesign.
- Allows future business growth without breaking existing integrations.

Status

Approved.

# AAD-003 — Refresh Strategy

## Decision

Analytics adopts a hybrid refresh strategy.

Dashboard data is refreshed through three mechanisms:

- Initial Load
- Automatic Refresh
- Manual Refresh

Each component controls its own refresh cycle.

The Dashboard itself never performs a full page reload.

### Initial Load

When Analytics starts:

- Configuration is initialized.
- The Universal Filter Contract is created.
- Dashboard components request their data independently.

### Automatic Refresh

Dashboard information is automatically refreshed every five minutes.

Only components that require updated operational information should be refreshed automatically.

Historical or static components remain unchanged until requested by the user.

### Manual Refresh

Users may manually refresh the Dashboard at any time.

Manual refresh uses the current Filter Contract and updates only the affected components.

### Filter Changes

Whenever filters change:

- A new Filter Contract is generated.
- Only the components affected by those filters are refreshed.

The browser page is never reloaded.

## Rationale

This strategy provides:

- Better user experience.
- Lower Supabase usage.
- Faster perceived performance.
- Independent component updates.
- Better scalability.

Status

Approved.

---

# AAD-004 — Dashboard State Management

## Decision

Every Dashboard component follows the same lifecycle.

Five official states are supported:

- Loading
- Success
- Empty
- Error
- Updating

### Loading

Displayed while waiting for the RPC response.

Skeleton placeholders should be preferred over loading spinners.

### Success

Displayed after successful data retrieval.

### Empty

Displayed when the request succeeds but no business data exists for the selected filters.

Empty data is not considered an error.

### Error

Displayed when the component cannot retrieve its information.

Errors affect only the component that failed.

The rest of the Dashboard remains operational.

### Updating

Displayed while refreshing an existing component.

Previously loaded information remains visible until the update completes.

Dashboard components should never disappear from the layout.

The Dashboard structure remains visually stable regardless of the component state.

## Rationale

A unified state model provides:

- Predictable user experience.
- Consistent implementation.
- Simpler troubleshooting.
- Reusable UI components.

Status

Approved.

---

# AAD-005 — Frontend Architecture

## Decision

Analytics follows a layered frontend architecture.

Each layer has a single responsibility.

The architecture is divided into:

- Application Layer
- Service Layer
- UI Layer
- Utility Layer

### Application Layer

Coordinates application startup.

Responsibilities include:

- Initialize Analytics.
- Register events.
- Coordinate component loading.

Application Layer never:

- Queries PostgreSQL.
- Manipulates business data.
- Renders components.

### Service Layer

Responsible for communication with the Analytics API.

Responsibilities include:

- Calling PostgreSQL RPCs.
- Returning JSON contracts.

The Service Layer never:

- Manipulates HTML.
- Performs rendering.
- Calculates business logic.

### UI Layer

Responsible only for presentation.

Responsibilities include:

- Rendering components.
- Managing component states.
- Updating the DOM.

The UI Layer never:

- Calls PostgreSQL directly.
- Calculates business rules.

### Utility Layer

Contains reusable helper functions.

Examples include:

- Date formatting.
- Number formatting.
- DOM utilities.
- Validation helpers.

## Rationale

Layer separation provides:

- Easier maintenance.
- Better testing.
- Simpler troubleshooting.
- Lower coupling.
- Higher reusability.

Status

Approved.

# AAD-006 — Observability & Troubleshooting

## Decision

Analytics is designed to make troubleshooting fast, predictable and isolated.

Every architectural layer is responsible for detecting, reporting and handling its own failures.

Errors must never propagate silently across layers.

The objective is to identify the failing layer within minutes rather than hours.

---

## Layer Responsibilities

### PostgreSQL RPC Layer

Responsible for:

- Business logic.
- Data retrieval.
- Business validation.

The RPC layer never generates HTML or UI responses.

---

### Analytics Service Layer

Responsible for:

- Calling the Analytics API.
- Receiving JSON contracts.
- Detecting communication failures.
- Returning standardized responses to the UI.

The Service Layer never renders HTML.

---

### UI Layer

Responsible for:

- Rendering component states.
- Displaying user-friendly error messages.
- Preserving Dashboard stability.

UI components never communicate directly with PostgreSQL.

---

## Logging Strategy

Development Mode

Development builds should provide informative console messages describing the Dashboard lifecycle.

Examples include:

- Loading Dashboard Summary
- Dashboard Summary Loaded
- Loading Operator Performance
- Operator Performance Failed

Production Mode

Production builds should remain silent unless an unrecoverable error occurs.

---

## Naming Convention

Every architectural layer follows a consistent naming strategy.

RPC Layer

rpc_get_dashboard_summary()

Service Layer

loadDashboardSummary()

UI Layer

renderDashboardSummary()

Event Layer

onDateRangeChanged()

Utility Layer

formatPercentage()

The purpose of this convention is to immediately identify the architectural responsibility of every function.

---

## Single Responsibility

Every function should perform one task only.

Functions should never:

- Retrieve data.
- Calculate business information.
- Manipulate the DOM.
- Display notifications.

within the same implementation.

Responsibilities remain isolated.

---

## Rationale

This strategy provides:

- Faster debugging.
- Better maintainability.
- Lower coupling.
- Easier onboarding.
- Predictable application behavior.

Status

Approved.

---

# AAD-007 — Component Independence

## Decision

Every Dashboard component is an independent architectural unit.

A component owns:

- Its RPC.
- Its Service.
- Its Renderer.
- Its lifecycle.
- Its loading state.
- Its error handling.
- Its refresh strategy.

Components never communicate directly with each other.

---

## Component Responsibilities

Each component is responsible for:

- Requesting its own data.
- Rendering its own UI.
- Managing its own lifecycle.
- Recovering from its own failures.

No component should depend on another component.

---

## Dashboard Responsibility

The Dashboard acts only as a container.

Its responsibilities are limited to:

- Organizing components.
- Registering components.
- Coordinating initialization.

The Dashboard never performs business calculations.

---

## Plug-and-Play Architecture

New Dashboard components should be added without modifying existing ones.

Adding a new component should require only:

1. Creating a PostgreSQL RPC.
2. Creating the Service.
3. Creating the Renderer.
4. Registering the component.
5. Placing the component within the layout.

Existing components should remain unchanged.

---

## Rationale

Independent components provide:

- Lower coupling.
- Easier maintenance.
- Better scalability.
- Safer future development.
- Simpler testing.

Status

Approved.

---

# AAD-008 — Dashboard Lifecycle

## Decision

Dashboard initialization follows a controlled lifecycle.

Components load independently while the Dashboard coordinates the process.

---

## Lifecycle

Analytics Startup

↓

Initialize Configuration

↓

Initialize Supabase

↓

Build Filter Contract

↓

Register Events

↓

Launch Component Requests

↓

Render Components Independently

---

## Component Loading

Dashboard components load in parallel.

Each component renders immediately after receiving its own response.

Components never wait for unrelated components.

---

## Failure Handling

If one component fails:

- The remaining components continue loading.
- The Dashboard remains operational.
- Only the failing component displays an error state.

---

## Filter Changes

When filters change:

- A new Universal Filter Contract is created.
- Only affected components refresh.

The browser page is never reloaded.

---

## Component Registry

Dashboard components are registered rather than hardcoded.

The Dashboard manages a registry of components instead of explicitly controlling individual implementations.

This allows future Dashboard modules to be incorporated without modifying the initialization process.

---

## Rationale

A controlled lifecycle provides:

- Better perceived performance.
- Independent component execution.
- Improved scalability.
- Easier future expansion.
- Consistent application behavior.

Status

Approved.

# AAD-009 — JSON Contract Standard

## Decision

Analytics uses a single JSON naming convention across the entire platform.

The JSON contract published by PostgreSQL becomes the official business contract consumed by every frontend component.

No intermediate mapping or transformation should be performed.

---

## Naming Convention

All JSON properties follow the same standard.

Rules:

- snake_case
- lowercase
- descriptive names
- explicit units where applicable

Examples

Correct

- total_production
- total_dough_kg
- average_deviation_pct
- remaining_dough_g
- operator_id

Incorrect

- totalProduction
- TotalProduction
- avg
- dough
- id

---

## Boolean Values

Boolean properties should begin with:

- is_
- has_
- can_

Examples

- is_bonus_eligible
- has_remaining_dough
- can_compare

---

## Identifier Naming

Every identifier ends with:

_id

Examples

- operator_id
- recipe_id
- product_id
- shift_id
- location_id

---

## Contract Stability

Published property names should never change.

New properties may be added without affecting existing consumers.

Existing properties must never be renamed or removed.

---

## Rationale

A single naming convention:

- eliminates unnecessary mapping;
- improves readability;
- simplifies maintenance;
- preserves contract consistency across the ecosystem.

Status

Approved.

---

# AAD-010 — Error Handling Strategy

## Decision

Analytics does not redefine or replace database errors.

PostgreSQL remains the authoritative source of execution errors.

Frontend components are responsible only for interpreting failures and presenting them consistently to the user.

---

## Error Ownership

Every architectural layer manages only its own responsibility.

PostgreSQL

- Business validation.
- SQL execution.
- RPC execution.

Analytics Service

- Detect communication failures.
- Detect request failures.
- Forward failures to the UI.

UI Components

- Display standardized error states.
- Preserve Dashboard stability.
- Allow retry operations.

---

## Error Presentation

Regardless of the underlying cause, every Dashboard component presents failures using the same visual state.

Examples include:

- Unable to load information.
- Connection error.
- Data unavailable.

Technical implementation details remain available only for development and debugging.

---

## Layer Isolation

Errors never propagate uncontrolled across architectural layers.

Failures are isolated to the component that originated the request.

Other Dashboard components continue operating normally.

---

## Troubleshooting

Application logs should always allow developers to determine:

- which component failed;
- which Service generated the request;
- which RPC was executed.

The failing layer should be identifiable within minutes.

---

## Rationale

Separating business errors from presentation responsibilities provides:

- cleaner architecture;
- easier debugging;
- consistent user experience;
- lower coupling between backend and frontend.

Status

Approved.

---

# AAD-011 — Performance Strategy

## Decision

Analytics prioritizes responsive user experience over large data retrieval.

RPCs return only the information required to answer the corresponding Business Question.

Large datasets should never be transferred unnecessarily.

---

## Dashboard Summary

Returns a single aggregated result.

---

## Dashboard Insights

Returns only the most relevant business insights.

Maximum:

10 insights.

---

## Operator Performance

Returns every operator participating in the selected period.

The current business operates with approximately five to ten operators.

No artificial limitation is required at this stage.

Future scalability may introduce pagination without modifying the public contract.

---

## Production Detail

Production Detail is designed to support calendar-based navigation.

Users may select:

- individual days;
- consecutive date ranges.

Initial implementation limits the selectable period to:

15 days.

Performance will be measured using:

- PostgreSQL execution time;
- data transfer time;
- frontend rendering time;
- Dashboard responsiveness.

If performance remains acceptable, the maximum range may be increased to:

30 days.

No API redesign is required.

---

## Performance Configuration

Operational limits should be configurable rather than hardcoded.

Examples include:

- maximum_detail_days
- automatic_refresh_interval
- maximum_export_period

Configuration changes should not require RPC redesign.

---

## Rationale

Configuration-driven limits provide:

- operational flexibility;
- easier maintenance;
- future scalability.

Status

Approved.

---

# AAD-012 — Contract Compatibility

## Decision

Published Analytics contracts are considered stable.

Implementations may evolve internally without changing the public contract consumed by the frontend.

---

## Allowed Changes

Internal implementations may:

- optimize SQL;
- improve execution plans;
- add indexes;
- improve algorithms;
- add optional properties.

---

## Forbidden Changes

Published contracts must never:

- rename existing properties;
- remove existing properties;
- change property types;
- modify the JSON structure.

---

## Compatibility Principle

Frontend compatibility is preserved through contract stability.

Backend implementations may evolve independently as long as the published contract remains unchanged.

---

## Rationale

Stable contracts:

- minimize regressions;
- simplify maintenance;
- enable independent frontend evolution;
- protect long-term compatibility.

Status

Approved.

---

# Final Statement

Analytics Architecture Decisions define the architectural principles governing the Analytics platform.

These decisions are intentionally stable.

Future implementations should extend the architecture rather than redesign it.

Architectural consistency has priority over implementation convenience.

Every future Analytics feature should comply with these decisions before implementation begins.

