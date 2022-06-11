# CrudMan APP IN DEVELOPMENT

### Features added on last commit:

-   Added some functionalities in sidebar.
-   HistorySaver created and work properly.
-   Histories are saved in localStorage.
-   Histories synchronized with components.
-   Some new components are created for declaratively.
-   fixed #7

## Contributing

Please read the [CONTRIBUTING](./CONTRIBUTING.md) page for more info.

### File Tree

```sh
.
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── components
│   ├── CommonSliderAssets.tsx
│   ├── Config
│   │   ├── AuthSlide
│   │   │   ├── APIKeySlide.tsx
│   │   │   ├── AuthSlide.tsx
│   │   │   ├── BasicSlide.tsx
│   │   │   ├── BearerSlide.tsx
│   │   │   ├── InputAuth.tsx
│   │   │   ├── NoneSlide.tsx
│   │   │   ├── OAuth2Slide.tsx
│   │   │   └── index.ts
│   │   ├── BodySlide
│   │   │   └── BodySlide.tsx
│   │   ├── Config.tsx
│   │   ├── HeaderSlide
│   │   │   ├── HeaderInput.tsx
│   │   │   ├── HeaderSlide.tsx
│   │   │   └── SelectHeaderButton.tsx
│   │   ├── QuerySlide
│   │   │   ├── InputPlace.tsx
│   │   │   └── QuerySlide.tsx
│   │   ├── TestSlide
│   │   │   ├── SelectButton.tsx
│   │   │   ├── SelectButtonValue.tsx
│   │   │   ├── TestInput.tsx
│   │   │   └── TestSlide.tsx
│   │   ├── UrlInput.tsx
│   │   └── index.ts
│   ├── Nav.tsx
│   ├── Results
│   │   ├── CodeSlide
│   │   │   ├── Code.tsx
│   │   │   ├── CodeBody.tsx
│   │   │   └── CodeHeader.tsx
│   │   ├── Loader.tsx
│   │   ├── Response
│   │   │   └── Response.tsx
│   │   ├── Results.tsx
│   │   ├── StatusBar.tsx
│   │   ├── Table.tsx
│   │   ├── TestResults
│   │   │   └── TestResults.tsx
│   │   └── index.ts
│   ├── Sidebar
│   │   ├── Histories.tsx
│   │   ├── RequestList.tsx
│   │   └── Sidebar.tsx
│   ├── Wrapper.tsx
│   └── index.ts
├── css
│   ├── App.module.scss
│   ├── globals.scss
│   └── splitters.scss
├── image
│   └── logo.svg
├── jsconfig.json
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── _offline.tsx
│   ├── api
│   │   └── headerParser.ts
│   ├── index.tsx
│   └── test.tsx
├── plugins
│   └── Splitters
│       ├── HandleBar.tsx
│       ├── Helpers.ts
│       ├── Pane.tsx
│       ├── Splitter.tsx
│       ├── index.tsx
│       ├── splitters.scss
│       └── typings
│           └── index.d.ts
├── public
│   ├── fallback-development.js
│   ├── favicon.ico
│   ├── icons
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-16x16.png
│   │   ├── icon-192x192.png
│   │   ├── icon-32x32.png
│   │   ├── icon-384x384.png
│   │   ├── icon-512x512.png
│   │   ├── icon-72x72.png
│   │   └── icon-96x96.png
│   ├── manifest.json
│   ├── robots.txt
│   ├── sw.js
│   ├── sw.js.map
│   ├── workbox-74d02f44.js
│   ├── workbox-74d02f44.js.map
│   └── worker-development.js
├── target
│   └── npmlist.json
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── utils
│   ├── ApiData.tsx
│   ├── Auth.tsx
│   ├── Body.tsx
│   ├── Code.tsx
│   ├── Headers.tsx
│   ├── HistorySaver.tsx
│   ├── Params.tsx
│   ├── Test.tsx
│   ├── Theme.tsx
│   ├── UrlData.tsx
│   ├── data.json
│   ├── interfaces.ts
│   ├── mime.json
│   ├── status.json
│   └── utils.ts
└── worker
    └── index.js
```
