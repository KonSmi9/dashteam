module.exports = {
    parser: '@typescript-eslint/parser', // Указываем TypeScript-парсер
    plugins: [
        '@typescript-eslint', // Плагин для TypeScript
        'react',              // Плагин для React
        'react-hooks',        // Плагин для хуков React
        'import',             // Плагин для проверки импортов
    ],
    extends: [
        'eslint:recommended', // Рекомендации ESLint
        'plugin:@typescript-eslint/recommended', // Рекомендации для TypeScript
        'plugin:react/recommended', // Рекомендации для React
        'plugin:react-hooks/recommended', // Рекомендации для хуков
        'plugin:import/errors', // Проверка импортов
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier', // Интеграция с Prettier (если используется)
    ],
    settings: {
        react: {
            version: 'detect', // Автоматическое определение версии React
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'], // Поддержка расширений
            },
        },
    },
    rules: {
        // Общие правила
        'no-unused-vars': 'off', // Отключаем стандартное правило
        '@typescript-eslint/no-unused-vars': ['error'], // Используем правило для TS
        'semi': ['error', 'always'], // Обязательно использовать точку с запятой
        'quotes': ['error', 'single'], // Использовать одинарные кавычки
        'no-trailing-spaces': 'error', // Удаление пробелов в конце строк
        'comma-spacing': ['error', { before: false, after: true }], // Пробел после запятой
        'object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок

        // React
        'react/prop-types': 'off', // Отключаем проверку PropTypes (если используете TypeScript)
        'react/react-in-jsx-scope': 'off', // Не требуется в React 17+

        // React Hooks
        'react-hooks/rules-of-hooks': 'error', // Проверка правильного использования хуков
        'react-hooks/exhaustive-deps': 'warn', // Проверка зависимостей в хуках

        // Import
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
};
