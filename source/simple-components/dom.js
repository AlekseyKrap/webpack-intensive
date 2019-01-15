export default (text = 'Хеллоу гайз!!! 🎉🎉🎉 🔥🔥🔥') => {
    const element = document.createElement('div');

    element.innerHTML = text;

    /* Code splitting */
    element.addEventListener('click', async () => {
        // 1. индикатор загрузки
        element.innerHTML = 'Подготовка....';
        await (() => new Promise((resolve) => setTimeout(resolve, 2000)))(); // ждём 2 секунды
        element.innerHTML = 'Загружаю....';

        const { default: text } = await import('./lazyLoadedText');

        // 2. загрузить split point
        // 3. добавить в элемент загруженный текст
    });

    return element;
};
