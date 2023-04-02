import { prodKeys } from './prod';
import { devKeys } from './dev';
import { Keys } from './types';

export const keys: Keys = process.env.NODE_ENV === 'production' ? prodKeys : devKeys;
