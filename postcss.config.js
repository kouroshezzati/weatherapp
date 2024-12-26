// postcss.config.js (ES module format)
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    autoprefixer(),
    postcssPresetEnv({
      stage: 3, // Adjust stage according to your preference (0-4)
    }),
  ],
};
