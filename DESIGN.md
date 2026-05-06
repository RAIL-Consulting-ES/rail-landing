---
name: RAIL Design Narrative
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#93C572'
  on-tertiary: '#000000'
  tertiary-container: '#092100'
  on-tertiary-container: '#619044'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#bdf199'
  tertiary-fixed-dim: '#a2d580'
  on-tertiary-fixed: '#092100'
  on-tertiary-fixed-variant: '#26500a'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-edge: 64px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style

This design system embodies the intersection of high-end strategy and cutting-edge technology. Drawing heavily from **Minimalism** and **Glassmorphism**, the visual language communicates authority through restraint and innovation through depth. The brand personality is "The Architect of the Future"—precise, sophisticated, and uncompromising.

The aesthetic prioritizes clarity and striking simplicity. Expansive whitespace is used to create a sense of premium breathing room, allowing content to command the user's attention. Transitioning from its dark-mode origins, the system now embraces a high-clarity **Light Mode**. This pristine, gallery-like environment emphasizes precision and professional transparency. High-contrast interactions and fluid, organic motion reinforce a sense of technological mastery and effortless performance.

## Colors

The palette is rooted in a monochromatic foundation to signify professional stability. It has evolved to support a light-mode primary interface, accented by natural, organic tones.

- **Primary Black (#000000):** Used for primary typography, core iconography, and structural lines, providing absolute contrast against the light canvas.
- **Secondary White (#FFFFFF):** The base of the system. Used for the main background layers and clean surfaces to establish an airy, expansive feel.
- **Tertiary Pistachio (#93C572):** A sophisticated, muted green that serves as the new pulse of the system. Replacing high-energy blues, it introduces an organic, sustainable, and calming "Living Tech" feel for primary actions and focus states.
- **Surface Neutrals:** Soft grays and subtle off-whites define the UI structure, replacing the deep "true black" aesthetic with high-key clarity and refined depth.

## Typography

The typography system relies on **Inter** for its systematic, Swiss-inspired clarity and neutral corporate tone. For technical accents, **Space Grotesk** is introduced sparingly, providing a geometric, cutting-edge feel to labels and metadata.

Headlines should be aggressive in scale but minimal in styling. Use tight letter-spacing for large displays to create a "locked-in," professional aesthetic. In the new light mode, body text utilizes a deep black or dark charcoal to ensure maximum legibility and high-contrast readability against light backgrounds.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model for desktop, centered within a 1440px viewport. The layout philosophy is built upon a 12-column structure with expansive margins, evoking a curated, gallery-like experience.

Spacing follows a strict 8px linear scale. Vertical rhythm prioritizes "Stack LG" (80px) between major sections to emphasize the high-quality whitespace characteristic of premium tech brands. Elements should feel uncrowded; the transition to light mode further necessitates this breathing room to prevent visual clutter.

## Elevation & Depth

Hierarchy is established through **Soft Overlays** and **Ambient Shadows** rather than high-opacity glass. 

1.  **Base Layer:** Pure #FFFFFF.
2.  **Mid Layer (Cards/Panels):** Very subtle gray-tinted surfaces or white cards featuring a 1px light gray outline. A slight backdrop-blur can still be applied to overlapping elements to honor the system's glassmorphism heritage.
3.  **Top Layer (Modals/Popovers):** Clean white surfaces enhanced with "Air Shadows"—highly diffused, low-opacity shadows with a 40px–60px blur radius that create a lightweight, floating effect.

Transitions must be seamless: utilize ease-in-out cubic curves with durations between 300ms and 500ms for all elevation changes.

## Shapes

The shape language is **Structured & Precise**, reflecting a shift toward architectural exactness and modern technical hardware design.

- **Standard Elements (Buttons, Inputs):** 0.25rem (4px) corner radius.
- **Container Elements (Cards, Sections):** 0.75rem (12px) corner radius.
- **Interactive Feedback:** Hover states should slightly increase the perceived volume of the shape through subtle scaling (e.g., 1.02x) or a shift toward the Tertiary color to signal engagement.

## Components

### Buttons
- **Primary:** Solid Tertiary Pistachio (#93C572) with black or white text. No border.
- **Secondary:** Transparent background paired with a 1px Primary Black border.
- **Tertiary:** Text-only, featuring an animated underline that expands from the center upon interaction.

### Inputs & Fields
Fields utilize a white background enclosed by a thin 1px gray border. The focus state is highlighted by shifting the border color to Tertiary Pistachio and applying a subtle outer glow. Labels adopt the `label-caps` typography style.

### Cards
Cards act as the primary vehicle for content. They must feature an immaculate white background, defined either by a subtle 1px gray border or an extremely soft ambient shadow to establish their boundaries.

### Interactive Elements
- **Chips:** Pill-shaped, utilizing light gray backgrounds or Tertiary Pistachio outlines.
- **Lists:** Clean separators using low-opacity 1px gray lines.
- **Progress Indicators:** Employ Tertiary Pistachio (#93C572) for active and completed states.

### Custom Component: The "Consultancy Spotlight"
A specialized card variant tailored for high-end case studies. It features a full-bleed background image grounded by a light glass overlay at the bottom for typography. This creates a multi-layered depth effect that perfectly complements the light mode aesthetic.