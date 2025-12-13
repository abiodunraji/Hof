Place the Interiors logo image provided by the designer in this folder with the following filename:

  hof-interiors-logo.png

Usage in the app:
- The Interiors navigation expects the file at `/assets/hof-interiors-logo.png` (placed under `public/assets/`).
- The Navigation component will show the logo on all viewport sizes; the textual site name is hidden on small screens and shown from `sm` upwards.

If you want to use another filename, update `src/components/Navigation.tsx` to point to the correct `src` attribute for the image.

Recommended sizes:
- small/mobile: 44x44 px
- tablet: 56x56 px
- desktop: 72x72 px

Optimise the PNG for web (lossless or small lossy) and keep transparency for best integration with backgrounds.