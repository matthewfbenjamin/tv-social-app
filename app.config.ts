import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'TV Social',
  slug: 'tv-social-app',
  extra: {
    tmdbApiKey: process.env.TMDB_API_KEY,
    b4aAppId:   process.env.B4A_APP_ID,
    b4aJsKey:   process.env.B4A_JS_KEY,
  },
};
export default config;