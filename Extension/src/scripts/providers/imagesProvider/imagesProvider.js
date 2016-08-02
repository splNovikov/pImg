/**
 * Created by Novikov on 7/14/2016.
 */

define('imagesProvider', function () {
	return {
		getImages: getImages
	};

	/**
	 * temporary stub
	 * @returns {*[]}
	 */
	function getImages() {
		return [
			//{title:'Костя gif', path: 'https://psv4.vk.me/c415119/u4308777/docs/f6a1721c399a/20160705_113235.gif'},
			//{title:'boobs gif', path: 'http://static1.fjcdn.com/thumbnails/comments/Lamangalamat+used+roll+picture+lamangalamat+rolled+image+i+found+one+_daec7902532889cd7f0a0e2a1ac27f6a.gif'},

			{title: 'Bla bla bla by Chandler M Bing', path: 'https://25.media.tumblr.com/tumblr_m83mmxbO5w1qh01r8o1_400.gif'},
			{title: 'Todd high five', path: 'http://cs5.pikabu.ru/images/big_size_comm_an/2014-11_4/14165047217700.gif'},
			{title: 'How u doing', path: 'https://24.media.tumblr.com/tumblr_m8rjytqrGK1r6g1koo1_500.gif'},
			{title: 'Yeah baby!!!', path: 'http://leproimg.com/2133451'},
			{title: 'Конькобежка --> Бля!!!', path: 'http://s1.developerslife.ru/public/images/gifs/baca2286-d5d5-44d0-a072-808da581f18e.gif'},
			{title: '(wall)', path: 'http://s1.developerslife.ru/public/images/gifs/f3dda35f-a0c9-48db-baf1-7f39e0858e1b.gif'},
			{title: 'Кларксон', path: 'http://persephonemagazine.com/wp-content/uploads/2013/02/clarkson-bird.gif'},
			{title: 'Fuck', path: 'https://quizzicalllama.files.wordpress.com/2013/12/fuck-fuck-off-funny-gif-hangover-favim-com-368894.gif'},
			{title: 'Fuck Fuck Fuck!!!', path: 'http://s1.developerslife.ru/public/images/gifs/42b0331c-9193-4047-9db3-6b227bb4b356.gif'},
			{title: 'You are not original', path: 'http://leproimg.com/2119236'},
			{title: 'What?', path: 'http://s1.developerslife.ru/public/images/gifs/5d24883d-94e7-486d-b221-0a1a6b079405.gif'},

			{title: 'Ах ты ублюдок', path: 'https://pp.vk.me/c624623/v624623651/47cc3/gWV6uQ3oXLo.jpg'},
			{title: 'Вы зануда Серёжа', path: 'https://pp.vk.me/c630622/v630622505/1be2/7yMqLNuFXOA.jpg'},
			{title: 'Ща лопну от смеха', path: 'http://cs7010.vk.me/v7010894/306a/CgYg2CXAsGo.jpg'},
			{title: 'Пощади человек-анекдот', path: 'https://pp.vk.me/c627627/v627627777/20e44/BDApIgvDAxw.jpg'},
			{title: '50 cent Баян', path: 'https://pp.vk.me/c623221/v623221829/45e98/FcVCS9YrnIc.jpg'},
			{title: 'pImg logo', path: 'https://cs7060.vk.me/c629330/v629330002/19c38/JzFtB1_6a-k.jpg'},
			{title: 'Facepalm by me', path: 'https://pp.vk.me/c628618/v628618777/1aafb/Suaxg8qcQJE.jpg'},
			{title: 'Shit', path: 'https://pp.vk.me/c628618/v628618777/1aaf1/83ZOXNh3PBY.jpg'},
			{title: 'Katty with big teeth', path: 'https://pp.vk.me/c628618/v628618777/1ab05/ASC4JDjExlQ.jpg'},
			{title: 'Kate crazy', path: 'https://pp.vk.me/c628618/v628618777/1ab21/zMagSMQIBws.jpg'},
			{title: 'ILU by me', path: 'https://pp.vk.me/c624519/v624519777/571bc/G7twCjZ51zU.jpg'},
			{title: 'ILU Katty', path: 'https://pp.vk.me/c622126/v622126729/538fb/LYkJUM4u82s.jpg'},
			{title: 'ILU M', path: 'https://pp.vk.me/c627826/v627826531/2190b/WSWCdfblV2M.jpg'},
			{title: 'Хуёси', path: 'https://pp.vk.me/c623619/v623619729/49b12/YX4_OAoJZog.jpg'},
			{title: 'Стиффлер показывает факи', path: 'https://pp.vk.me/c627725/v627725520/1b1a6/Bq7EwdtRg6w.jpg'},
			{title: 'Английский fuck you', path: 'https://pp.vk.me/c622830/v622830410/53d7e/95yWb1xf1h4.jpg'},
			{title: 'Fuck you for iphoners', path: 'https://pp.vk.me/c624216/v624216904/50168/FO8AUMfqOII.jpg'},
			{title: 'Fuck you img', path: 'https://pp.vk.me/c624221/v624221815/5cddd/lkLpEg3SB8k.jpg'},
			{title: 'Fuck you M', path: 'https://pp.vk.me/c627826/v627826531/21901/ykLAJbtFhaM.jpg'},
			{title: 'Fuck you Katty', path: 'https://pp.vk.me/c622025/v622025729/49b81/XZOKuSAHdwE.jpg'},
			{title: 'Kiss the fuck by Katty', path: 'https://pp.vk.me/c628618/v628618777/1aae9/Ui-tkqzw2EA.jpg'},
			{title: 'Fuck you Katty2', path: 'https://cs7060.vk.me/c628028/v628028729/2d78d/nSFLbHAb_uw.jpg'},
			{title: 'Double fuck from Katty', path: 'https://pp.vk.me/c622025/v622025729/49b8a/12EUMb59shY.jpg'},
			{title: 'tattoo', path: 'https://pp.vk.me/c7007/v7007300/e576/eR5KLkho1rs.jpg'},
			{title: 'дайте кирпич', path: 'https://pp.vk.me/c627218/v627218777/1d9f3/CdaG8iADZrQ.jpg'}
		];
	}
});