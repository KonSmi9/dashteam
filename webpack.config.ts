import path from 'path';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build:  path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
};
export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const port = env.port || 3000;
    const isDev = mode === 'development';

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port,
    });
};
