/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import HttpUtils from '../utils/http';

const API_LIST_QUICK_CREATE_CONTENT = '/api/2/content/list_quick_create_content.json';
const API_CONTENT_TYPE_DEFINITION = '/api/2/configuration/get_configuration';
const API_WRITE_CONTENT = '/api/1/services/api/1/content/write-content.json';

/**
 * Fetch quick create list
 * @param authoringBase the authoring base url
 * @param siteId the site id
 * @returns list of quick create items
 */
export const fetchQuickCreateList = async (authoringBase: string, siteId: string) => {
  const url = `${authoringBase}${API_LIST_QUICK_CREATE_CONTENT}?siteId=${siteId}`;
  try {
    const res = await HttpUtils.get(url);

    if (res.status === 200 && res.response?.items) {
      return res.response.items
    }

    return [];
  } catch (e) {
    return [];
  }
};

/**
 * Get content type definition
 * @param authoringBase the authoring base url
 * @param siteId the site id
 * @param contentType content type
 */
export const getContentTypeDefinition = async (authoringBase: string, siteId: string, contentType: string) => {
  const url = `${authoringBase}${API_CONTENT_TYPE_DEFINITION}?module=studio&path=/content-types${contentType}/form-definition.xml&siteId=${siteId}`;
  try {
    const res = await HttpUtils.get(url);
    if (res.status === 200 && res.response?.content) {
      return res.response.content as string;
    }

    return '';
  } catch (e) {
    return '';
  }
}

/**
 * Write content rest api
 * @param authoringBase the authoring base url
 * @param siteId the site id
 * @param path path to save
 * @param fileName file name to save
 * @param contentType content type of new content
 * @param body body of new content
 * @returns true if succeeded, false otherwise
 */
export const writeContent = async (authoringBase: string, siteId: string, path: string,
  fileName: string, contentType: string, body: string) => {
  const url = `${authoringBase}${API_WRITE_CONTENT}?site=${siteId}&phase=onSave&path=${path}&fileName=${fileName}&contentType=${contentType}&unlock=true`;
  try {
    const res = await HttpUtils.post(url, body);
    return res.status === 200
  } catch (e) {
    return false;
  }
}