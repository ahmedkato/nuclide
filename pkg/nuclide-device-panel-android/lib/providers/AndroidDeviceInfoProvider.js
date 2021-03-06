/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {DeviceInfoProvider} from '../../../nuclide-device-panel/lib/types';
import type {NuclideUri} from 'nuclide-commons/nuclideUri';
import type {Device} from '../../../nuclide-device-panel/lib/types';

import {Observable} from 'rxjs';
import {getAdbServiceByNuclideUri} from '../../../nuclide-remote-connection';

export class AndroidDeviceInfoProvider implements DeviceInfoProvider {
  getType(): string {
    return 'Android';
  }

  fetch(host: NuclideUri, device: Device): Observable<Map<string, string>> {
    return getAdbServiceByNuclideUri(host)
      .getDeviceInfo(device)
      .refCount()
      .map(props => {
        const infoMap = new Map();
        for (const [key, value] of props) {
          const beautifulKey = key.toLowerCase().replace('_', ' ');
          infoMap.set(
            beautifulKey.charAt(0).toUpperCase() + beautifulKey.slice(1),
            value,
          );
        }
        return infoMap;
      });
  }

  getTitle(): string {
    return 'Device information';
  }

  getPriority(): number {
    return 100;
  }

  isSupported(): Observable<boolean> {
    return Observable.of(true);
  }
}
