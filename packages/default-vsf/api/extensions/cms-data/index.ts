import { apiStatus } from '@storefront-api/lib/util';
import { Router } from 'express';
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config, db }) => {
  const cmsApi = Router();

  cmsApi.get('/cmsPage/:id', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    client.addMethods('cmsPage', (restClient) => {
      const module: Record<string, (...args: any[]) => any> = {};
      module.getPage = function () {
        return restClient.get('/snowdog/cmsPage/' + req.params.id);
      }
      return module;
    })
    client.cmsPage.getPage().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    })
  })

  cmsApi.get('/cmsBlock/:id', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    client.addMethods('cmsBlock', (restClient) => {
      const module: Record<string, (...args: any[]) => any> = {};
      module.getBlock = function () {
        return restClient.get('/snowdog/cmsBlock/' + req.params.id);
      }
      return module;
    })
    client.cmsBlock.getBlock().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    })
  })

  cmsApi.get('/cmsPageIdentifier/:identifier/storeId/:storeId', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    client.addMethods('cmsPageIdentifier', (restClient) => {
      const module: Record<string, (...args: any[]) => any> = {};
      module.getPageIdentifier = function () {
        return restClient.get(`/snowdog/cmsPageIdentifier/${req.params.identifier}/storeId/${req.params.storeId}`);
      }
      return module;
    })
    client.cmsPageIdentifier.getPageIdentifier().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    })
  })

  cmsApi.get('/cmsBlockIdentifier/:identifier/storeId/:storeId', (req, res) => {
    const client = Magento2Client(config.magento2.api);
    client.addMethods('cmsBlockIdentifier', (restClient) => {
      const module: Record<string, (...args: any[]) => any> = {};
      module.getBlockIdentifier = function () {
        return restClient.get(`/snowdog/cmsBlockIdentifier/${req.params.identifier}/storeId/${req.params.storeId}`);
      }
      return module;
    })
    client.cmsBlockIdentifier.getBlockIdentifier().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    })
  })

  return cmsApi
}
