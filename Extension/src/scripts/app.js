require(['ImgSettings', 'injector'], function (ImgSettings, injector) {
	let settings = new ImgSettings();
	let smallPollingMs = 300;
	let longPollingMs = 1500;

	polling(settings, smallPollingMs);

	function polling(ms) {
		polling.currentMs = ms;
		polling.interval = setInterval(function () {
			// find all send buttons
			let sendButtons = injector.findSendButtons(settings.vkElements.sendButtonsSelectors);

			// if there are no any button -> restart polling
			if (sendButtons.length === 0) {
				_restartPolling(polling, smallPollingMs);
				return;
			}

			let notInjectedButtons = injector.filterNotInjectedButtons(sendButtons, settings.injectedStyleName);

			if (notInjectedButtons.length !== 0) {
				_restartPolling(polling, longPollingMs);
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
//
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
