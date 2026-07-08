---
name: Reliant Commerce
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  price-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1440px
---

## Brand & Style
The design system focuses on high-trust, high-utility e-commerce. It balances the information density required for complex retail with a contemporary, airy aesthetic. The brand personality is authoritative yet accessible, prioritizing clarity and speed above decorative elements.

The style is **Corporate Modern** with a focus on functional hierarchy. It utilizes a structured grid, subtle elevation to denote interactive layers, and a high-contrast color strategy to drive conversion. The goal is to evoke a sense of reliability and institutional scale, ensuring users feel secure during high-value transactions.

## Colors
The palette is engineered for high contrast and clear action signaling. 

- **Primary (Deep Navy/Slate):** Used for global navigation, headers, and primary text to establish authority and trust.
- **Action (Amber):** Reserved strictly for primary calls-to-action (CTAs) like "Add to Cart" and "Proceed to Checkout." This ensures high visibility and psychological urgency.
- **Surface & Backgrounds:** A range of ultra-light grays (#F1F5F9 to #F8FAFC) creates subtle containment for product grids without the harshness of pure white.
- **Status Colors:** Standardized Red (Error), Green (In Stock/Success), and Blue (Info) are used for product availability and validation feedback.

## Typography
This design system utilizes **Inter** across all levels to maintain a systematic and utilitarian feel. 

- **Product Titles:** Use `headline-md` for grid views and `headline-lg` for product detail pages.
- **Pricing:** Prices are emphasized with a heavier weight. Use `price-lg` for visibility.
- **Hierarchy:** Distinct contrast between `label-md` (uppercase for categories/badges) and `body-sm` (metadata and descriptions) ensures information density remains readable.
- **Scaling:** On mobile, reduce display sizes by one tier to maximize vertical space.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for high-density information. 

- **Desktop:** 12-column grid with a 1440px max-width. Use 20px gutters to allow for compact product cards.
- **Mobile:** Single or double-column product feed with 16px side margins.
- **Density:** Vertical spacing should be tight (8px-16px) between related elements (e.g., price and title) and larger (24px-40px) between distinct sections (e.g., product description and reviews).
- **Search-First Navigation:** The header must prioritize a persistent, wide search bar that spans at least 6 columns on desktop.

## Elevation & Depth
The design system uses **Tonal Layers** combined with **Ambient Shadows** to create a structured hierarchy.

- **Level 0 (Background):** #F8FAFC.
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a thin 1px border (#E2E8F0) and no shadow for resting state.
- **Level 2 (Hover/Active):** A soft, diffused shadow (0px 4px 12px rgba(15, 23, 42, 0.08)) is applied to product cards on hover to indicate interactivity.
- **Level 3 (Modals/Popovers):** Deeply diffused shadows (0px 12px 24px rgba(15, 23, 42, 0.12)) to separate checkout drawers or search suggestions from the main content.

## Shapes
A consistent **Rounded (8px)** aesthetic is applied to all primary UI elements.

- **Buttons & Inputs:** Use the standard 8px radius (rounded-md) to balance approachability with professional structure.
- **Product Images:** Should always feature the same 8px radius to avoid a "raw" or unrefined appearance.
- **Badges:** Use "Pill-shaped" (rounded-full) for status tags like "Best Seller" or "Discount" to distinguish them from functional buttons.

## Components
- **Buttons:** 
  - *Primary:* Amber background with Navy text. Heavy 600 weight.
  - *Secondary:* Navy background with White text for high-level navigation.
  - *Ghost:* No background, Navy border for low-priority actions.
- **Product Cards:** Must contain an image, title (max 2 lines), rating stars, price, and a quick "Add" button. Use a 1px border to define card boundaries clearly in dense grids.
- **Search Bar:** High-contrast border in Primary Navy when focused. Integrated category dropdown on the left to facilitate narrowing of results.
- **Filter Chips:** Used for rapid attribute selection (Size, Color, Brand). Rounded (8px), using Primary Navy for the selected state.
- **Structured Checkout Forms:** Labels are always top-aligned. Use `body-sm` for helper text. Inputs have an 8px radius and a 1px border that thickens on focus.
- **Navigation:** Multi-level "Mega Menu" for desktop, utilizing a left-aligned sidebar for "All Departments" functionality, mirroring high-utility retail patterns.