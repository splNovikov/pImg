/**
 * Created by Novikov on 7/11/2016.
 */

define('primary', [
    'eventProviderFacade',
    'ImgSettings'],
  function (eventProviderFacade,
            ImgSettings) {

    const _template = '<span class="arrow-down">&#x25BC</span></div>';

    return {
      create: create
    };

    /**
     * Create primary element and add eventListeners
     * @param uniqueName {String}
     * @param popup {Element}
     * @returns {Element}
     */
    function create(uniqueName, popup) {
      let _primaryNode = _createPrimaryNode();
      eventProviderFacade.bindPrimary(uniqueName, _primaryNode, popup);
      return _primaryNode;
    }

    /**
     * Helper to create primary element
     * @returns {Element}
     * @private
     */
    function _createPrimaryNode() {
      let _settings = new ImgSettings();
      let _primaryNode = document.createElement('div');
      _primaryNode.className = _settings.pImgSelectors.arrowBlock;
      _primaryNode.innerHTML = _template;

      return _primaryNode;
    }

  }
);
