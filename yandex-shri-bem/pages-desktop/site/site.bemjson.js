({
    block: 'b-page',
    title: 'О сайте',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_site.css', ie: false },
        { elem: 'css', url: '_site', ie: true },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_index.js' },
        { elem: 'meta', attrs: { name: 'description', value: '' }},
        { elem: 'meta', attrs: { name: 'keywords', value: '' }}
    ],
    content:[
        {
            block: 'b-container',
            article: 'Здесь добавить информацию о сайте'
        }
    ]
})