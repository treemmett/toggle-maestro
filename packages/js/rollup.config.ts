import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const env = process.env.NODE_ENV;

const extensions = ['.js', '.ts', '.tsx', '.json'];

const config: RollupOptions = {
  external: Object.keys(pkg.peerDependencies || {}).concat('react-dom'),
  input: 'src/index.ts',
  output: {
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    name: 'toggle-maestro',
  },
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      extensions,
      include: 'src/**/*',
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs(),
  ],
};

if (env === 'production' && config.plugins && Array.isArray(config.plugins)) {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    })
  );
}

export default config;
