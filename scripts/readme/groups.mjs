import { any, byIds, bySource, byType, hasTag } from './predicates.mjs';

export const CATEGORY_GROUP_DEFINITIONS = new Map([
  [
    'Official Docs & Upgrade Guides',
    [
      {
        title: 'Expo Core & Upgrades',
        predicate: byIds([
          'expo-docs',
          'expo-router-docs',
          'eas-docs',
          'expo-sdk-55-changelog',
          'expo-upgrade-walkthrough'
        ])
      },
      {
        title: 'React Native Core & Upgrades',
        predicate: byIds(['react-native-docs', 'react-native-082-release'])
      },
      {
        title: 'Upgrade Tooling',
        predicate: byIds(['react-native-upgrade-helper', 'expo-doctor-docs'])
      }
    ]
  ],
  [
    'Starter Kits & Boilerplates',
    [
      {
        title: 'Official Expo Starters',
        predicate: bySource('official')
      },
      {
        title: 'Starter CLIs & Generators',
        predicate: any(byType('tool'), hasTag('cli'))
      },
      {
        title: 'Starter Templates & Boilerplates',
        predicate: any(byType('template'), hasTag('starter'), hasTag('boilerplate'), hasTag('monorepo'))
      }
    ]
  ],
  [
    'Navigation & Routing',
    [
      {
        title: 'Navigation Foundations',
        predicate: byIds(['react-navigation-getting-started', 'react-navigation-native-stack'])
      },
      {
        title: 'Expo Router Patterns',
        predicate: byIds(['expo-router-docs', 'expo-router-notation', 'expo-router-typed-routes'])
      },
      {
        title: 'Deep Linking',
        predicate: byIds(['expo-linking-overview', 'react-navigation-deep-linking'])
      }
    ]
  ],
  [
    'State, Data Fetching & Caching',
    [
      {
        title: 'Remote Data Query & Cache',
        predicate: byIds(['tanstack-query-react-native', 'tanstack-query-persist-client'])
      },
      {
        title: 'Local App State',
        predicate: byIds(['jotai-docs', 'redux-toolkit-quick-start', 'zustand-introduction'])
      },
      {
        title: 'Persistence & Local Storage',
        predicate: byIds(['react-native-mmkv', 'expo-sqlite-sdk-docs', 'expo-securestore-sdk-docs'])
      },
      {
        title: 'Backend & Database Integrations',
        predicate: byIds([
          'appwrite-react-native-quickstart',
          'appwrite-platform',
          'react-native-firebase-docs',
          'supabase-expo-react-native-tutorial'
        ])
      }
    ]
  ],
  [
    'UI, Design Systems & Theming',
    [
      {
        title: 'Expo UI Core',
        predicate: byIds(['expo-ui-sdk-docs'])
      },
      {
        title: 'UI Component Kits',
        predicate: byIds([
          'gluestack-ui-repo',
          'heroui-native',
          'react-native-elements',
          'react-native-paper',
          'react-native-reusables',
          'react-native-bottom-sheet',
          'react-native-true-sheet',
          'sonner-native-toasts'
        ])
      },
      {
        title: 'Styling & Theming Engines',
        predicate: byIds([
          'dripsy',
          'nativewind-docs',
          'react-native-unistyles',
          'shopify-restyle',
          'tamagui-introduction',
          'uniwind'
        ])
      },
      {
        title: 'UI Guides',
        predicate: byIds(['gluestack-ui-intro'])
      }
    ]
  ],
  [
    'Forms & Validation',
    [
      {
        title: 'Form Libraries',
        predicate: byIds(['formik-overview', 'react-hook-form-get-started', 'tanstack-form-overview', 'yup-repository'])
      },
      {
        title: 'Validation Schemas',
        predicate: byIds(['zod-docs', 'valibot-docs'])
      }
    ]
  ],
  [
    'Testing & QA',
    [
      {
        title: 'Unit & Component Testing',
        predicate: byIds([
          'jest-react-native-tutorial',
          'react-native-testing-library',
          'expo-unit-testing-guide',
          'react-error-boundary'
        ])
      },
      {
        title: 'E2E Testing',
        predicate: byIds(['detox-docs', 'maestro-docs'])
      },
      {
        title: 'CI Testing Workflows',
        predicate: byIds(['expo-e2e-workflows-example'])
      }
    ]
  ],
  [
    'Performance & Profiling',
    [
      {
        title: 'List & Rendering',
        predicate: byIds(['flashlist-docs', 'legend-list'])
      },
      {
        title: 'Runtime & Engine',
        predicate: byIds(['react-native-performance-overview', 'react-native-hermes'])
      },
      {
        title: 'Animation & Graphics',
        predicate: byIds(['reanimated-docs', 'react-native-skia', 'react-native-worklets-docs', 'moti'])
      },
      {
        title: 'Bundle Analysis',
        predicate: byIds(['expo-analyzing-bundles'])
      }
    ]
  ],
  [
    'Build, Release & EAS',
    [
      {
        title: 'EAS Pipeline',
        predicate: byIds([
          'eas-build-introduction',
          'eas-submit-introduction',
          'eas-update-introduction',
          'eas-metadata-introduction'
        ])
      },
      {
        title: 'Release Automation',
        predicate: byIds(['fastlane-react-native-guide'])
      },
      {
        title: 'Subscriptions & IAP',
        predicate: byIds(['revenuecat-react-native-installation', 'adapty-react-native-sdk-installation'])
      },
      {
        title: 'Analytics & Attribution',
        predicate: byIds([
          'posthog-react-native-docs',
          'mixpanel-react-native',
          'appsflyer-react-native-plugin',
          'adjust-react-native-sdk-docs'
        ])
      },
      {
        title: 'Observability & Crash Reporting',
        predicate: byIds(['sentry-react-native-docs'])
      }
    ]
  ],
  [
    'Native Modules & Device APIs',
    [
      {
        title: 'Expo Native Infrastructure',
        predicate: byIds([
          'expo-modules-overview',
          'expo-config-plugins-introduction',
          'expo-development-builds',
          'expo-dev-client-sdk-docs'
        ])
      },
      {
        title: 'React Native Native Architecture',
        predicate: byIds(['react-native-new-architecture-overview', 'react-native-turbo-native-modules', 'nitro-modules'])
      },
      {
        title: 'Network & Connectivity',
        predicate: byIds(['react-native-netinfo'])
      },
      {
        title: 'Device APIs & Utilities',
        predicate: byIds(['react-native-permissions', 'react-native-share', 'react-native-keyboard-controller'])
      },
      {
        title: 'Localization & i18n',
        predicate: byIds(['i18next-docs', 'react-i18next-docs'])
      },
      {
        title: 'Media Modules',
        predicate: byIds(['expo-image-sdk-docs', 'expo-video-sdk-docs'])
      }
    ]
  ],
  [
    'Learning Resources (high-signal only)',
    [
      {
        title: 'Production Open-source Apps',
        predicate: byIds(['artsy-eigen', 'bluesky-social-app', 'expensify-app', 'kraken-wallet', 'uniswap-interface'])
      },
      {
        title: 'Curated Lists & Discovery',
        predicate: byIds([
          'jondot-awesome-react-native',
          'react-native-apps-curated',
          'enaqx-awesome-react',
          'sindresorhus-awesome'
        ])
      },
      {
        title: 'News & Community Updates',
        predicate: byIds(['expo-blog', 'react-native-blog', 'react-native-radio', 'this-week-in-react'])
      },
      {
        title: 'Tutorials & Discovery Feeds',
        predicate: byIds(['expo-tutorial', 'github-topic-react-native', 'appjs-conference-youtube'])
      }
    ]
  ]
]);
