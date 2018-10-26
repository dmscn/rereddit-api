import { Bristol } from 'bristol';
import palin from 'palin';

const log = new Bristol();

log.addTarget('console').withFormatter(palin);

log.info("We're up and running");