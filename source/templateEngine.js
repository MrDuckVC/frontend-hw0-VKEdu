'use strict';

/**
 * Заменяет переменные в строке шаблона на значения из объекта данных.
 *
 * @param {string} template - Строка шаблона с переменными вида {{variable}} или {{nested.variable}}.
 * @param {object} data - Объект с данными для подстановки.
 *
 * @description
 * Внимание: функция использует символ точки ('.') для определения вложенности.
 * Ключи объекта, содержащие точку в самом названии (например, { "user.name": "Ivan" }),
 * не поддерживаются и будут интерпретированы как вложенные свойства.
 *
 * @example
 * // returns "Привет, Технопарк!"
 * templateEngine("Привет, {{name}}!", { name: "Технопарк" });
 *
 * @returns {string} Результирующая строка. При некорректном шаблоне возвращает пустую строку.
 */
const templateEngine = (template, data) => {
    // Валидация входного шаблона
    if (typeof template !== 'string') {
        return '';
    }

    // Валидация объекта данных (null тоже имеет typeof 'object', отсекаем его)
    const isDataValid = typeof data === 'object' && data !== null && !Array.isArray(data);

    return template.replace(/\{\{(.*?)\}\}/g, (match, path) => {
        if (!isDataValid) return '';

        const keys = path.trim().split('.');

        const value = keys.reduce((acc, key) => {
            // Проверяем, что acc валиден и свойство принадлежит именно ему, а не прототипу
            if (acc !== undefined && acc !== null && Object.hasOwn(acc, key)) {
                return acc[key];
            }
            return undefined;
        }, data);

        return value !== undefined ? value : '';
    });
};
