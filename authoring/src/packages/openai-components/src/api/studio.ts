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