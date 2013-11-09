({
    block: 'b-page',
    title: 'Главная',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index', ie: true },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_index.js' },
        { elem: 'meta', attrs: { name: 'description', value: '' }},
        { elem: 'meta', attrs: { name: 'keywords', value: '' }}
    ],
    content:[
        {
            block: 'b-container',
            article: 'Данный сайт сверстан в качестве задания для Школы разработки интерфейсов Яндекса и содержит ответы на технические вопросы.'
        }
    ],

    index: '1'
})