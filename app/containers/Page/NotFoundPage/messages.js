/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'notFoundPage.page';

export default defineMessages({
  header: {
    id: `${scope}.title`,
    defaultMessage: 'Page not found.',
  },
});
