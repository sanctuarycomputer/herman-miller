# Eames Interactive Story

### Setup

To install the Eames Interactive Story onto a HTML Page, the markup should look as follows:

```
<div id="eames-interactive-story" data-asset-path="http://localhost:4200/" data-locale-code="en"></div>
<script>
  window.eamesInteractiveStoryTranslations = {
    en: {
      lineOne:     "Ready to compose and play? Click on any object to introduce something new.",
      lineTwo:     "To play with scale, click and drag the upper left corner of any object.",
      lineThreeA:  "Jazz is delightful, but not all the time. Toggle the",
      lineThreeB:  "to turn it on or off.",
      lineFour:    "Invite your friends to join in on the fun.",
      twitter:     "Compose and play with this %23Eames-inspired interactive toy, created by @LabourNY for @HermanMiller. %23EamesPlay",
      creditLineA: "Inspired by the work of Ray and Charles Eames. Created by",
      creditLineB: "for Herman Miller, Inc."
    }
  };
</script>
<script src="eames-interactive-story.js"></script>
```

**Notes**

- The story viewport is initialized inside the `div#eames-interactive-story` element.
- The `script` tag that declares the `window.eamesInteractiveStoryTranslations` object is mandatory.
- The `<script src="eames-interactive-story.js"></script>` should point to the JS file, and be last of the three lines.

### Hosting Assets

- Assets **must** be hosted on the exact same host domain as the Page initializing the Widget.
- The `data-asset-path` attribute on the `div` must:
    - End in a forward slash
    - Lead to the *containing* folder for the assets.

For Example: If your assets folder is hosted at `https://preview.herman-miller.com/hosting/static/assets`, the corresponding `div` should
look like this:
```
<div id="eames-interactive-story" data-asset-path="https://preview.herman-miller.com/hosting/static/" data-locale-code="en"></div>
```

### Adding Translations

To localize the experience, first add the translations to the HTML page like so:

```
<script>
  window.eamesInteractiveStoryTranslations = {
    en: {
      lineOne:     "Ready to compose and play? Click on any object to introduce something new.",
      lineTwo:     "To play with scale, click and drag the upper left corner of any object.",
      lineThreeA:  "Jazz is delightful, but not all the time. Toggle the",
      lineThreeB:  "to turn it on or off.",
      lineFour:    "Invite your friends to join in on the fun.",
      twitter:     "Compose and play with this %23Eames-inspired interactive toy, created by @LabourNY for @HermanMiller. %23EamesPlay",
      facebook:    "Compose and play with this %23Eames-inspired interactive toy, created by @LabourNY for @HermanMiller. %23EamesPlay",
      creditLineA: "Inspired by the work of Ray and Charles Eames. Created by",
      creditLineB: "for Herman Miller, Inc."
    },
    es: {
      lineOne:     "this",
      lineTwo:     "is where",
      lineThreeA:  "your",
      lineThreeB:  "spanish",
      lineFour:    "version",
      twitter:     "will",
      facebook:    "go",
      creditLineA: "amigo",
      creditLineB: ":)"
    }
  };
</script>
```

Now when the parent page detects that the user should be served the Spanish version, simply pass
that locale code into the `div`.

```
<div id="herman-miller-interactive-experience" data-asset-path="http://localhost:4200/" data-locale-code="es"></div>
```
