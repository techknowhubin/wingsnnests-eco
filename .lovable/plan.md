## Current Icon Settings for "Stays" Category

From `src/pages/Index.tsx`, the Stays category card has the following icon configuration:

```
{
  image: homestaysIcon,          // src/assets/categories/homestays-icon.png
  title: "Stays",
  subtitle: "Unique homestays",
  link: "/stays",
  bgColor: "bg-pink-100 dark:bg-pink-950/40",
  iconOffsetX: 15,               // 20px to the left (reduces the -22px right offset)
  iconOffsetY: 5,                // 5px down from center
  iconScale: undefined (default 1) // 120px × 120px
}
```

**Resolved positioning** (from `CategoryCard.tsx`):

- **Size**: 120 × 120px (scale = 1)
- **Right**: `-22 + 15 = -7px` (7px outside the card's right edge)
- **Top**: `calc(50% + 5px)` with `translateY(calc(-50% - 10px))` — net effect is 5px below the default raised-center position