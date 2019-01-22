import { Bristol } from 'bristol';
import palin from 'palin';

export const logger = new Bristol();

logger.addTarget('console').withFormatter(palin, {
  rootFolderName: 'forum-api'
});
