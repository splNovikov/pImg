/**
 * Created by Novikov on 7/14/2016.
 */

define('popup', [
    'eventProviderFacade',
    'ImgSettings',
    'TabsEnum',
    'imagesProvider'],
  function (eventProviderFacade,
            ImgSettings,
            TabsEnum,
            imagesProvider) {

    let _templatesLiteral = _createTemplatesLiteral();

    return {
      create: create
    };

    function create(uniqueName, imEditable) {
      let _nodes = _createNodeElements();
      let _popupNode = _createPopupNode(_nodes);
      eventProviderFacade.bindPopup(uniqueName, _popupNode, _nodes, imEditable);
      return _popupNode;
    }

    function _createPopupNode(nodes) {
      let _settings = new ImgSettings();
      let _popupNode = document.createElement('div');
      _popupNode.className = _settings.pImgSelectors.popup;

      let _primaryContainer = _createPrimaryNode(nodes);

      _popupNode.appendChild(_primaryContainer);
      _popupNode.appendChild(nodes.bottomTriangle);

      return _popupNode;
    }

    function _createNodeElements() {
      let _settings = new ImgSettings();
      let _nodesLiteral = _createNodesLiteral(_templatesLiteral);
      return {
        header: _nodesLiteral.getHeader,
        tabsContainer: _nodesLiteral.getTabsContainer(_settings.selectedTab),
        imagesContainer: _nodesLiteral.getImagesContainer(imagesProvider.getImages()),
        bottomTriangle: _nodesLiteral.getBottomTriangle
      };
    }

    function _createPrimaryNode(nodes) {
      let _primaryContainer = document.createElement('div');
      _primaryContainer.className = 'primary-container';
      _primaryContainer.appendChild(nodes.header);
      _primaryContainer.appendChild(nodes.tabsContainer);
      _primaryContainer.appendChild(nodes.imagesContainer);
      return _primaryContainer;
    }

    function _createNodesLiteral(templates) {
      return {
        getHeader: _createNode(templates.header),
        getTabsContainer(activeTab) {
          return _createNode(templates.tabsContainer, activeTab)
        },
        getImagesContainer(images) {
          return _createNode(templates.imagesContainer, images)
        },
        getBottomTriangle: _createNode(templates.bottomTriangle)
      };

      function _createNode(template, ...params) {
        let _node = document.createElement('div');
        _node.innerHTML = template(...params);
        return _node;
      }
    }

    function _createTemplatesLiteral() {
      return {
        header,
        tabsContainer: function (activeTab) {
          return tabsContainer(activeTab);
        },
        imagesContainer: function (images) {
          return imagesContainer(images);
        },
        bottomTriangle
      };

      function header() {
        let _settings = new ImgSettings();
        return `<div class="popup-header">
							<div class="header-title">${_settings.extensionName}</div>
							<div class="close-icon">&#x2716;</div>
						</div>`;
      }

      function tabsContainer(activeTab) {
        return `<div class="popup-tabs-container">
							<div class="tab ${activeTab === TabsEnum.Gifs ? 'active' : ''}">
								Gifs
							</div>
							<div class="tab ${activeTab === TabsEnum.Images ? 'active' : ''}">
								Images
							</div>
						</div>`;
      }

      function imagesContainer(images) {
        return `<div class="images-container">
							${images.map(image => `
								<div class="image-wrapper">
									<img src="${image.path}" alt="${image.title}" title="${image.title}"/>
								</div>
							`).join('')}
						</div>`;
      }

      function bottomTriangle() {
        return `<div class="triangle-down-wrapper">
							<div class="triangle-down"></div>
							<div class="triangle-down-border"></div>
						</div>`;
      }
    }
  }
);
