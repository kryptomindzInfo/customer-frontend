/*
 * MainHeader Messages
 *
 * This contains all the text for the MainHeader container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MainHeader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MainHeader container!',
  },
});
