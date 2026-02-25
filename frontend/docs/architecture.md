# digital.tissue Frontend Architecture

## Overview
This document describes the architecture of the digital.tissue dashboard frontend, built with Vue 3 and Vite.

## Structure
- **src/components/**: Reusable Vue components
- **src/views/**: Page-level views
- **src/styles/**: Global and utility CSS
- **src/assets/**: Icons and SVGs
- **src/uitext.js**: All UI text and labels

## Design Principles
- Minimal, soft-organic, and alive UI
- Pure CSS (no Tailwind)
- Design tokens for color, spacing, typography, and shadows
- Two-column dashboard layout

## Main Components
- HeaderBar
- TissueCanvas
- OrganSelector
- VitalityCard
- CircularGraph
- GrowthCycles
- IssueFound
- TeamList
- DashboardView

## Routing
Single-page dashboard (can be extended for multi-page in the future).
