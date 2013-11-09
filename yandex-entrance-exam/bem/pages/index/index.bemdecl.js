exports.blocks = [
    { name: 'b-page' },
    { name: 'b-wrapper',
		elems: [{ name: 'blank' }] },
    { name: 'b-header',
        elems: [{ name: 'logo' }] },
    { name: 'b-nav'},
    { name: 'b-top_menu', 
		elems: [{ name: 'item',
			mods: [{name:'color', vals:['white']},{name:'decoration', vals:['none']} ] }] },
	{ name: 'b-hidden_menu', 
		elems: [{ name: 'item' }] },
    { name: 'b-main',
		elems: [{ name: 'article' }] },
	{ name: 'b-code' },
    { name: 'b-footer' },
    { name: 'b-bottom_menu',
		elems: [{ name: 'item' }] }
]
