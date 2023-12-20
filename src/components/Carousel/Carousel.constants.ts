import { Spacing } from 'theme/Variables';
import { config } from 'utils/config';

const { mobileWidth } = config;
export const SLIDE_WIDTH = mobileWidth - 2 * (Spacing.xl + Spacing.xxs);
