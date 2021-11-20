# v0.17.0

- Added 2bit mode (`--bit-color2` and `--bit-color3`)
- Auto mode now sets `display: block` on `label` tags, not `flex`

# v0.16.0

- Added `.bit-fieldset` and `.bit-legend`

# v0.15.0

- Focused links use a double outline instead of outline offset, to give more
  padding around the focused link for better readability

# v0.14.0

- Set `text-decoration-thickness` for anchors to match `--bit-border-width`

# v0.13.0

- Improves `.bit-card` box shadow with additional depth to better mimic retro
  monochrome UIs
- Switches `.bit-link` to use outline instead of box- shadow for crisper
  rendering across browsers

# v0.12.0

- Fixes misaligned label for `.bit-auto` mode radiochecks nested inside a
  `<label>` tag

# v0.11.0

- Improves support for checkboxes and radio buttons that use `.bit-auto` and are
  nested inside a `<label>` tag rather than being side-by-side and using HTML
  IDs to associate with each other

# v0.10.0

- Switches `.bit-auto code` selector to `.bit-auto :not(pre) > code` so we don't
  accidentally style `code` tags nested within `pre` tags, which are very common
  with syntax highlighting libraries
- `.bit-hr` elements now get a dotted line instead of a solid line

# v0.9.0

- Adds `.bit-auto` for class-free styling scoped to that element's children

# v0.0.8

- Use `rem` for most default padding nows for more consistent padding

# v0.0.7

- `.bit-link` isn't bold by default any more

# v0.0.6

- Changes `.bit-card` to use a double border

# v0.0.5

- Changes `.bit-card` to use a drop-shadow facing straight down

# v0.0.4

- Changes `--bit-color-0` to `--bit-color0`
- Changes `--bit-color-1` to `--bit-color1`

# v0.0.3

- Fixes state for `:disabled:focus`

# v0.0.2

- Adds lots of variables for configuration

# v0.0.1

- Initial test release
