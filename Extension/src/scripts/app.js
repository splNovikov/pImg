require(['ImgSettings', 'injector'], function (ImgSettings, injector) {
	'use strict';

	let settings = new ImgSettings();

	polling(settings, 300);

	function polling(ms) {
		polling.currentMs = ms;
		polling.interval = setInterval(function () {
			// find all send buttons
			let sendButtons = injector.findSendButtons(settings.vkElements.sendButtonsSelectors);

			// if there are no any button -> restart polling
			if (sendButtons.length === 0) {
				_restartPolling(polling, 300);
				return;
			}

			let notInjectedButtons = injector.filterNotInjectedButtons(sendButtons, settings.injectedStyleName);

			if (notInjectedButtons.length !== 0) {
				_restartPolling(polling, 1500);
				injector.startHtmlInjection(notInjectedButtons, settings.injectedStyleName);
			}
		}, ms);
	}

	/**
	 * restarts polling with new ms. If ms is not new - nothing happens.
	 * @param polling {function}
	 * @param newPollingMs {int}
	 * @private
	 */
	function _restartPolling(polling, newPollingMs) {
		if (polling.currentMs === newPollingMs) {
			return;
		}
		clearInterval(polling.interval);
		polling(newPollingMs);
	}

});

//(function init() {
//    'use strict';
//
//    _generateSinglePImg();
//    _getTemplates(pImgExt.allTemplatesPath);
//    _onCompletedListener();
//
//    function _generateSinglePImg() {
//        window.pImgExt = {
//            settings: {
//                insertStyleName: 'paste-img',
//                buttonId: 'button._im_send'
//            },
//            allTemplatesPath: '../../views/templates.html',
//            templatesNamesArr: [
//                {
//                    htmlName: '#primary-wrapper',
//                    singletonName: 'primaryWrapper'
//                },
//                {
//                    htmlName: '#arrow-wrapper',
//                    singletonName: 'arrowWrapper'
//                }
//            ],
//            hTMLs: {
//                primaryWrapper: null,
//                arrowWrapper: null
//            }
//
//        }
//    }
//
//
//
//    function _startHtmlInjection() {
//        var imBtnName = window.pImgExt.settings.buttonId,
//            $imBtn,
//            className = window.pImgExt.settings.insertStyleName,
//            pImgPopupMarkup,
//            images = _getImagesFromStorage() || [],
//            $imagesContainer,
//            $imageWrapper,
//            $arrow,
//            $pImgPopup;
//
//        if (!pImgExt.hTMLs.primaryWrapper) {
//            return;
//        }
//
//        $imBtn = $(imBtnName);
//
//        if ($imBtn.length === 0 || $imBtn.hasClass(className)) {
//            return;
//        }
//
//        $imBtn.addClass(className);
//        $imBtn.append(pImgExt.hTMLs.arrowWrapper);
//
//        pImgPopupMarkup = _.template(pImgExt.hTMLs.primaryWrapper);
//        $imBtn.prepend(pImgPopupMarkup({images: images}));
//
//        // listeners:
//        $arrow = $('div#im-arrow-pimg');
//        $pImgPopup = $('div#p-img-popup');
//        $imageWrapper = $('div.image-wrapper');
//        $imagesContainer = $('div#images-container');
//
//        $arrow.click(function (event) {
//            _stopBubbling(event);
//            window.pImgExt.imEditable = $("div[id^='im_editable']:visible");
//            _showHideImImagesMenu({'event': event, 'pImgPopup': $pImgPopup});
//        });
//        $('html').click(function (event) {
//            _showHideImImagesMenu({'event': event, 'pImgPopup': $pImgPopup, 'hardlyHide': true});
//        });
//        $imageWrapper.click(function (event) {
//            var src = $(event.target).attr('src');
//
//            _stopBubbling(event);
//
//            pImgExt.imEditable.focus();
//            document.execCommand('insertText', false, src + ' ');
//            document.execCommand('paste');
//
//            _showHideImImagesMenu({'event': event, 'pImgPopup': $pImgPopup, 'hardlyHide': true});
//        });
//        $imagesContainer.click(function (event){
//            _stopBubbling(event);
//        });
//    }
//
//    function _getImagesFromStorage() {
//        return [
//            {title: 'Ах ты ублюдок', path: 'https://pp.vk.me/c624623/v624623651/47cc3/gWV6uQ3oXLo.jpg'},
//            {title: 'Вы зануда Серёжа', path: 'https://pp.vk.me/c630622/v630622505/1be2/7yMqLNuFXOA.jpg'},
//            {title: 'Ща лопну от смеха', path: 'http://cs7010.vk.me/v7010894/306a/CgYg2CXAsGo.jpg'},
//            {title: 'Пощади человек-анекдот', path: 'https://pp.vk.me/c627627/v627627777/20e44/BDApIgvDAxw.jpg'},
//            {title: '50 cent Баян', path: 'https://pp.vk.me/c623221/v623221829/45e98/FcVCS9YrnIc.jpg'},
//            {title: 'pImg logo', path: 'https://cs7060.vk.me/c629330/v629330002/19c38/JzFtB1_6a-k.jpg'},
//            {title: 'Facepalm by me', path: 'https://pp.vk.me/c628618/v628618777/1aafb/Suaxg8qcQJE.jpg'},
//            {title: 'Shit', path: 'https://pp.vk.me/c628618/v628618777/1aaf1/83ZOXNh3PBY.jpg'},
//            {title: 'Katty with big teeth', path: 'https://pp.vk.me/c628618/v628618777/1ab05/ASC4JDjExlQ.jpg'},
//            {title: 'Kate crazy', path: 'https://pp.vk.me/c628618/v628618777/1ab21/zMagSMQIBws.jpg'},
//            {title: 'ILU by me', path: 'https://pp.vk.me/c624519/v624519777/571bc/G7twCjZ51zU.jpg'},
//            {title: 'ILU Katty', path: 'https://pp.vk.me/c622126/v622126729/538fb/LYkJUM4u82s.jpg'},
//            {title: 'ILU M', path: 'https://pp.vk.me/c627826/v627826531/2190b/WSWCdfblV2M.jpg'},
//            {title: 'ILU by Ksu', path: 'https://pp.vk.me/c629122/v629122628/1684a/eqCk6ygIKhc.jpg'},
//            {title: 'Хуёси', path: 'https://pp.vk.me/c623619/v623619729/49b12/YX4_OAoJZog.jpg'},
//            {title: 'Стиффлер показывает факи', path: 'https://pp.vk.me/c627725/v627725520/1b1a6/Bq7EwdtRg6w.jpg'},
//            {title: 'Английский fuck you', path: 'https://pp.vk.me/c622830/v622830410/53d7e/95yWb1xf1h4.jpg'},
//            {title: 'Fuck you for iphoners', path: 'https://pp.vk.me/c624216/v624216904/50168/FO8AUMfqOII.jpg'},
//            {title: 'Fuck you img', path: 'https://pp.vk.me/c624221/v624221815/5cddd/lkLpEg3SB8k.jpg'},
//            {title: 'Fuck you M', path: 'https://pp.vk.me/c627826/v627826531/21901/ykLAJbtFhaM.jpg'},
//            {title: 'Fuck you Katty', path: 'https://pp.vk.me/c622025/v622025729/49b81/XZOKuSAHdwE.jpg'},
//            {title: 'Kiss the fuck by Katty', path: 'https://pp.vk.me/c628618/v628618777/1aae9/Ui-tkqzw2EA.jpg'},
//            {title: 'Fuck you Katty2', path: 'https://cs7060.vk.me/c628028/v628028729/2d78d/nSFLbHAb_uw.jpg'},
//            {title: 'Double fuck from Katty', path: 'https://pp.vk.me/c622025/v622025729/49b8a/12EUMb59shY.jpg'},
//            {title: 'tattoo', path: 'https://pp.vk.me/c7007/v7007300/e576/eR5KLkho1rs.jpg'},
//            {title: 'дайте кирпич', path: 'https://pp.vk.me/c627218/v627218777/1d9f3/CdaG8iADZrQ.jpg'}
//        ];
//    }
//
//    function _showHideImImagesMenu(o) {
//        var animation = 'fast';
//        _stopBubbling(o.event);
//
//        if (o.hardlyHide) {
//            o.pImgPopup.fadeOut(animation);
//            return;
//        }
//
//        o.pImgPopup.fadeToggle(animation);
//
//    }
//
//    function _stopBubbling(event) {
//        event.preventDefault();
//        event.stopPropagation();
//    }
//
//    function _getTemplates(path) {
//        $.get(chrome.extension.getURL(path), function (templates) {
//            _parseTemplates(pImgExt.templatesNamesArr, templates);
//            _startHtmlInjection();
//        });
//    }
//
//    function _parseTemplates(templatesNamesArr, templatesHtml) {
//        var $templatesHtml = $($.parseHTML(templatesHtml));
//
//        _.each(templatesNamesArr, function (tmpl) {
//            pImgExt.hTMLs[tmpl.singletonName] = $templatesHtml.find(tmpl.htmlName).html();
//        })
//    }
//
//})();
