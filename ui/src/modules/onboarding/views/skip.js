/**
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import { define, html, router } from 'hybrids';

import OutroSkip from './outro-skip.js';

export default define({
  [router.connect]: { dialog: true },
  tag: 'ui-onboarding-skip-dialog',
  content: () =>
    html`
      <ui-onboarding-dialog>
        <ui-text slot="header" type="headline-m" color="white">
          Are you sure you want to skip enabling Ghostery?
        </ui-text>
        <ui-text type="body-s">
          Ghostery is stopping trackers in their tracks and preventing you from
          being profiled and your personal information sold to data brokers for
          their own profit.
        </ui-text>
        <ui-text type="body-s">
          With Ghostery enabled you instantly browser the web safer, faster and
          with less annoying ads.
        </ui-text>
        <ui-onboarding-button type="outline" slot="footer">
          <a href="${router.backUrl()}">Back</a>
        </ui-onboarding-button>
        <ui-onboarding-button type="outline" slot="footer">
          <a href="${router.url(OutroSkip)}">Continue</a>
        </ui-onboarding-button>
      </ui-onboarding-dialog>
    `,
});
