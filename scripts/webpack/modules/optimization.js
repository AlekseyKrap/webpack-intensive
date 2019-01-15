// Core
import TerserPlugin from 'terser-webpack-plugin';
import ImageminWebpackPlugin from 'imagemin-webpack';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

export const optimizeBuild = () => {
    return {
        optimization: {
            // production: минификация JavaScript
            minimize:  false,
            minimizer: [ new TerserPlugin() ],

            // production: останавливает эмит сборки при возникновении ошибки во время компиляции
            noEmitOnErrors: true,

            // ✓ Не добавляет в сборку пустые чанки — это уменьшает нагрузку на систему, что ускоряет ребилды.
            removeEmptyChunks:      true,
            // ✓ Объединяет идентичные чанки (которые содержат одинаковые модули)
            mergeDuplicateChunks:   true,
            // ✓ Удаляет модуль из чанка, если этот модуль присутствует в родительском чанке (то есть уже доступен).
            removeAvailableModules: true,

            // production: определяет более часто-используемые модули, и формирует сборку наиболее меньшего размера
            // TODO webpack 5 remove optimization.occurrenceOrder
            occurrenceOrder:    true,
            // production: анализирует dependency graph и пытается найти доступные для объединения модули
            // ? эта настройка зависит от providedExports и usedExports
            concatenateModules: false, // scope hoisting, module concatenation

            // ✓ определяет экспорты для каждого модуля, в результате сгенерировать более эффективный код
            providedExports: true,
            // production: определяет только использованные экспорты.
            // Помогает DCE минифификаторов удалять неиспользованные экспорты.
            usedExports:     true,
            // production: собирает зависимости более эффективно, если в package.json зависимости тоже стоит этот флаг.
            // ? эта настройка зависит от providedExports и usedExports
            sideEffects:     true,

            // development: вместо числовых идентификаторов даёт модулям более понятные имена
            // TODO webpack 5 add `moduleIds: "named"` default for development
            // TODO webpack 5 add `moduleIds: "size"` default for production
            // TODO webpack 5 remove optimization.namedModules
            namedModules: true,

            // development: вместо числовых идентификаторов даёт чанкам более понятные имена
            // TODO webpack 5 add `chunkIds: "named"` default for development
            // TODO webpack 5 add `chunkIds: "size"` default for production
            // TODO webpack 5 remove optimization.namedChunks
            namedChunks: true,

            // Эта опция включена всегда. Когфигурируется в SplitChunksPlugin.
            splitChunks: {
                // Режим разделения кода. По-умолчанию — async.
                chunks:    'all', // 'async' (on demand, normal chunk), 'initial' (initial chunk), 'all' ('async' + 'initial')
                // Минимальный размер нового чанка для отделения.
                minSize:   30000,
                // Максимальный размер нового чанка для отделения.
                maxSize:   0,
                // Минимальное количество чанков, которые зависят от модуля
                // перед отделением этого модуля в отдельный чанк.
                minChunks: 1,

                // Максимальное количество одновременных параллельных запросов чанков для асинхронного сплит-поинта (динамический импорт).
                // Всегда предпочитаются чанки большего размера.
                maxAsyncRequests:       5,
                // Максимальное количество одновременных параллельных запросов чанков на один entrypoint.
                // Всегда предпочитаются чанки большего размера.
                maxInitialRequests:     3,
                // Символ-разделитель имени сплит-чанка (напр. vendors~main.js).
                automaticNameDelimiter: '~',
                // Определяет имя нового чанка
                name:                   true,
                // Мо-умолчанию cacheGroups наследует от остальных опций splitChunks ↑.
                // Уникальные для cacheGroups только test, priority и reuseExistingChunk.
                // Ключ каждой кеш-группы определяет её имя.
                // По-умолчанию вебпак устанавливает две кеш-группы:
                cacheGroups:            {
                    // Дефолтная кеш-группа. Выносит все зависимости из node_nodules в чанк vendors.
                    vendors: {
                        // TODO: чекнуть исходный код webpack
                        // Выбирает модули, внесённые в данную кеш-группу. Если не указать будут выбраны все модули.
                        test:     /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                    default: {
                        // Дефолтная кеш-группа. Выносит любой модуль-зависимость в отдельный чанк default
                        // при условии дублирования модуля-зависимости хотя-бы в двух чанках.
                        minChunks:          2,
                        // Приоритет кеш-группы. Если модуль попадает сразу в несколько кеш-групп, то выбирется
                        // кеш-группа с более высоким priority, или которая составляет чанк большего размера.
                        // У дефолтных кеш-групп отрицательный приоритет,
                        // поэтому кастомные кеш-группы приоритетнее (их priority 0 по-умолчанию).
                        priority:           -20,
                        // Если чанк содержит уже существующий отделённый чанк,
                        // то используется этот уже существующий отделённый чанк вместо создания нового
                        reuseExistingChunk: true,
                    },
                },
            },
            runtimeChunk: true,
        },
    };
};

export const optimizeImages = () => ({
    plugins: [
        new ImageminWebpackPlugin({
            imageminOptions: {
                plugins: [
                    imageminMozjpeg({
                        progressive: true,
                        quality:     60,
                    }),
                    imageminPngquant({
                        quality: 60,
                    }),
                    imageminSvgo(),
                ],
            },
        }),
    ],
});
