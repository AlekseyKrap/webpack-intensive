export const setupHtml = () => ({
    plugins: [
        // Каждый плагин — это конструктор
        new HtmlWebpackPlugin({
            template: './static/template.html',
            title:    'Изучаем вебпак! 🚀',
            favicon:  './static/favicon.ico',
        }),
    ],
});
