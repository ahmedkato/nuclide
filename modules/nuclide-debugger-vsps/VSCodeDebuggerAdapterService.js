/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 * @format
 */

import type {Adapter} from 'nuclide-debugger-vsps';
import type {ConnectableObservable} from 'rxjs';
import type {VSAdapterExecutableInfo} from 'nuclide-debugger-common';
import type {ProcessMessage} from 'nuclide-commons/process';
import type {ProcessInfo} from 'nuclide-commons/process';

import {psTree} from 'nuclide-commons/process';
import {VsAdapterSpawner} from 'nuclide-debugger-common';
import {getAdapterExecutable} from './main';

export class VsRawAdapterSpawnerService extends VsAdapterSpawner {
  spawnAdapter(
    adapter: VSAdapterExecutableInfo,
  ): ConnectableObservable<ProcessMessage> {
    return super.spawnAdapter(adapter);
  }

  write(input: string): Promise<void> {
    return super.write(input);
  }

  dispose(): Promise<void> {
    return super.dispose();
  }
}

export async function getProcessTree(): Promise<Array<ProcessInfo>> {
  return psTree();
}

export async function getAdapterExecutableInfo(
  adapterType: Adapter,
): Promise<VSAdapterExecutableInfo> {
  return getAdapterExecutable(adapterType);
}
