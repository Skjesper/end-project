import localFont from 'next/font/local'

export const futuraFont = localFont({
	src: [
		{
			path: '../../public/fonts/FuturaLTPro-Book.woff',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/FuturaLTPro-Medium.woff',
			weight: '500',
			style: 'normal'
		}
	],
	variable: '--font-futura',
	display: 'swap'
})
