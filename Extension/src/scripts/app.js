require(['ImgSettings', 'injector'], function (ImgSettings, injector) {
	let _settings = new ImgSettings();
	let _smallPollingMs = 300;
	let _longPollingMs = 1500;

	polling(_settings, _smallPollingMs);

	function polling(ms) {
		polling.currentMs = ms;
		polling.interval = setInterval(function () {
			// find all send buttons
			let sendBtnArr = injector.findSendButtons(_settings.vkElements.sendButtonsSelectors);

			// if there are no any button -> restart polling
			if (sendBtnArr.length === 0) {
				_restartPolling(polling, _smallPollingMs);
				return;
			}

			let notInjectedButtons = injector.filterNotInjectedButtons(sendBtnArr, _settings.uniqueAttributeName);

			if (notInjectedButtons.length !== 0) {
				_restartPolling(polling, _longPollingMs);
				injector.makeHtmlInjectionAndBindings(notInjectedButtons);
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
